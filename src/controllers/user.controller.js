const UserModel = require("../models/user.model");
const SettingsModel = require("../models/settings.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const speakeasy = require("speakeasy");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const qrcode = require("qrcode");
const settingsModel = require("../models/settings.model");
const bcryptSalt = process.env.BCRYPT_SALT;
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
  getAllUsers = async (req, res, next) => {
    let userList = await UserModel.find();
    if (!userList.length) {
      throw new HttpException(404, "Users not found");
    }

    userList = userList.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.send(userList);
  };

  getUserById = async (req, res, next) => {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const { password, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  };

  getUserByuserName = async (req, res, next) => {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const { password, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  };

  getCurrentUser = async (req, res, next) => {
    const { password, ...userWithoutPassword } = req.currentUser;

    res.send(userWithoutPassword);
  };

  createUser = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const secret = speakeasy.generateSecret({
      name: "TraleEco",
    });

    const result = await UserModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    } else if (result == "User Exist") {
      throw new HttpException(401, "User Already Exists");
    }

    const settings = await settingsModel.create({allowLeaderboard : "N", User_idUser : result});

    res.status(201).send({ secret });
  };

  verify2fa = async (req, res, next) => {
    this.checkValidation(req);

    console.log("The body : ", req.body);
    const response = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: "ascii",
      token: req.body.code,
    });
    console.log("The verification is : ", response);
    res.status(201).send(response);
  };

  updateUser = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const { confirm_password, ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await UserModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "User not found"
      : affectedRows && changedRows
      ? "User updated successfully"
      : "Updated faild";

    res.send({ message, info });
  };

  deleteUser = async (req, res, next) => {
    const result = await UserModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "User not found");
    }
    res.send("User has been deleted");
  };

  userLogin = async (req, res, next) => {
    this.checkValidation(req);

    const { email, password: pass } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new HttpException(401, "Unable to login!");
    }

    const isMatch = await bcrypt.compare(pass, user.Password);

    if (!isMatch) {
      throw new HttpException(401, "Incorrect password!");
    }

    // user matched!
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign(
      { userId: user.idUser.toString(), username: user.Username.toString() },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    const { password, ...userWithoutPassword } = user;

    res.send({ ...userWithoutPassword, token });
  };

  requestPasswordReset = async (req, res, next) => {
    const user = await UserModel.findUser(req.body.email);

    if (!user) throw new Error("User does not exist");

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    let token = await UserModel.insertToken(user.idUser, hash);

    const link = `${"traleeco.azurewebsites.net"}/passwordReset?token=${resetToken}&id=${
      user.idUser
    }`;
    const result = await sendEmail(
      user.Email,
      "Password Reset Request",
      { name: user.Username, link: link },
      "./template/requestResetPassword.handlebars"
    );

    res.status(201).send("Successful!");
    // };
  };

  resetPasswordController = async (req, res, next) => {
    let passwordResetToken = await UserModel.findTokne(req.body.userId);

    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(
      req.body.token,
      passwordResetToken.token
    );

    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }

    await this.hashPassword(req);

    const result = await UserModel.update(
      { Password: req.body.password },
      req.body.userId
    );

    if (result.affectedRows < 1)
      throw new HttpException(401, "Passowrd was not updated");

    await UserModel.deleteToken(req.body.userId);

    res.status(201).send("Successful!");
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation failed", errors);
    }
  };

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController();

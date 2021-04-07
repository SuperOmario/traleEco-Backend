const QModel = require("../models/questionnaire.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Questionniare Controller
 ******************************************************************************/
class QController {
  getAllFood = async (req, res, next) => {
    let foodList = await QModel.find("food");
    if (!foodList.length) {
      throw new HttpException(404, "Users not found");
    }

    foodList = foodList.map((food) => {
      return food;
    });

    res.send(foodList);
  };

  getFoodById = async (req, res, next) => {
    const food = await QModel("food").findOne({
      id: req.params.id,
    });
    if (!food) {
      throw new HttpException(404, "User not found");
    }

    res.send(food);
  };

  // getUserByuserName = async (req, res, next) => {
  //   const user = await QuestionnaireModel("food").findOne({
  //     username: req.params.username,
  //   });
  //   if (!user) {
  //     throw new HttpException(404, "User not found");
  //   }

  //   const { password, ...userWithoutPassword } = user;

  //   res.send(userWithoutPassword);
  // };

  // getCurrentUser = async (req, res, next) => {
  //   const { password, ...userWithoutPassword } = req.currentUser;

  //   res.send(userWithoutPassword);
  // };

  insertFood = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createFood("food", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  insertHome = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createFood("home", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  insertServices = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createFood("services", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  insertShopping = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createFood("shopping", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  insertTransport = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createFood("transport", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  // updateUser = async (req, res, next) => {
  //   this.checkValidation(req);

  //   await this.hashPassword(req);

  //   const { confirm_password, ...restOfUpdates } = req.body;

  //   // do the update query and get the result
  //   // it can be partial edit
  //   const result = await QuestionnaireModel.update(
  //     restOfUpdates,
  //     req.params.id
  //   );

  //   if (!result) {
  //     throw new HttpException(404, "Something went wrong");
  //   }

  //   const { affectedRows, changedRows, info } = result;

  //   const message = !affectedRows
  //     ? "User not found"
  //     : affectedRows && changedRows
  //     ? "User updated successfully"
  //     : "Updated faild";

  //   res.send({ message, info });
  // };

  // deleteUser = async (req, res, next) => {
  //   const result = await QuestionnaireModel.delete(req.params.id);
  //   if (!result) {
  //     throw new HttpException(404, "User not found");
  //   }
  //   res.send("User has been deleted");
  // };

  // userLogin = async (req, res, next) => {
  //   this.checkValidation(req);

  //   const { email, password: pass } = req.body;

  //   const user = await QuestionnaireModel.findOne({ email });

  //   if (!user) {
  //     throw new HttpException(401, "Unable to login!");
  //   }

  //   const isMatch = await bcrypt.compare(pass, user.password);

  //   if (!isMatch) {
  //     throw new HttpException(401, "Incorrect password!");
  //   }

  //   // user matched!
  //   const secretKey = process.env.SECRET_JWT || "";
  //   const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
  //     expiresIn: "24h",
  //   });

  //   const { password, ...userWithoutPassword } = user;

  //   res.send({ ...userWithoutPassword, token });
  // };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

module.exports = new QController();

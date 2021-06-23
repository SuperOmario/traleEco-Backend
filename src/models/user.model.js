const query = require("../db/db-connection").query;
const { multipleColumnSet } = require("../utils/common.utils");
const Role = require("../utils/userRoles.utils");
const bcrypt = require("bcryptjs");

class UserModel {
  tableName = "User";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `SELECT * FROM ${this.tableName}
    WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  findUser = async (email) => {
    const sql = `SELECT * FROM ${this.tableName}
    WHERE Email = ?`;

    const result = await query(sql, email);
    // return back the first row (user)
    return result[0];
  };

  insertToken = async (idUser, token) => {
    let sql = `SELECT * FROM Tokens
    WHERE idUser = ?`;

    let found = await query(sql, idUser);

    if (found.length != 0) {
      return "Token Exist";
    }
    const created = Date.now();

    sql = `INSERT INTO Tokens
        (idUser, token, created, expires) VALUES (?,?,?,?)`;

    const result = await query(sql, [idUser, token, created, 3600]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  create = async ({ username, password, email }) => {
    let sql = `SELECT * FROM ${this.tableName}
    WHERE Email = ?`;

    let found = await query(sql, email);

    if (found.length != 0) {
      return "User Exist";
    }

    sql = `INSERT INTO ${this.tableName}
        (username, password, email) VALUES (?,?,?)`;

    const result = await query(sql, [username, password, email]);
    const affectedRows = result ? result.affectedRows : 0;

    return result.insertId;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  updateToken = async (params, idUser) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE Tokens SET ${columnSet} WHERE idUser = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hash = await bcrypt.hash(password, Number(bcryptSalt));
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();
    return true;
  };
}

module.exports = new UserModel();

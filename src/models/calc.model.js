const query = require("../db/db-connection").query;
const { multipleColumnSet } = require("../utils/common.utils");
const date = require("date-and-time");

class CalcModel {
  tableName = "Calculator";

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

    return result[result.length - 1];
  };

  create = async ({
    FoodCarbon,
    HomeCarbon,
    ServicesCarbon,
    TransportCarbon,
    TotalCarbon,
    User_idUser,
  }) => {
    const now = new Date();
    date.format(now, "YYYY/MM/DD");

    const sql = `INSERT INTO ${this.tableName}
        (FoodCarbon,
          HomeCarbon,
          ServicesCarbon,
          TransportCarbon,
          TotalCarbon,
          CalcDate,
          User_idUser) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      FoodCarbon,
      HomeCarbon,
      ServicesCarbon,
      TransportCarbon,
      TotalCarbon,
      now,
      User_idUser,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE Calculator SET ${columnSet} WHERE User_idUser = ?`;

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
}

module.exports = new CalcModel();

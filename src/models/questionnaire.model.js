const query = require("../db/db-connection").query;
const { multipleColumnSet } = require("../utils/common.utils");

class QModel {
  find = async (tableName, params = {}) => {
    let sql = `SELECT * FROM ${tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params, tableName) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${tableName}
          WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  update = async (params, tableName, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${tableName} SET ${columnSet} WHERE User_idUser  = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (tableName, id) => {
    const sql = `DELETE FROM ${tableName}
          WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertFood = async ({
    fish,
    beef,
    chicken,
    pork,
    dairy,
    waste,
    homegrown,
    seasonal,
    local,
    userId,
  }) => {
    const sql = `INSERT INTO Food
        (
      FishServings,
      BeefServings,
      ChickenServings,
      PorkServings,
      DiaryServings,
      FoodWaste,
      HomeGrown,
      eatSeasonal,
      eatLocally,
      User_idUser
          ) VALUES (?,?,?,?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      fish,
      beef,
      chicken,
      pork,
      dairy,
      waste,
      homegrown,
      seasonal,
      local,
      userId,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertServices = async ({
    office,
    clothing,
    phone,
    tv,
    internet,
    userId,
  }) => {
    const sql = `INSERT INTO Services (
        Office,
        Clothing,
        Phone,
        TV,
        Internet,
        User_idUser) VALUES (?,?,?,?,?,?)`;

    const result = await query(sql, [
      office,
      clothing,
      phone,
      tv,
      internet,
      userId,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertHome = async ({
    brating,
    homesize,
    plastic,
    glass,
    paper,
    recycleCans,
    userId,
  }) => {
    const sql = `INSERT INTO Home
        (
          BERRating,
          HomeSize,
          RecyclePlastic,
          RecycleGlass,
          RecyclePaper,
          RecycleCans,
          User_idUser) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      brating,
      homesize,
      plastic,
      glass,
      paper,
      recycleCans,
      userId,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertShopping = async ({
    appliances,
    office,
    clothing,
    entertainment,
    pets,
    userId,
  }) => {
    const sql = `INSERT INTO Shopping
        ( FurnitureAppliances,
          PaperOffice,
          Clothing,
          Entertainment,
          Pets,
          User_idUser
          ) VALUES (?,?,?,?,?,?)`;

    const result = await query(sql, [
      appliances,
      office,
      clothing,
      entertainment,
      pets,
      userId,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertTransport = async ({ vehicle, fuel, milage, passengers, userId }) => {
    const sql = `INSERT INTO Transport
        ( MainVehicle,
          FuelType,
          Milage,
          AverageNoOfPassengers,
          User_idUser) VALUES (?,?,?,?,?)`;

    const result = await query(sql, [
      vehicle,
      fuel,
      milage,
      passengers,
      userId,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new QModel();

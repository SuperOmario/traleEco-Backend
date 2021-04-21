const query = require("../db/db-connection");
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

    const sql = `UPDATE ${tableName} SET ${columnSet} WHERE id${tableName}   = ?`;

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

  createFood = async (
    tableName,
    {
      fish,
      beef,
      chicken,
      pork,
      dairy,
      waste,
      homegrown,
      seasonal,
      local,
      user_idUser,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
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
      user_idUser,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertServices = async (
    tableName,
    { phone, internet, tV, other, user_idUser }
  ) => {
    const sql = `INSERT INTO ${tableName}
        Phone,
        Internet,
        TV,
        Other,
        User_idUser) VALUES (?,?,?,?,?,?)`;

    const result = await query(sql, [
      phone,
      internet,
      tV,
      other,
      user_idUser,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertHome = async (
    tableName,
    {
      idServices,
      idMember,
      phoneContractAmount,
      internetAmount,
      tvContract,
      members_idMembers,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        ( idServices,
          idMember,
          PhoneContractAmount,
          internetAmount,
          TVContract,
          Members_idMembers) VALUES (?,?,?,?,?,?)`;

    const result = await query(sql, [
      idServices,
      idMember,
      phoneContractAmount,
      internetAmount,
      tvContract,
      members_idMembers,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertShopping = async (
    tableName,
    {
      furnitureAppliances,
      paperOffice,
      clothing,
      entertainment,
      medical,
      user_idUser,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        (FurnitureAppliances,
          PaperOffice,
          Clothing,
          Entertainment,
          Medical,
          User_idUser,) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      furnitureAppliances,
      paperOffice,
      clothing,
      entertainment,
      medical,
      user_idUser,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertTransport = async (
    tableName,
    {
      mainVehicle,
      fuelType,
      milage,
      engineSize,
      averageNoOfPassengers,
      regularMaintenance,
      user_idUser,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        (MainVehicle,
          FuelType,
          Milage,
          EngineSize,
          AverageNoOfPassengers,
          RegularMaintenance,
          User_idUser) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      mainVehicle,
      fuelType,
      milage,
      engineSize,
      averageNoOfPassengers,
      regularMaintenance,
      user_idUser,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new QModel();

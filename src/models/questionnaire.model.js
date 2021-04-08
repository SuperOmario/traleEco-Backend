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
      idFood,
      idMember,
      dailyCalories,
      fishServings,
      beefServings,
      chickenServings,
      porkServings,
      diaryServings,
      others,
      petFood,
      foodcol,
      members_idMembers,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        (
          idFood,
          idMember,
          DailyCalories,
          FishServings,
          BeefServings,
          ChickenServings,
          PorkServings,
          DiaryServings,
          Others,PetFood,
          Foodcol, 
          Members_idMembers
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      idFood,
      idMember,
      dailyCalories,
      fishServings,
      beefServings,
      chickenServings,
      porkServings,
      diaryServings,
      others,
      petFood,
      foodcol,
      members_idMembers,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertHome = async (
    tableName,
    {
      idHome,
      idMember,
      electricityUsage,
      naturalGas,
      heatingType,
      temp,
      homecol,
      hoursHeating,
      noOfPeople,
      squareFtOfHouse,
      berRating,
      members_idMembers,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        ( idHome,
          idMember,
          ElectricityUsage,
          NaturalGas,
          HeatingType,
          Temp,
          Homecol,
          HoursHeating,
          NoOfPeople,
          SquareFtOfHouse,
          BerRating,
          Members_idMembers) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      idHome,
      idMember,
      electricityUsage,
      naturalGas,
      heatingType,
      temp,
      homecol,
      hoursHeating,
      noOfPeople,
      squareFtOfHouse,
      berRating,
      members_idMembers,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertServices = async (
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
      idShopping,
      clothes,
      paperBaseProducts,
      recycle,
      date,
      idMember,
      members_idMembers,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        (idShopping,
          Clothes,
          PaperBaseProducts,
          Recycle,
          Date,
          idMember,
          Members_idMembers) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      idShopping,
      clothes,
      paperBaseProducts,
      recycle,
      date,
      idMember,
      members_idMembers,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  insertTransport = async (
    tableName,
    {
      idTransport,
      mode,
      vehicleType,
      milage,
      fuelType,
      fuelConsumption,
      noOfPassengers,
      distance,
      noOfPublicTransportUsed,
      idMember,
      members_idMembers,
    }
  ) => {
    const sql = `INSERT INTO ${tableName}
        (idTransport,
          Mode,
          VehicleType,
          Milage,
          FuelType,
          FuelConsumption,
          NoOfPassengers,
          Distance,
          NoOfPublicTransportUsed,
          idMember,
          Date,
          Members_idMembers) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      idTransport,
      mode,
      vehicleType,
      milage,
      fuelType,
      fuelConsumption,
      noOfPassengers,
      distance,
      noOfPublicTransportUsed,
      idMember,
      members_idMembers,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new QModel();

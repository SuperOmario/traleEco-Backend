const query = require("../db/db-connection").query;
const { multipleColumnSet } = require("../utils/common.utils");

class SettingsModel {
    tableName = "Settings";

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
    
        if (!Object.keys(params).length) {
          return await query(sql);
        }
    
        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
    
        return await query(sql, [...values]);
    };

    getLeaderboard = async () => {
      const sql = `SELECT User.idUser, User.Username, Calculator.FoodCarbon, Calculator.HomeCarbon, Calculator.ServicesCarbon, Calculator.TransportCarbon, Calculator.TotalCarbon
                FROM Calculator
                INNER JOIN User ON 
                Calculator.User_idUser = User.idUser JOIN Settings ON Calculator.User_idUser = Settings.User_idUser
                WHERE Calculator.idCalculator IN (SELECT MAX(Calculator.idCalculator)
                  FROM Calculator
                  GROUP BY Calculator.User_idUser
                  )
                AND Settings.allowLeaderboard = 'Y'
                ORDER BY Calculator.TotalCarbon ASC`

      const leaderboard = await query(sql);
      return leaderboard
    };

    // getLeaderboardUsers = async () => {
    //   const sql = `SELECT User_idUser FROM ${this.tableName}
    //   WHERE allowLeaderboard = "Y"`;

    //   const result = await query(sql);
    
    //   // return back the first row 
    //   return result;
    // }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
    
        const result = await query(sql, [...values]);
    
        // return back the first row 
        return result[0];
    };

    create = async ({ allowLeaderboard, User_idUser }) => {
        let sql = `SELECT * FROM ${this.tableName}
        WHERE User_idUser = ?`;
    
        let found = await query(sql, User_idUser);
    
        if (found.length != 0) {
          return "User settings already set";
        }
    
        sql = `INSERT INTO ${this.tableName}
        (allowLeaderboard, User_idUser) VALUES (?,?)`;
    
        const result = await query(sql, [allowLeaderboard, User_idUser]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
      };
    
      update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);
    
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE User_idUser = ?`;
    
        const result = await query(sql, [...values, id]);
    
        return result;
      };

      delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
            WHERE idSettings = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
      };

}

module.exports = new SettingsModel();
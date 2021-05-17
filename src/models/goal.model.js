const query = require("../db/db-connection").query;
const { multipleColumnSet } = require("../utils/common.utils");
class GoalModel {
    tableName = "Goal";

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
    
    create = async ({ description, idUser }) => {
        const sql = `INSERT INTO ${this.tableName}
            (description, idUser) VALUES (?,?)`;
    
        const result = await query(sql, [description, idUser]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
    };
    
    update = async (params, idGoal) => {
        const { columnSet, values } = multipleColumnSet(params);
    
        const sql = `UPDATE user SET ${columnSet} WHERE idGoal = ?`;
    
        const result = await query(sql, [...values, idGoal]);
    
        return result;
    };
    
    delete = async (idGoal) => {
        const sql = `DELETE FROM ${this.tableName}
            WHERE idGoal = ?`;
        const result = await query(sql, [idGoal]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
    };

    deleteAllForUser = async (idUser) => {
        const sql = `DELETE FROM ${this.tableName}
            WHERE idUser = ?`;
        const result = await query(sql, [idUser]);
        const affectedRows = result ? result.affectedRows : 0;
    
        return affectedRows;
    }
}

module.exports = new GoalModel()
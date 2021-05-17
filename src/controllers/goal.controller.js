const GoalModel = require("../models/goal.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Goal Controller
 ******************************************************************************/
class GoalController {
    getAllGoals = async (req, res, next) => {
      let goalList = await GoalModel.find();
      if (!goalList.length) {
        throw new HttpException(404, "Goals not found");
      }
    
      goalList = goalList.map((goal) => {
        return goal;
      });
    
      res.send(goalList);
    };

    createGoal = async (req, res, next) => {
      this.checkValidation(req);

      const result = await GoalModel.create(req.body);
    
      if (!result) {
        throw new HttpException(500, "Something went wrong");
      }
    
      res.status(201).send("Goal was created!");
    };

    deleteAllForUser = async (req, res, next) => {
      const result = await GoalModel.deleteAllForUser(req.params.id);

      if (!result) {
        throw new HttpException(500, "Something went wrong");
      }

      res.status(204).send();
    }


    checkValidation = (req) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpException(400, "Validation failed", errors);
      }
    };
}

module.exports = new GoalController()
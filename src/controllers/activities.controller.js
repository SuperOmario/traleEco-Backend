const ActivitiesModel = require("../models/activities.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Activities Controller
 ******************************************************************************/
class ActivitiesController {
    getAllActivities = async (req, res, next) => {
      let goalList = await ActivitiesModel.find();
      if (!goalList.length) {
        throw new HttpException(404, "Activities not found");
      }
    
      goalList = goalList.map((goal) => {
        return goal;
      });
    
      res.send(goalList);
    };

    createActivity = async (req, res, next) => {
      this.checkValidation(req);

      const result = await ActivitiesModel.create(req.body);
    
      if (!result) {
        throw new HttpException(500, "Something went wrong");
      }
    
      res.status(201).send("Activity was created!");
    };

    delete = async (req, res, next) => {
      const result = await ActivitiesModel.delete(req.params.id);

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

module.exports = new ActivitiesController()
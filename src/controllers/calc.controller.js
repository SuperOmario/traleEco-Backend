const CalcModel = require("../models/calc.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const calculateCO2 = require("../calculator/calculator");
const dotenv = require("dotenv");
dotenv.config();

class QCalc {
  /******************************************************************************
   *                              Calc getters & setters
   ******************************************************************************/
  getAllCalc = async (req, res, next) => {
    let calcList = await CalcModel.find();
    if (!calcList.length) {
      throw new HttpException(404, "Carbon footprint not found");
    }

    res.send(calcList);
  };

  getCalcById = async (req, res, next) => {
    const calc = await CalcModel.findOne({ User_idUser: req.params.id });
    if (!calc) {
      throw new HttpException(404, "Carbon footprint not found");
    }

    res.send(calc);
  };

  insertCalc = async (req, res, next) => {
    this.checkValidation(req);

    const result = await CalcModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const cft = req.body;

    res.status(201).send({ cft });
  };

  updateCalc = async (req, res, next) => {
    this.checkValidation(req);

    const { confirm_password, ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await CalcModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Carbon footprint not found"
      : "Carbon footprint updated successfully";

    res.send({ message, info });
  };

  insertAll = async (req, res, next) => {
    this.checkValidation(req);
    console.log("The services Value : ", req.body.serviceValues);
    let result;

    result = await QModel.insertFood(req.body.foodValue);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your food");
    }
    result = await QModel.insertHome(req.body.homeValues);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your home");
    }

    result = await QModel.insertTransport(req.body.transportValues);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your transport");
    }

    result = await QModel.insertServices(req.body.serviceValues);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your services");
    }

    result = calculateCO2(
      req.body.foodValue,
      req.body.homeValues,
      req.body.serviceValues,
      req.body.transportValues
    );
    console.log("This is the result log: ", result);
    res.status(201).send({ result });
  };

  updateAll = async (req, res, next) => {
    this.checkValidation(req);

    let result;

    result = await QModel.updateFood(req.body.foodValue);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your food");
    }
    result = await QModel.updatetHome(req.body.homeValues);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your home");
    }
    // result = await QModel.updateShopping(req.body.purchaseValues);
    // if (!result) {
    //   throw new HttpException(500, "Something went wrong with your shopping");
    // }
    result = await QModel.updateTransport(req.body.transportValues);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your transport");
    }

    result = await QModel.updatetServices(req.body.serviceValues);
    if (!result) {
      throw new HttpException(500, "Something went wrong with your services");
    }

    res.status(201).send(result);
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation failed", errors);
    }
  };
}

module.exports = new QCalc();

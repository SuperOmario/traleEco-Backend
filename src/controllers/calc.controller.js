const CalcModel = require("../models/calc.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const calculateFoodCO2 = require("../calculator/foodcalc");
const calculateHomeCO2 = require("../calculator/homecalc");
const calculateTransportCO2 = require("../calculator/transportcalc");
const calculateServicesCO2 = require("../calculator/consumercalc");
const calculateCO2 = require("../calculator/calculator");
const calcUpdate = require("../calculator/calcupdate");
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

    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await CalcModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Carborn footprint not found"
      : "Caborn footprint updated successfully";

    res.send({ message, info });
  };

  reCalcAndUpdate = async (req, res, next) => {
    console.log("The body of the request @ : ", req.body);
    let value = 0;

    const title = req.body.title;

    switch (title) {
      case "foodValue":
        value = calculateFoodCO2(req.body.data);
        break;
      case "homeValues":
        value = calculateHomeCO2(req.body.data);
        break;
      case "serviceValues":
        value = calculateServicesCO2(req.body.data);
        break;
      case "transportValues":
        value = calculateTransportCO2(req.body.data);
        break;
    }
    console.log("The Value @  1: ", value);
    value *= 0.0011;

    console.log("The Value @  2: ", value);

    const calc = await CalcModel.findOne({ User_idUser: req.params.id });

    if (!calc) {
      throw new HttpException(404, "Carbon footprint not found");
    }

    let data = {
      foodValue: calc.FoodCarbon,
      homeValues: calc.HomeCarbon,
      serviceValues: calc.ServicesCarbon,
      transportValues: calc.TransportCarbon,
    };

    console.log(" The new Data 1: ", data);

    data[title] = value;

    console.log(" The new Data 2: ", data);

    const newCalc = await calcUpdate(
      data.foodValue,
      data.homeValues,
      data.serviceValues,
      data.transportValues
    );
    newCalc["User_idUser"] = req.params.id;
    console.log(" The new Data 3: ", newCalc);

    const result = await CalcModel.create(newCalc);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Successful!");
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

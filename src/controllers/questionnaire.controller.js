const QModel = require("../models/questionnaire.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Questionniare Controller
 ******************************************************************************/

class QController {
  /******************************************************************************
   *                              Food gettters & setters
   ******************************************************************************/

  getAllFood = async (req, res, next) => {
    let foodList = await QModel.find("Food");
    if (!foodList.length) {
      throw new HttpException(404, "Food not found");
    }

    foodList = foodList.map((food) => {
      return food;
    });

    res.send(foodList);
  };

  getFoodById = async (req, res, next) => {
    const food = await QModel("food").findOne({
      id: req.params.id,
    });
    if (!food) {
      throw new HttpException(404, "Food not found");
    }

    res.send(food);
  };

  insertFood = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createFood("Food", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  updateFood = async (req, res, next) => {
    this.checkValidation(req);

    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await QModel.update(restOfUpdates, "Food", req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Food not found"
      : "Food updated successfully";

    res.send({ message, info });
  };

  /******************************************************************************
   *                              Home Getters & Setters
   ******************************************************************************/

  getAllHome = async (req, res, next) => {
    let homeList = await QModel.find("home");
    if (!homeList.length) {
      throw new HttpException(404, "Home not found");
    }

    homeList = homeList.map((home) => {
      return home;
    });

    res.send(homeList);
  };

  getHomeById = async (req, res, next) => {
    const home = await QModel("home").findOne({
      id: req.params.id,
    });
    if (!home) {
      throw new HttpException(404, "Home not found");
    }

    res.send(home);
  };

  insertHome = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createHome("home", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Home was Inserted!");
  };

  updateHome = async (req, res, next) => {
    this.checkValidation(req);

    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await QModel.update(restOfUpdates, "Home", req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Home not found"
      : "Home updated successfully";

    res.send({ message, info });
  };

  /******************************************************************************
   *                             Services Getter & Setters
   ******************************************************************************/

  getAllServices = async (req, res, next) => {
    let servicesList = await QModel.find("services");
    if (!servicesList.length) {
      throw new HttpException(404, "Services not found");
    }

    servicesList = servicesList.map((services) => {
      return services;
    });

    res.send(servicesList);
  };

  getServicesById = async (req, res, next) => {
    const services = await QModel("services").findOne({
      id: req.params.id,
    });
    if (!services) {
      throw new HttpException(404, "Services not found");
    }

    res.send(services);
  };

  insertServices = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createServices("services", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Services was Inserted!");
  };

  updateServices = async (req, res, next) => {
    this.checkValidation(req);

    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await QModel.update(
      restOfUpdates,
      "Services",
      req.params.id
    );

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Services not found"
      : "Services updated successfully";

    res.send({ message, info });
  };

  /******************************************************************************
   *                              shopping getters & Setters
   ******************************************************************************/

  getAllShopping = async (req, res, next) => {
    let shoppingList = await QModel.find("shopping");
    if (!shoppingList.length) {
      throw new HttpException(404, "Shopping not found");
    }

    shoppingList = shoppingList.map((shopping) => {
      return shopping;
    });

    res.send(shoppingList);
  };

  getShoppingById = async (req, res, next) => {
    const shopping = await QModel("shopping").findOne({
      id: req.params.id,
    });
    if (!shopping) {
      throw new HttpException(404, "Shopping not found");
    }

    res.send(shopping);
  };

  insertShopping = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createShopping("shopping", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Shopping was Inserted!");
  };

  updateShopping = async (req, res, next) => {
    this.checkValidation(req);

    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await QModel.update(
      restOfUpdates,
      "Shopping",
      req.params.id
    );

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Shopping not found"
      : "Shopping updated successfully";

    res.send({ message, info });
  };

  /******************************************************************************
   *                              Transport getters & Setters
   ******************************************************************************/

  getAllTransport = async (req, res, next) => {
    let transportList = await QModel.find("transport");

    transportList = transportList.map((transport) => {
      return transport;
    });

    res.send(transportList);
  };

  getTransportById = async (req, res, next) => {
    const transport = await QModel("transport").findOne({
      id: req.params.id,
    });
    if (!transport) {
      throw new HttpException(404, "Transport not found");
    }

    res.send(transport);
  };

  insertTransport = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.createTransport("transport", req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Transport was Inserted!");
  };
  updateTransport = async (req, res, next) => {
    this.checkValidation(req);

    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await QModel.update(
      restOfUpdates,
      "Transport",
      req.params.id
    );

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, info } = result;

    const message = !affectedRows
      ? "Transport not found"
      : "Transport updated successfully";

    res.send({ message, info });
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

module.exports = new QController();

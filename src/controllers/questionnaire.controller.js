const QModel = require("../models/questionnaire.model");
const CalcModel = require("../models/calc.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const calculateCO2 = require("../calculator/calculator");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Questionniare Controller
 ******************************************************************************/

class QController {
  /******************************************************************************
   *                              Food getters & setters
   ******************************************************************************/

  getAllFood = async (req, res, next) => {
    let foodList = await UserModel.find();
    if (!userList.length) {
      throw new HttpException(404, "Food not found");
    }

    // foodList = foodList.map((user) => {
    //   const { password, ...userWithoutPassword } = user;
    //   return userWithoutPassword;
    // });

    res.send(foodList);
  };

  getFoodById = async (req, res, next) => {
    const food = await QModel.findOne(
      {
        User_idUser: req.params.id,
      },
      "Food"
    );
    if (!food) {
      throw new HttpException(404, "Food not found");
    }

    res.send(food);
  };

  insertFood = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.insertFood(req.body.foodValue);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Food was Inserted!");
  };

  updateFood = async (req, res, next) => {
    this.checkValidation(req);
    const updateValues = {
      FishServings: req.body.fish,
      BeefServings: req.body.beef,
      ChickenServings: req.body.chicken,
      PorkServings: req.body.pork,
      DiaryServings: req.body.dairy,
      HomeGrown: req.body.homegrown,
      eatLocally: req.body.local,
      User_idUser: req.body.userId,
    };

    const { ...restOfUpdates } = updateValues;

    // do the update query and get the result
    // it can be partial edit
    const result = await QModel.update(restOfUpdates, "Food", req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, warningStatus } = result;

    const message = !affectedRows
      ? "Food not found"
      : "Food updated successfully";

    res.send(message);
  };

  /******************************************************************************
   *                              Home Getters & Setters
   ******************************************************************************/

  getAllHome = async (req, res, next) => {
    let homeList = await QModel.find("Home");
    if (!homeList.length) {
      throw new HttpException(404, "Home not found");
    }

    homeList = homeList.map((home) => {
      return home;
    });

    res.send(homeList);
  };

  getHomeById = async (req, res, next) => {
    const home = await QModel.findOne(
      {
        User_idUser: req.params.id,
      },
      "Home"
    );
    if (!home) {
      throw new HttpException(404, "Home not found");
    }

    res.send(home);
  };

  insertHome = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.insertHome(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Home was Inserted!");
  };

  updateHome = async (req, res, next) => {
    this.checkValidation(req);

    const updateValues = {
      BERRating: req.body.brating,
      HomeSize: req.body.homesize,
      RecyclePlastic: req.body.plastic,
      RecycleGlass: req.body.glass,
      RecyclePaper: req.body.paper,
      RecycleCans: req.body.recycleCans,
      User_idUser: req.body.userId,
    };

    const { ...restOfUpdates } = updateValues;

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
    let servicesList = await QModel.find("Services");
    if (!servicesList.length) {
      throw new HttpException(404, "Services not found");
    }

    servicesList = servicesList.map((services) => {
      return services;
    });

    res.send(servicesList);
  };

  getServicesById = async (req, res, next) => {
    const services = await QModel.findOne(
      {
        User_idUser: req.params.id,
      },
      "Services"
    );
    if (!services) {
      throw new HttpException(404, "Services not found");
    }

    res.send(services);
  };

  insertServices = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.insertServices(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Services was Inserted!");
  };

  updateServices = async (req, res, next) => {
    this.checkValidation(req);

    const updateValues = {
      Phone: req.body.phone,
      Internet: req.body.internet,
      TV: req.body.tv,
      Office: req.body.office,
      Clothing: req.body.clothing,
      User_idUser: req.body.userId,
    };

    const { ...restOfUpdates } = updateValues;
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
   *                              Transport getters & Setters
   ******************************************************************************/

  getAllTransport = async (req, res, next) => {
    let transportList = await QModel.find("Transport");

    transportList = transportList.map((transport) => {
      return transport;
    });

    res.send(transportList);
  };

  getTransportById = async (req, res, next) => {
    const transport = await QModel.findOne(
      {
        User_idUser: req.params.id,
      },
      "Transport"
    );
    if (!transport) {
      throw new HttpException(404, "Transport not found");
    }

    res.send(transport);
  };

  insertTransport = async (req, res, next) => {
    this.checkValidation(req);

    const result = await QModel.insertTransport(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Transport was Inserted!");
  };
  updateTransport = async (req, res, next) => {
    this.checkValidation(req);

    const updateValues = {
      MainVehicle: Number(req.body.vehicle),
      FuelType: Number(req.body.fuel),
      Milage: Number(req.body.milage),
      AverageNoOfPassengers: Number(req.body.passengers),
      User_idUser: req.body.userId,
    };

    const { ...restOfUpdates } = updateValues;

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

  insertAll = async (req, res, next) => {
    this.checkValidation(req);
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

    let cabornFootPrint = { ...result };

    cabornFootPrint["User_idUser"] = req.body.userId;
    console.log("The Data to be saved is : ", cabornFootPrint);

    const insertCalc = await CalcModel.create(cabornFootPrint);

    if (insertCalc < 1) {
      throw new HttpException(
        500,
        "Could not save carbon footprint calculation"
      );
    }

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

module.exports = new QController();

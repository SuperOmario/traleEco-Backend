const express = require("express");
const router = express.Router();
const qController = require("../controllers/questionnaire.controller");
const { transaction } = require("../db/db-connection");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
const {
createFoodSchema,
} = require("../middleware/validators/questionValidator.middleware");
const calculator = require("../calculator/calculator");

//Gets
router.get("/food", awaitHandlerFactory(qController.getAllFood));
router.get("/home", awaitHandlerFactory(qController.getAllHome));
router.get("/services", awaitHandlerFactory(qController.getAllServices));
router.get("/shopping", awaitHandlerFactory(qController.getAllShopping));
router.get("/transport", awaitHandlerFactory(qController.getAllTransport));

//Posts
router.post("/food", createFoodSchema, awaitHandlerFactory(qController.insertFood));
router.post("/home", awaitHandlerFactory(qController.insertHome));
router.post("/services", awaitHandlerFactory(qController.insertServices));
router.post("/shopping", awaitHandlerFactory(qController.insertShopping));
router.post("/transport", awaitHandlerFactory(qController.insertTransport));
router.post("/submit", awaitHandlerFactory(qController.insertAll)
  //apparently calculator is not a function despite being imported and vsCode knows it's being imported from calculator.js 
  // const CO2 = calculator(req.body);
  // if (!CO2) {
  //   res.status(500).send("No CO2");
  // }
  // res.status(200).send("Carbon footprint: " + CO2);

//transactions don't work :(

// (req, res) => { submitsubmitQuestionnaire = new Promise((resolve, reject) => {
    // const execute = (connection, next) => {
    //   console.log("Starting")
    //   // awaitHandlerFactory(qController.insertFood);
    //   // awaitHandlerFactory(qController.insertHome);
    //   // awaitHandlerFactory(qController.insertServices);
    //   // awaitHandlerFactory(qController.insertShopping);
    //   return awaitHandlerFactory(qController.insertAll);
    // }

    // const end = (err, data) => {
    //   return err ? reject(err) : resolve(data)
    // }

    // transaction(execute, end);
  // });
// }
);
// router.post("/calculate", calculator(req.body))

//Puts
router.put("/food/:id", createFoodSchema, awaitHandlerFactory(qController.updateFood));
router.put("/home/:id", awaitHandlerFactory(qController.updateHome));
router.put("/services/:id", awaitHandlerFactory(qController.updateServices));
router.put("/shopping/:id", awaitHandlerFactory(qController.updateShopping));
router.put("/transport/:id", awaitHandlerFactory(qController.updateTransport));


module.exports = router;

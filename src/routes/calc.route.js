const express = require("express");
const router = express.Router();
const calcController = require("../controllers/calc.controller");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/", awaitHandlerFactory(calcController.getAllCalc));
router.get("/:id", awaitHandlerFactory(calcController.getCalcById));
router.post("/", awaitHandlerFactory(calcController.insertCalc));
router.put("update/:id", awaitHandlerFactory(calcController.updateCalc));

// router.put("/id/:id", awaitHandlerFactory(calcController.updateCalc));

module.exports = router;

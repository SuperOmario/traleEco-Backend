const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/", auth(), awaitHandlerFactory(goalController.getAllGoals));
router.get("/user/:idUser", awaitHandlerFactory(goalController.getAllGoalsForUser));
router.post("/", awaitHandlerFactory(goalController.createGoal));
router.delete("/:id", awaitHandlerFactory(goalController.delete));
router.delete("/user/:id", awaitHandlerFactory(goalController.deleteAllForUser));

module.exports = router 
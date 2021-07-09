const express = require("express");
const router = express.Router();
const goalController = require("../controllers/activities.controller");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/", awaitHandlerFactory(goalController.getAllActivities));
router.post("/", awaitHandlerFactory(goalController.createActivity));
router.delete("/:id", awaitHandlerFactory(goalController.delete));

module.exports = router 
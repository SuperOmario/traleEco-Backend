const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/", awaitHandlerFactory(settingsController.getLeaderboard));
router.post("/", awaitHandlerFactory(settingsController.createSettings));
router.post("/update/:id", awaitHandlerFactory(settingsController.updateSettings));


module.exports = router;

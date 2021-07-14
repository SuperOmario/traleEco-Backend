const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/", awaitHandlerFactory(settingsController.getLeaderboard));
router.get("/points", awaitHandlerFactory(settingsController.getPointsLeaderboard));
router.get("/:id", awaitHandlerFactory(settingsController.getSettings));
router.post("/", awaitHandlerFactory(settingsController.createSettings));
router.put(
  "/update/:id",
  awaitHandlerFactory(settingsController.updateSettings)
);

module.exports = router;

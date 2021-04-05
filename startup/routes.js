const express = require("express");
const questionnaire = require("../routes/questionnaire");
const user = require("../routes/user");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/questionnaire", questionnaire);
  app.use("/api/user", user);
  app.use(error);
};

const settingsModel = require("../models/settings.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

class SettingsController {
  getAllSettings = async (req, res, next) => {
    let settingsList = await settingsModel.find();
    if (!settingsList.length) {
      throw new HttpException(404, "Settings not found");
    }

    settingsList = settingsList.map((settings) => {
      return settings;
    });

    res.send(settingsList);
  };

  getLeaderboard = async (req, res, next) => {
    let settingsList = await settingsModel.getLeaderboard();
    if (!settingsList.length) {
      throw new HttpException(404, "Settings not found");
    }

    settingsList = settingsList.map((settings) => {
      return settings;
    });

    res.send(settingsList);
  };
  getSettings = async (req, res, next) => {
    let settingsList = await settingsModel.findSettings(req.params.id);
    if (!settingsList) {
      throw new HttpException(404, "Settings not found");
    }

    res.send(settingsList);
  };

  // getLeaderboardUsers = async (req, res, next) => {
  //     let settingsList = await settingsModel.getLeaderboardUsers(req.params.idUser);
  //     if (!settingsList.length) {
  //       throw new HttpException(404, "Settings not found");
  //     }

  //     settingsList = settingsList.map((settings) => {
  //       return settings;
  //     });

  //     res.send(settingsList);
  // }

  createSettings = async (req, res, next) => {
    let result = await settingsModel.create(req.body);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }
    res.status(201).send("Settings was created!");
  };

  updateSettings = async (req, res, next) => {
    let result = await settingsModel.update(req.body, req.params.id);
    console.log("Loged : ", result);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }
    const { affectedRows } = result;
    if (affectedRows < 1) throw new HttpException(500, "Nothing was updated");

    res.status(201).send(req.body);
  };

  delete = async (req, res, next) => {
    const result = await settingsModel.delete(req.params.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(204).send();
  };
}

module.exports = new SettingsController();

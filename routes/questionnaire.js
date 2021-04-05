const express = require("express");
const router = express.Router();
const pool = require("../startup/db");
const bcrypt = require("bcrypt");

router.get("/food:id", async function (req, res) {
  try {
    const { id } = req.body;
    const sqlQuery = "SELECT * FROM food WHERE idMember=?";

    const rows = await pool.query(sqlQuery, id);

    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    res.status(200).send(`No data for the selected Id "${id}" `);
  } catch (error) {
    res.status(400).send(error.message);
  }

  res.status(200).json({ id: req.params.id });
});

router.post("/food", async function (req, res) {
  try {
    const {
      idFood,
      idMember,
      dailyCalories,
      fishServings,
      beefServings,
      chickenServings,
      porkServings,
      diaryServings,
      others,
      petFood,
      foodcol,
      members_idMembers,
    } = req.body;

    const sqlQuery =
      "INSERT INTO Food (idFood,idMember,DailyCalories,FishServings,BeefServings,ChickenServings,PorkServings,DiaryServings,Others,PetFood,Foodcol, Members_idMembers) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [
      idFood,
      idMember,
      dailyCalories,
      fishServings,
      beefServings,
      chickenServings,
      porkServings,
      diaryServings,
      others,
      petFood,
      foodcol,
      members_idMembers,
    ]);

    res.status(200).json({ foodId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/home", async function (req, res) {
  try {
    const { username, firstname, surname, email, password } = req.body;

    const sqlQuery =
      "INSERT INTO members (Username, Firstname, Surname, Email, Password) VALUES (?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [
      username,
      firstname,
      surname,
      email,
      encryptedPassword,
    ]);

    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/services", async function (req, res) {
  try {
    const { username, firstname, surname, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const sqlQuery =
      "INSERT INTO members (Username, Firstname, Surname, Email, Password) VALUES (?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [
      username,
      firstname,
      surname,
      email,
      encryptedPassword,
    ]);

    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/food", async function (req, res) {
  try {
    const { username, firstname, surname, email, password } = req.body;

    const sqlQuery =
      "INSERT INTO members (Username, Firstname, Surname, Email, Password) VALUES (?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [
      username,
      firstname,
      surname,
      email,
      encryptedPassword,
    ]);

    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/shopping", async function (req, res) {
  try {
    const { username, firstname, surname, email, password } = req.body;

    const sqlQuery =
      "INSERT INTO members (Username, Firstname, Surname, Email, Password) VALUES (?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [
      username,
      firstname,
      surname,
      email,
      encryptedPassword,
    ]);

    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/transport", async function (req, res) {
  try {
    const { username, firstname, surname, email, password } = req.body;

    const sqlQuery =
      "INSERT INTO members (Username, Firstname, Surname, Email, Password) VALUES (?,?,?,?,?,?)";
    const result = await pool.query(sqlQuery, [
      username,
      firstname,
      surname,
      email,
      encryptedPassword,
    ]);

    res.status(200).json({ userId: result.insertId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

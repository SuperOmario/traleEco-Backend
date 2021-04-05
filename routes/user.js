const express = require("express");
const router = express.Router();
const pool = require("../startup/db");
const bcrypt = require("bcrypt");

router.post("/register", async function (req, res) {
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

router.post("/login", async function (req, res) {
  try {
    const { username, password } = req.body;

    const sqlGetUser = "SELECT Password FROM members WHERE username=?";

    const rows = await pool.query(sqlGetUser, username);
    console.log(rows);

    if (rows.length > 0) {
      console.log("returned password", rows[0].Password);
      const isValid = await bcrypt.compare(password, rows[0].Password);
      res.status(200).json({ valid_password: isValid });
    }
    res.status(200).send(`No user with the username "${username}" found`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

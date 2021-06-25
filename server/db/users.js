const express = require("express");
const router = express.Router();
const { database } = require("../config/dbConnection");

/** CREATE TABLE - [Manually] */
router.get("/create-table", (req, res) => {
  let sql = `CREATE TABLE users (
        email_id VARCHAR(255) NOT NULL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number INT
      )`;
  database.query(sql, function (err, result) {
    if (err) return res.send(err);
    res.send("Users table created!");
    console.log("Users table created!");
  });
});

/** TRUNCATE - [Not in use] */
router.get("/truncate-table", (req, res) => {
  let sql = "TRUNCATE TABLE users";
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    console.log(result);
    res.send(result);
  });
});

/** DROP - [Not in use] */
router.get("/drop-table", (req, res) => {
  let sql = "DROP TABLE users";
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    console.log(result);
    res.send(result);
  });
});

module.exports = router;

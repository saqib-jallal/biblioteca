const express = require("express");
const router = express.Router();
const { database } = require("../config/dbConnection");

/** CREATE TABLE - [Manually] */
router.get("/create-table", (req, res) => {
  let sql = `CREATE TABLE checkedOutBooks (
        email_id VARCHAR(255) NOT NULL,
        book_id INT NOT NULL,
        number_of_copies INT DEFAULT 0,
        FOREIGN KEY (email_id) REFERENCES users(email_id),
        FOREIGN KEY (book_id) REFERENCES books(book_id)
      )`;
  database.query(sql, function (err, result) {
    if (err) return res.send(err);
    res.send("CheckedOutBooks table created!");
    console.log("CheckedOutBooks table created!");
  });
});

/** DROP - [Not in use] */
router.get("/drop-table", (req, res) => {
  let sql = "DROP TABLE checkedOutBooks";
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    console.log(result);
    res.send(result);
  });
});

/** TRUNCATE - [Not in use] */
router.get("/truncate-table", (req, res) => {
  let sql = "TRUNCATE TABLE checkedOutBooks";
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    console.log(result);
    res.send(result);
  });
});

module.exports = router;

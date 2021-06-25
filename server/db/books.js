const express = require("express");
const router = express.Router();
const { database } = require("../config/dbConnection");

/** CREATE TABLE - [Manually] */
router.get("/create-table", (req, res) => {
  let sql = `CREATE TABLE books (
      book_id INT NOT NULL AUTO_INCREMENT PRIMARY_KEY, 
      book_name VARCHAR(255), 
      total_copies INT, 
      available_copies INT, 
      author_name VARCHAR(255), 
      year_published DATE(8)
    )`;
  database.query(sql, function (err, result) {
    if (err) return res.send(err);
    res.send("Books table created!");
    console.log("Books table created!");
  });
});

/** TRUNCATE - [Not in use] */
router.get("/truncate-table", (req, res) => {
  let sql = "TRUNCATE TABLE books";
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    console.log(result);
    res.send(result);
  });
});

/** DROP - [Not in use] */
router.get("/drop-table", (req, res) => {
  let sql = "DROP TABLE books";
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    console.log(result);
    res.send(result);
  });
});

/** INSERT BOOKS - [Manually] */
router.get("/insert", (req, res) => {
  books.forEach((book) => {
    let book_name = book.book_name;
    let total_copies = book.total_copies;
    let available_copies = book.available_copies;
    let author_name = book.author_name;
    let year_published = book.year_published;

    let sql = `INSERT INTO books (
      book_name, 
      total_copies, 
      available_copies, 
      author_name, 
      year_published
      ) values (
        '${book_name}', 
        ${total_copies}, 
        ${available_copies}, 
        '${author_name}', 
        '${year_published}'
      )`;
    database.query(sql, function (err, result) {
      if (err) return res.send(err);
      // res.json({ book: book });
      console.log(`${book_name} inserted!`);
    });
  });
  res.send("Books Inserted");
});

/** UPDATE - [Not in use] */
router.get("/update", (req, res) => {
  let sql = `UPDATE books SET available_copies=2 WHERE book_id=3`;
  database.query(sql, (error, result) => {
    if (!error) return res.send(result);
    res.send(error);
  });
});

/** DELETE - [Not in use] */
router.get("/delete", (req, res) => {
  let sql = `DELETE FROM books WHERE book_id > 1`;
  database.query(sql, (error, result) => {
    if (error) return res.send(error);
    res.send(result);
    console.log(result);
  });
});

module.exports = router;

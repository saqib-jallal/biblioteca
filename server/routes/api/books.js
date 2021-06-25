const express = require("express");
const router = express.Router();
const { database } = require("../../config/dbConnection");
const isLoggedIn = require("../../middlewares/isLoggedIn");

/**
 * @route :  GET api/books
 * @desc :   Will return a list of all unchecked-out books.
 * @access : PRIVATE
 */
router.get("/", isLoggedIn, (req, res) => {
  let sql = `SELECT * FROM books WHERE available_copies > 0`;
  database.query(sql, (error, rows, fields) => {
    if (error) return res.send(error);
    res.status(200).json(rows);
  });
});

/**
 * @route :  GET api/books/checkout
 * @desc :   Will return a list of all checked-out books [For a particular user | Librarian].
 * @access : PRIVATE
 */
router.get("/checkout", isLoggedIn, (req, res) => {
  // Check if librarian [librarian@gmail.com == Librarian]
  // A librarian should be able to see all the checkedout books.
  if (req.user.email_id === "librarian@gmail.com") {
    let sql = `SELECT * FROM books b, (SELECT * FROM checkedOutBooks) c WHERE b.book_id = c.book_id`;
    database.query(sql, (error, rows, fields) => {
      if (error) return res.send(error);
      if (rows.length > 1)
        return res.status(400).json({ msg: "No checkedout books!" });
      return res.status(200).json(rows);
    });
  }

  // If not a librarian [All the checked out books by a particular user]
  let sql = `SELECT * FROM books b, (SELECT * FROM checkedOutBooks WHERE email_id = '${req.user.email_id}') c WHERE b.book_id = c.book_id`;
  database.query(sql, (error, rows, fields) => {
    if (error) return res.send(error);
    if (rows.length < 1)
      return res.status(400).json({ msg: "No checkedout books!" });
    return res.status(200).json(rows);
  });
});

/**
 * @route :  POST api/books/checkout/:book_id
 * @desc :   Will checkout a book.
 * @access : PRIVATE
 */
router.post("/checkout/:book_id", isLoggedIn, (req, res) => {
  let sql = `SELECT * FROM books WHERE book_id = ${req.params.book_id}`;
  database.query(sql, (error, rows, fields) => {
    // console.log(rows);
    if (error) return res.send(error);
    if (rows[0].available_copies > 0) {
      // Check if the user has already checkedout that book.
      let available_copies = rows[0].available_copies - 1;
      sql = `UPDATE books SET available_copies = ${available_copies} WHERE book_id = ${req.params.book_id}; SELECT * FROM checkedOutBooks WHERE email_id = '${req.user.email_id}' AND book_id = ${req.params.book_id}`;
      database.query(sql, (error, rows, fields) => {
        if (error) return res.send(error);
        if (rows[1].length > 0) {
          // If YES: Just update the book.number_of_copies.
          // console.log(rows[1][0].number_of_copies);
          let number_of_copies = rows[1][0].number_of_copies + 1;
          // console.log(number_of_copies);
          let sql = `UPDATE checkedOutBooks SET number_of_copies = ${number_of_copies} WHERE email_id = '${req.user.email_id}' AND book_id = ${req.params.book_id}`;
          database.query(sql, (error, result) => {
            if (error) return res.send(error);
            return res.send(result);
          });
        } else {
          // If NO: Insert a new row.
          sql = `INSERT INTO checkedOutBooks VALUES ('${req.user.email_id}', ${req.params.book_id}, 1 )`;
          database.query(sql, (error, result) => {
            if (error) {
              if (error.code === "ER_NO_REFERENCED_ROW_2")
                return res.send("Book not found!");
              return res.send(error);
            }
            return res.send(result);
          });
        }
      });
    } else res.status(400).json({ msg: "Not enough books to checkout." });
  });
});

/**
 * @route :  POST api/books/return/:book_id
 * @desc :   Will return a book.
 * @access : PRIVATE
 */
router.post("/return/:book_id", isLoggedIn, (req, res) => {
  let sql = `SELECT * from checkedOutBooks WHERE email_id = '${req.user.email_id}' AND book_id = ${req.params.book_id}`;
  database.query(sql, (error, rows, fields) => {
    if (error) return res.send(error);
    if (rows.length < 1)
      return res.status(400).json({ msg: "Book not found." });
    returned_copies = rows[0].number_of_copies;
    let sql = `SELECT * FROM books WHERE book_id = ${req.params.book_id}`;
    database.query(sql, (error, rows, fields) => {
      if (error) return res.send(error);
      available_copies = rows[0].available_copies + returned_copies;
      let sql = `UPDATE books SET available_copies = ${available_copies} WHERE book_id = ${req.params.book_id}; DELETE FROM checkedOutBooks WHERE email_id = '${req.user.email_id}' AND book_id = ${req.params.book_id}`;
      database.query(sql, (error, result) => {
        if (error) return res.send(error);
        return res.status(200).json({ msg: "Book returned successfully." });
      });
    });
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

module.exports = router;

books = [
  {
    book_id: 1,
    book_name: "Java",
    total_copies: 3,
    available_copies: 3,
    author_name: "James Gosling",
    year_published: "96-01-23",
  },
  {
    book_id: 2,
    book_name: "Python",
    total_copies: 5,
    available_copies: 5,
    author_name: "Guido van Rossum",
    year_published: "1991-02-01",
  },
  {
    book_id: 3,
    book_name: "CPP",
    total_copies: 2,
    available_copies: 2,
    author_name: "Bjarne Stroustrup",
    year_published: "1985-01-01",
  },
];

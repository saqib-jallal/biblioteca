const express = require("express");
const router = express.Router();
const { database } = require("../../config/dbConnection");
const config = require("../../config/default.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const isLoggedIn = require("../../middlewares/isLoggedIn");

/**
 * @route : GET api/user
 * @desc :  Load user
 * @access : PRIVATE
 */
router.get("/", isLoggedIn, (req, res) => {
  let sql = `SELECT * FROM users WHERE email_id = '${req.user.email_id}'`;
  database.query(sql, (error, rows, fields) => {
    if (error) return res.send(error);
    return res.status(200).json(rows);
  });
});

/**
 * @route : POST api/user
 * @desc :  Create a user [SIGN UP]
 * @access : PUBLIC
 */
router.post(
  "/",
  [
    check("email_id", "Email is required.").isEmail(),
    check("full_name", "Name is required.").notEmpty(),
    check("user_name", "User name is required.").notEmpty(),
    check("password").isLength({ min: 4 }),
    check("phone_number").isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let { email_id, full_name, user_name, password, phone_number } = req.body;

    // Encrypt the password.
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    sql = `INSERT INTO users (
      email_id, 
      full_name, 
      user_name, 
      password, 
      phone_number
    ) values (
      '${email_id}', 
      '${full_name}', 
      '${user_name}', 
      '${password}', 
      '${phone_number}'
    )`;
    database.query(sql, (err, result) => {
      // Check if user already exists.
      if (err) {
        if ((err.code = "ER_DUP_ENTRY"))
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists." }] });
        return res.send(err);
      }
      const payload = {
        user: {
          email_id: email_id,
        },
      };

      // Sign a jwt token containing the user email_id and send it to client.
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, result });
        }
      );
    });
  }
);

module.exports = router;

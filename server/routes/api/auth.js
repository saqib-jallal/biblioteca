const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { database } = require("../../config/dbConnection");
const config = require("../../config/default.json");
const bcrypt = require("bcryptjs");

/**
 * @route :  POST api/auth
 * @desc :   User signin route
 * @access : PUBLIC
 */
router.post(
  "/",
  [
    check("email_id", "Email id is required.").isEmail(),
    check("password", "Password is required.").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let { email_id, password } = req.body;

    let sql = `SELECT * FROM users WHERE email_id = '${email_id}'`;
    database.query(sql, async (error, rows, fields) => {
      if (error) return res.send(error);
      if (rows.length < 1)
        return res
          .status(400)
          .json({ errors: [{ msg: "User doesn't exists." }] });
      const isMatch = await bcrypt.compare(password, rows[0].password);
      if (!isMatch)
        res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      const payload = {
        user: {
          email_id: rows[0].email_id,
        },
      };
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 360000 },
        (error, token) => {
          if (error) return res.send(error);
          return res.status(200).json({ token, rows });
        }
      );
    });
  }
);

module.exports = router;

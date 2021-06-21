const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../middleware/passportConfig")(passport);
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect();


// Get User
router.get("/get-user/:username", (req, res) => {
    let searchForUserStatement = `
        SELECT id, username, created_at, updated_at FROM users 
        WHERE username = '${req.params.username}' 
        LIMIT 1
    `;

    connection.query(searchForUserStatement, (err, rows) => {
        if (err) throw err;
        res.send(rows[0])
    })
});



// Log In
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      console.log("No user exists, ", info);
    } else {
      console.log("User found", user);
      req.login(user, (err) => {
        if (err) throw err;
        res.send("Successfully authenticated");
      });
    }
  })(req, res, next);
});



// Log Out
router.post("/logout", (req, res, next) => {
  console.log("logging out " + req.user.username);
  req.logout();
  req.session.destroy((err) => {
    if (err) return next(err);
    return res.send({ authenticated: req.isAuthenticated() });
  });
});


// Register
router.post("/register", (req, res) => {
  let searchForUserStatement = `
        SELECT * FROM users 
        WHERE username = '${req.body.username}' 
        LIMIT 1
    `;

  connection.query(searchForUserStatement, async (err, rows, fields) => {
    if (err) throw err;
    if (rows[0]) {
      console.log("User Exists");
    }
    if (!rows[0]) {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      let insertUserStatement = `
        INSERT INTO users 
        (username, password) 
        VALUES 
        (
            '${req.body.username}', 
            '${hashedPassword}'
        )
      `;

      connection.query(insertUserStatement, (err) => {
        if (err) throw err;
        res.send(req.body);
        console.log("Registered user into database");
      });
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect();

router.post("/create", (req, res) => {
  try {
    console.log(req.body)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

module.exports = router
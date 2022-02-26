const mysql = require("mysql")
require("dotenv").config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  dateStrings: true,
  timezone: "UTC",
})

connection.connect((err) => {
  if (err) throw err
})

module.exports = connection

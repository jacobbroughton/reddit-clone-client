const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();
// const { formatISO } = require('date-fns')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  dateStrings: true,
  timezone: 'UTC'
});

connection.connect();

router.post("/:type", (req, res) => {

  const { type } = req.params

  let insertVoteStatement;

  if(type === "post") {
    const {
      userId,
      postId,
      value
    } = req.body.data

    console.log(value)

    insertVoteStatement = `
      INSERT INTO post_votes (user_id, post_id, vote_value) 
      VALUES (${userId}, ${postId}, ${value})
      ON DUPLICATE KEY UPDATE vote_value = ${value}
    `
  } else if (type === "comment") {
    const {
      userId,
      commentId,
      value
    } = req.body.data

    console.log(value)

    insertVoteStatement = `
      INSERT INTO comment_votes (user_id, comment_id, vote_value) 
      VALUES (${userId}, ${commentId}, ${value})
      ON DUPLICATE KEY UPDATE vote_value = ${value}
    `
  }

  connection.query(insertVoteStatement, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send(result)
  })
})

module.exports = router
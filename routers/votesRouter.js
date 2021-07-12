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

router.post("/", (req, res) => {

  // console.log(req)

  const {
    userId,
    postId,
    value
  } = req.body.data



  // let insertVoteStatement = `
  // IF EXISTS (
  //   SELECT * FROM votes 
  //     WHERE user_id = ${userId}
  //     AND post_id = ${postId}
  //   )
  //   BEGIN
  //     UPDATE votes 
  //     SET value = ${value}
  //     WHERE user_id = ${userId} 
  //     AND post_id = ${postId}
  //   END
  // ELSE
  // IF NOT EXISTS (
  //   SELECT * FROM votes 
  //     WHERE user_id = ${userId} 
  //     AND post_id = ${postId}
  //   )
  //   BEGIN
  //     INSERT INTO votes (user_id, post_id, value) 
  //     VALUES (${userId}, ${postId}, ${value})
  //   END
  // `

  console.log(req.body.data.voteObj)

  let insertVoteStatement = `
    INSERT INTO votes (user_id, post_id, vote_value) 
    VALUES (${userId}, ${postId}, ${value})
    ON DUPLICATE KEY UPDATE vote_value = ${value}
  `


  connection.query(insertVoteStatement, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send(result)
  })
})

module.exports = router
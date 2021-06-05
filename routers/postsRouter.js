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

router.post('/', (req, res) => {

  const createPostStatement = `
  INSERT INTO posts
  (post_type, title, body, author_id, subreddit_id, created_at, updated_at) 
  VALUES ('${req.body.postType}', '${req.body.title}', '${req.body.body}', '${req.body.authorId}', '${req.body.subredditId}', '${req.body.createdAt}', '${req.body.updatedAt}')
  `

  connection.query(createPostStatement, (err, rows) => {
    if(err) throw err;
    res.send("Created post")
  })
})

module.exports = router
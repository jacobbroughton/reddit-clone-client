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

// Add comment
router.post('/', (req, res) => {
  let comment = req.body
  
  let addCommentStatement = `
    INSERT INTO comments 
    (body, author_id, post_id, parent_comment)
    VALUES ('${comment.body}', ${comment.authorId}, ${comment.postId}, ${comment.parentComment})
  `

  connection.query(addCommentStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})

// Get all comments for a post
router.get('/:postId', (req, res) => {
  let getCommentsStatement = `
    SELECT c.id, c.body, c.author_id, c.post_id, c.parent_comment, u.username, c.created_at, c.updated_at
    FROM comments AS c
    INNER JOIN users AS u ON c.author_id = u.id
    WHERE post_id = ${req.params.postId}
    ORDER BY c.id DESC
  `

  connection.query(getCommentsStatement, (err, rows) => {
    if(err) throw err
    console.log(rows)
    res.send(rows)
  })
})

module.exports = router
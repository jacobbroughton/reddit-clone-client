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
    (body, author_id, post_id, parent_comment, created_at, updated_at)
    VALUES ('${comment.body}', ${comment.authorId}, ${comment.postId}, ${comment.parentComment}, '${comment.createdAt}', '${comment.updatedAt}' )
  `

  connection.query(addCommentStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})

// Get all comments for a post
router.get('/:postId', (req, res) => {
  let getCommentsStatement = `
    SELECT * FROM comments
    WHERE post_id = ${req.params.postId}
  `

  connection.query(getCommentsStatement, (err, rows) => {
    if(err) throw err
    res.send(rows)
  })
})

module.exports = router
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
// const { deleteComment } = require("../client/src/actions/commentsActions");
require("dotenv").config();

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

// Add comment
router.post('/', (req, res) => {
  let comment = req.body

  console.log(comment)
  
  let addCommentStatement = `
    INSERT INTO comments 
    (body, author_id, post_id, parent_comment)
    VALUES ('${comment.body}', ${comment.author_id}, ${comment.post_id}, ${comment.parent_comment})
  `

  connection.query(addCommentStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})


router.put('/:commentId', (req, res) => {
  let { commentId } = req.params
  let { body } = req.body

  let editCommentStatement = `
    UPDATE comments 
    SET body = '${body}'
    WHERE comments.id = ${commentId}
  `

  connection.query(editCommentStatement, (err, result) => {
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
    console.log('COMMENTS', rows)
    res.send(rows)
  })
})


router.delete('/', (req, res) => {
  console.log(req.body)
  const { id } = req.body

  const deleteCommentStatement = `
    DELETE
    FROM comments
    WHERE id = ${id}
  `

  connection.query(deleteCommentStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })
  
})

module.exports = router
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();
const { formatISO } = require('date-fns')

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


// Get all posts
router.get('/', (req, res) => {

  let subredditName = req.query.filters


  // -------- The join line is messing things up -------
  const getPostsStatement = `
    SELECT p.id, p.post_type, p.title, p.body, p.author_id, p.subreddit_id, p.subreddit_name, p.created_at, p.updated_at, u.username FROM posts AS p
    INNER JOIN users AS u ON p.author_id = u.id
    ${subredditName ? `WHERE p.subreddit_name = '${subredditName}'` : ''}
  `

  connection.query(getPostsStatement, (err, rows) => {
    if(err) throw err;
    res.send(rows)
  })
})


// Get single post
router.get('/single/:postId', (req, res) => {

  const getSinglePostStatement = `
  SELECT p.id, p.post_type, p.title, p.body, p.author_id, p.subreddit_id, p.subreddit_name, p.created_at, p.updated_at, u.username FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id
  WHERE p.id = ${req.params.postId}
  LIMIT 1
`

connection.query(getSinglePostStatement, (err, rows) => {
  if(err) throw err
  res.send(rows[0])
})
})


router.put('/single/:postId', (req, res) => {

  const updatePostBodyStatement = `
    UPDATE posts 
    SET body = '${req.body.body}', updated_at = NOW()
    WHERE id = ${req.params.postId}
    LIMIT 1
  ` 

  const getSinglePostStatement = `
  SELECT * FROM posts 
  WHERE id = ${req.params.postId}
  LIMIT 1
`

  connection.query(updatePostBodyStatement, (err, rows) => {
    if(err) throw err
    connection.query(getSinglePostStatement, (err, rows) => {
      if(err) throw err;
      res.send(rows[0])
    })
  })
})


// Add new post
router.post('/', (req, res) => {

  const createPostStatement = `
  INSERT INTO posts
  (post_type, title, body, author_id, subreddit_id, subreddit_name) 
  VALUES ('${req.body.postType}', '${req.body.title}', '${req.body.body}', '${req.body.authorId}', '${req.body.subredditId}', '${req.body.subredditName}')
  `

  connection.query(createPostStatement, (err, result) => {
    if(err) throw err;
    res.send(result)
  })
})


router.delete('/', (req, res) => {
  
  const id = req.body.id

  console.log(id)

  const deletePostStatement = `
    DELETE p, c
    FROM posts as p
    LEFT JOIN comments AS c ON p.id = c.post_id
    WHERE p.id = ${id}
  `

  connection.query(deletePostStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })

})

module.exports = router
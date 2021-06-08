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


// Get all posts
router.get('/', (req, res) => {

  const getAllPostsStatement = `
    SELECT * FROM posts 
  `

  connection.query(getAllPostsStatement, (err, rows) => {
    if(err) throw err;
    res.send(rows)
  })
})


// Get all posts in subreddit
router.get('/:subredditId', (req, res) => {

  const getSubredditPostsStatement = `
  SELECT * FROM posts 
  WHERE subreddit_id = ${req.params.subredditId}
`
  connection.query(getSubredditPostsStatement, (err, rows) => {
    if(err) throw err
    console.log(rows)
    res.send(rows)
  })
})


// Get single post
router.get('/single/:postId', (req, res) => {

  const getSinglePostStatement = `
  SELECT * FROM posts 
  WHERE id = ${req.params.postId}
  LIMIT 1
`

connection.query(getSinglePostStatement, (err, rows) => {
  if(err) throw err
  res.send(rows[0])
})
})



// Add new post
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
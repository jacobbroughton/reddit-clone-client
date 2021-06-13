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

  let subredditName = req.query.filters

  const getPostsStatement = `
    SELECT * FROM posts ${subredditName && `WHERE subreddit_name = '${subredditName}'`}
  `

  // connection.query(getAllPostsStatement, (err, rows) => {
  //   if(err) throw err;
  //   res.send(rows)
  // })

  connection.query(getPostsStatement, (err, rows) => {
    if(err) throw err;
    res.send(rows)
  })
})


// Get all posts in subreddit
// router.get('/:subredditId', (req, res) => {

//   const getSubredditPostsStatement = `
//   SELECT * FROM posts 
//   WHERE subreddit_id = ${req.params.subredditId}
// `
//   connection.query(getSubredditPostsStatement, (err, rows) => {
//     if(err) throw err
//     res.send(rows)
//   })
// })


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


router.put('/single/:postId', (req, res) => {

  const updatePostBodyStatement = `
    UPDATE posts 
    SET body = '${req.body.body}'
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

  console.log(req.body)

  const createPostStatement = `
  INSERT INTO posts
  (post_type, title, body, author_id, subreddit_id, subreddit_name, created_at, updated_at) 
  VALUES ('${req.body.postType}', '${req.body.title}', '${req.body.body}', '${req.body.authorId}', '${req.body.subredditId}', '${req.body.subredditName}', '${req.body.createdAt}', '${req.body.updatedAt}')
  `

  connection.query(createPostStatement, (err, result) => {
    if(err) throw err;
    res.send(result)
  })
})

module.exports = router
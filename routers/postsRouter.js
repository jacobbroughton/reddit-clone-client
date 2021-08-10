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


// Get all posts
router.get('/', (req, res) => {

  let subredditName = req.query.filters
  let { userId } = req.query


//   const getPostsStatement = `
//   SELECT p.*, u.username, v.*,
//     ${userId ? `CASE 
//       WHEN v.user_id = ${userId} AND v.post_id = p.id THEN v.vote_value
//       ELSE NULL
//     END AS has_voted,` : ''} 
//     COALESCE(SUM(v.vote_value), 0) AS vote_count
//     FROM posts AS p
//     INNER JOIN users AS u ON p.author_id = u.id 
//     LEFT JOIN votes AS v ON v.post_id = p.id
//     ${subredditName ? `WHERE p.subreddit_name = '${subredditName}'` : ''} 
//     GROUP BY p.id
// `

const getPostsStatement = `
SELECT p.*, u.username, v.user_id, v.post_id, v.vote_value,
  ${userId ? `(
    SELECT vote_value FROM votes WHERE votes.post_id = p.id AND votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,` : ''} 
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id 
  LEFT JOIN votes AS v ON v.post_id = p.id
  ${subredditName ? `WHERE p.subreddit_name = '${subredditName}'` : ''} 
  GROUP BY p.id
`

  connection.query(getPostsStatement, (err, rows) => {
    if(err) throw err;
    res.send(rows)
  })
})


// Get single post
router.get('/single/:postId/:userId', (req, res) => {

  let { postId, userId } = req.params

  console.log("Hello")
  console.log(typeof(userId), userId)

  const getSinglePostStatement = `
  SELECT p.*, u.username, v.vote_value,
  ${userId !== '' ? `(
    SELECT vote_value FROM votes WHERE votes.post_id = p.id AND votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,` : ''} 
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id
  LEFT JOIN votes v ON p.id = v.post_id 
  WHERE p.id = ${postId}
  LIMIT 1
`

connection.query(getSinglePostStatement, (err, rows) => {
  if(err) throw err
  console.log(rows[0])
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
    DELETE p, c, v
    FROM posts as p
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN votes AS v ON p.id = v.post_id
    WHERE p.id = ${id}
  `

  connection.query(deletePostStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })

})

module.exports = router
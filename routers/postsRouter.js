const express = require("express");
const router = express.Router();
const db = require("../db")


// Get all posts
router.get('/', (req, res) => {

  let subredditName = req.query.filters
  let { userId } = req.query


const getPostsStatement = `
  SELECT p.*, u.username, v.user_id, v.post_id, v.vote_value,
  ${userId ? `(
    SELECT vote_value FROM post_votes WHERE post_votes.post_id = p.id AND post_votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,` : ''}
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id 
  LEFT JOIN post_votes AS v ON v.post_id = p.id
  ${subredditName ? `WHERE p.subreddit_name = '${subredditName}'` : ''} 
  GROUP BY p.id
`

  db.query(getPostsStatement, (err, rows) => {
    if(err) throw err;
    res.send(rows)
  })
})
// 


// Get single post
router.get('/single/:postId/:userId', (req, res) => {

  let { postId, userId } = req.params

  console.log(userId)

  const getSinglePostStatement = `
  SELECT p.*, u.username, v.vote_value,
  ${userId ? `(
    SELECT vote_value FROM post_votes WHERE post_votes.post_id = p.id AND post_votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,` : ''} 
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id
  LEFT JOIN post_votes v ON p.id = v.post_id 
  WHERE p.id = ${postId}
  LIMIT 1
`

console.log(getSinglePostStatement)

db.query(getSinglePostStatement, (err, rows) => {
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

  db.query(updatePostBodyStatement, (err) => {
    if(err) throw err
    db.query(getSinglePostStatement, (err, rows) => {
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

  db.query(createPostStatement, (err, result) => {
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
    LEFT JOIN post_votes AS v ON p.id = v.post_id
    WHERE p.id = ${id}
  `

  db.query(deletePostStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })

})

module.exports = router
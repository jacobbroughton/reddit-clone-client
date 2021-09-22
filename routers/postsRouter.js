const express = require("express");
const { check } = require("express-validator")
const returnErrors = require("../middleware/validatorErrors")
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
router.get('/single/:postId/:userId?', (req, res) => {

  let { postId, userId } = req.params

  const getSinglePostStatement = `
  SELECT p.*, u.username, v.vote_value,
  ${userId ? `(
    SELECT vote_value FROM post_votes WHERE post_votes.post_id = p.id AND post_votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,` : ''} 
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id
  LEFT JOIN post_votes v ON p.id = v.post_id 
  WHERE p.id = ?
  LIMIT 1
`

db.query(getSinglePostStatement, [postId], (err, rows) => {
  if(err) throw err
  console.log(rows[0])
  res.send(rows[0])
})
})


router.put('/single/:postId', [
  check('body').trim().escape()
],(req, res) => {

  const { body } = req.body
  const { postId } = req.params

  const updatePostBodyStatement = `
    UPDATE posts 
    SET body = ?, updated_at = NOW()
    WHERE id = ?
    LIMIT 1
  ` 

  const getSinglePostStatement = `
  SELECT * FROM posts 
  WHERE id = ?
  LIMIT 1
`

  db.query(updatePostBodyStatement, [body, postId], (err) => {
    if(err) throw err
    db.query(getSinglePostStatement, [postId], (err, rows) => {
      if(err) throw err;
      res.send(rows[0])
    })
  })
})


// Add new post
router.post('/', [
  check('postType').isString().isLength(4).withMessage("Post type must be either 'Link' or 'Text'"),
  check('title').notEmpty().withMessage('Post title cannot be empty').escape().trim(),
  check('body').notEmpty().withMessage('Post body cannot be empty').trim().escape(),
  check('authorId').isNumeric(),
  check('subredditId').notEmpty().withMessage('You must post to a subreddit'),
  check('subredditName').notEmpty().withMessage('You must post to a subreddit').escape()
], (req, res) => {

  const validatorFailed = returnErrors(req, res)

  if(validatorFailed) return 

  const { postType, title, body, authorId, subredditId, subredditName } = req.body

  const createPostStatement = `
  INSERT INTO posts
  (post_type, title, body, author_id, subreddit_id, subreddit_name) 
  VALUES (?, ?, ?, ?, ?, ?)
  `

  db.query(createPostStatement, [postType, title, body, authorId, subredditId, subredditName], (err, result) => {
    if(err) throw err;
    res.send(result)
  })
})


router.delete('/', [
  check('id').notEmpty().withMessage('In order to delete a post, it must be a valid post').isNumeric()
], (req, res) => {
  
  const { id } = req.body

  const validatorFailed = returnErrors(req, res)

  if(validatorFailed) return 

  const deletePostStatement = `
    DELETE p, c, v
    FROM posts as p
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN post_votes AS v ON p.id = v.post_id
    WHERE p.id = ?
  `

  db.query(deletePostStatement, [id], (err, result) => {
    if(err) throw err
    res.send(result)
  })

})

module.exports = router
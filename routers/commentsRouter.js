const express = require("express");
const router = express.Router();
const db = require("../db")

// Add comment
router.post('/', (req, res) => {
  const { body, author_id, post_id, parent_comment } = req.body
  
  let addCommentStatement = `
    INSERT INTO comments 
    (body, author_id, post_id, parent_comment)
    VALUES (?, ?, ?, ?)
  `

  db.query(addCommentStatement, [body, author_id, post_id, parent_comment], (err, result) => {
    if(err) throw err
    res.send(result)
  })
})


router.put('/:commentId', (req, res) => {
  let { commentId } = req.params
  let { body } = req.body

  let editCommentStatement = `
    UPDATE comments 
    SET body = ?
    WHERE comments.id = ?
  `

  db.query(editCommentStatement, [body, commentId], (err, result) => {
    if(err) throw err
    res.send(result)
  })
})


// Get all comments for a post
router.get('/:postId', (req, res) => {

  const { userId } = req.query
  const { postId } = req.params

  let getCommentsStatement = `
    SELECT c.*, u.username, u.profile_picture, v.comment_id, v.vote_value,
    ${userId ? `(
      SELECT vote_value FROM comment_votes v WHERE v.comment_id = c.id AND v.user_id = ${userId} LIMIT 1
    ) AS has_voted,` : ''} 
    COALESCE(SUM(v.vote_value), 0) AS vote_count
    FROM comments AS c
    INNER JOIN users AS u ON c.author_id = u.id
    LEFT JOIN comment_votes AS v ON v.comment_id = c.id
    WHERE c.post_id = ?
    GROUP BY c.id
    ORDER BY c.id DESC
  `

  db.query(getCommentsStatement, [postId], (err, rows) => {
    if(err) throw err
    res.send(rows)
  })
})


router.delete('/', (req, res) => {
  const { id } = req.body

  const deleteCommentStatement = `
    DELETE c, v
    FROM comments AS c
    LEFT JOIN comment_votes AS v ON c.id = v.comment_id
    WHERE c.id = ?
  `

  db.query(deleteCommentStatement, [id], (err, result) => {
    if(err) throw err
    res.send(result)
  })
  
})

module.exports = router
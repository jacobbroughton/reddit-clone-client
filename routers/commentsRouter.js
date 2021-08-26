const express = require("express");
const router = express.Router();
const db = require("../db")

// Add comment
router.post('/', (req, res) => {
  let comment = req.body
  
  let addCommentStatement = `
    INSERT INTO comments 
    (body, author_id, post_id, parent_comment)
    VALUES ('${comment.body}', ${comment.author_id}, ${comment.post_id}, ${comment.parent_comment})
  `

  db.query(addCommentStatement, (err, result) => {
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

  db.query(editCommentStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})


// Get all comments for a post
router.get('/:postId', (req, res) => {

  const { userId } = req.query

  let getCommentsStatement = `
    SELECT c.*, u.username, v.comment_id, v.vote_value,
    ${userId ? `(
      SELECT vote_value FROM comment_votes v WHERE v.comment_id = c.id AND v.user_id = ${userId} LIMIT 1
    ) AS has_voted,` : ''} 
    COALESCE(SUM(v.vote_value), 0) AS vote_count
    FROM comments AS c
    INNER JOIN users AS u ON c.author_id = u.id
    LEFT JOIN comment_votes AS v ON v.comment_id = c.id
    WHERE c.post_id = ${req.params.postId}
    GROUP BY c.id
    ORDER BY c.id DESC
  `

  db.query(getCommentsStatement, (err, rows) => {
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
    WHERE c.id = ${id}
  `

  db.query(deleteCommentStatement, (err, result) => {
    if(err) throw err
    res.send(result)
  })
  
})

module.exports = router
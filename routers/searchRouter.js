const express = require("express");
const router = express.Router();
const db = require("../db")

router.get("/", (req, res) => {

  let { userId, subredditName, q } = req.query

  if(userId === 'null' || userId === 'undefined') userId = null
  if(subredditName === 'null' || subredditName === 'undefined') subredditName = null

  let searchStatement = `
  SELECT p.*, u.username, v.user_id, v.post_id, v.vote_value,
  ${userId ? `(
    SELECT vote_value FROM post_votes WHERE post_votes.post_id = p.id AND post_votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,` : ''} 
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id 
  LEFT JOIN post_votes AS v ON v.post_id = p.id
  WHERE (p.title LIKE '%?%' OR p.body LIKE '%?%')
  ${subredditName ? `AND p.subreddit_name = '${subredditName}'` : ''} 
  GROUP BY p.id
  `

  db.query(searchStatement, [q, q], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

module.exports = router
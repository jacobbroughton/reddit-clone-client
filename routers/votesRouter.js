const express = require("express");
const router = express.Router();
const db = require("../db")

router.post("/:type", (req, res) => {

  const { type } = req.params

  let insertVoteStatement;

  if(type === "post") {
    const {
      userId,
      postId,
      value
    } = req.body.data

    console.log(value)

    insertVoteStatement = `
      INSERT INTO post_votes (user_id, post_id, vote_value) 
      VALUES (${userId}, ${postId}, ${value})
      ON DUPLICATE KEY UPDATE vote_value = ${value}
    `
  } else if (type === "comment") {
    const {
      userId,
      commentId,
      value
    } = req.body.data

    console.log(value)

    insertVoteStatement = `
      INSERT INTO comment_votes (user_id, comment_id, vote_value) 
      VALUES (${userId}, ${commentId}, ${value})
      ON DUPLICATE KEY UPDATE vote_value = ${value}
    `
  }

  db.query(insertVoteStatement, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send(result)
  })
})

module.exports = router
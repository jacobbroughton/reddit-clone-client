const express = require("express");
const router = express.Router();
const db = require("../db")

router.post("/:type", (req, res) => {

  let insertVoteStatement;

  const { type } = req.params
  const { userId, value } = req.body.data
  const typeId = type === "post" ? req.body.data.postId : req.body.data.commentId

  if(type === "post") {

    insertVoteStatement = `
      INSERT INTO post_votes (user_id, post_id, vote_value)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE vote_value = ?
    `
  }
   else if (type === "comment") {

    insertVoteStatement = `
      INSERT INTO comment_votes (user_id, comment_id, vote_value) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE vote_value = ?
    `
  }

  db.query(insertVoteStatement,[userId, typeId, value, value] , (err, result) => {
    if(err) throw err
    console.log(result)
    res.send(result)
  })
})

module.exports = router
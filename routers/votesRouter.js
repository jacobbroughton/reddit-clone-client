const express = require("express")
const router = express.Router()
const db = require("../db")
const { check, param } = require("express-validator")
const checkForErrors = require("../middleware/validationUtils")
const { isAuth } = require("../middleware/authMiddleware")

router.post(
  "/:type",
  isAuth,
  [
    check("data.userId")
      .isNumeric()
      .notEmpty()
      .withMessage("User ID cannot be empty"),
    check("data.value")
      .isNumeric()
      .notEmpty()
      .withMessage("Vote value cannot be empty / null"),
    param("type")
      .notEmpty()
      .withMessage("Must specify the type of post")
      .isLength(4),
  ],
  (req, res) => {
    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    let insertVoteStatement

    const { type } = req.params
    const { userId, value } = req.body.data
    const typeId =
      type === "post" ? req.body.data.postId : req.body.data.commentId

    if (type === "post") {
      insertVoteStatement = `
      INSERT INTO post_votes (user_id, post_id, vote_value)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE vote_value = ?
    `
    } else if (type === "comment") {
      insertVoteStatement = `
      INSERT INTO comment_votes (user_id, comment_id, vote_value) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE vote_value = ?
    `
    }

    db.query(
      insertVoteStatement,
      [userId, typeId, value, value],
      (err, result) => {
        if (err) {
          res.status(404).send("Oops, your vote is not working")
        } else {
          res.send(result)
        }
      }
    )
  }
)

module.exports = router

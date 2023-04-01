const express = require("express")
const { check, param } = require("express-validator")
const checkForErrors = require("../middleware/validationUtils")
const router = express.Router()
const { encode, decode } = require("html-entities")
const db = require("../db")
const { isAuth } = require("../middleware/authMiddleware")

// Get single subreddit
router.get("/:name", isAuth, [param("name")], (req, res) => {
  const validatorFailed = checkForErrors(req, res)

  if (validatorFailed) return

  let { name } = req.params

  name = encode(name)

  try {
    const getSingleSubredditStatement = `
      SELECT * FROM subreddits
      WHERE name = ?
    `

    db.query(getSingleSubredditStatement, [name], (err, rows) => {
      if (err) {
        res
          .status(404)
          .send(
            "There was an error fetching this subreddit, please try a different one."
          )
        // throw err
      } else {
        res.send(rows[0])
      }
    })
  } catch (error) {
    res
      .status(404)
      .send(
        "There was an error fetching this subreddit, please try a different one."
      )
  }
})

// Get all subreddits
router.get("/", isAuth, (req, res) => {
  try {
    db.query("SELECT * FROM subreddits", (err, rows) => {
      res.send(rows)
    })
  } catch (e) {
    res
      .status(404)
      .send("There was an issue fetching subreddits, please try again")
  }
})

// Create subreddit
router.post(
  "/",
  isAuth,
  [
    check("userId").isNumeric(),
    check("name")
      .notEmpty()
      .withMessage("Subreddit name cannot be empty")
      .trim(),
    check("description").trim(),
  ],
  (req, res) => {
    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    let { userId, name, description } = req.body

    name = encode(name)
    description = encode(description)

    try {
      const insertSubredditStatement = `
    INSERT INTO subreddits 
    (user_id, name, description) 
    VALUES (?, ?, ?)`

      db.query(
        insertSubredditStatement,
        [userId, name, description],
        (err, results) => {
          if (err) {
            res.status(404).send("A subreddit with this name already exists")

            // throw err
          } else {
            res.send({ idForNewSubreddit: results.insertId })
          }
        }
      )
    } catch (e) {
      res.status(404).send("A subreddit with this name already exists")
    }
  }
)

// Delete subreddit
router.delete(
  "/:subredditId/:userId",
  isAuth,
  [
    param("subredditId")
      .notEmpty()
      .withMessage(
        "Must specify a subreddit with a valid ID in order to delete"
      ),
    param("userId")
      .notEmpty()
      .withMessage("Must be signed in to delete a subreddit"),
  ],
  (req, res) => {
    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    let { subredditId, userId } = req.params

    subredditId = encode(subredditId)
    userId = encode(userId)

    try {
      const deleteSubredditStatement = `
      DELETE s.*, p, c, pv, cv
      FROM subreddits AS s
      LEFT JOIN posts p ON p.subreddit_id = s.id
      LEFT JOIN comments c ON c.post_id = p.id
      LEFT JOIN post_votes pv ON pv.post_id = p.id
      LEFT JOIN comment_votes cv ON cv.comment_id = c.id
      WHERE s.user_id = ? AND s.id = ?
    `

      db.query(
        deleteSubredditStatement,
        [userId, subredditId],
        (err, results) => {
          if (err) {
            res
              .status(404)
              .send("Unable to delete subreddit, please try again.")
            // throw err
          } else {
            res.send(results)
          }
        }
      )
    } catch (error) {
      res.status(404).send("Unable to delete subreddit, please try again.")
    }
  }
)

module.exports = router

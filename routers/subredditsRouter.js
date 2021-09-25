const express = require("express");
const { check, param } = require("express-validator")
const checkForErrors = require("../middleware/validationUtils")
const router = express.Router();
const db = require("../db")

// Get single subreddit
router.get("/:name", [
  param('name').escape()
], (req, res) => {

  const validatorFailed = checkForErrors(req, res)

  if(validatorFailed) return 

  const { name } = req.params

  try {

    const getSingleSubredditStatement = `
      SELECT * FROM subreddits
      WHERE name = ?
    `

    db.query(getSingleSubredditStatement, [name], (err, rows) => {
      if(err) throw err

      
      res.send(rows[0])
    })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})


// Get all subreddits
router.get("/", (req, res) => {
  try{
    db.query('SELECT * FROM subreddits', (err, rows) => {
      res.send(rows)
    })
  } catch (e) {
    console.log("ERRORRRRRR")
    res.status(400).send({ error: e.message })
  }
})


// Create subreddit
router.post("/", [
  check('userId').isNumeric(),
  check('name').notEmpty().withMessage('Subreddit name cannot be empty').trim().escape(),
  check('description').trim().escape()
], (req, res) => {

  const validatorFailed = checkForErrors(req, res)

  if(validatorFailed) return 

  const { userId, name, description } = req.body

  try {
    const insertSubredditStatement = `
    INSERT INTO subreddits 
    (user_id, name, description) 
    VALUES (?, ?, ?)`

    db.query(insertSubredditStatement, [userId, name, description], (err, results) => {
      if(err) throw err

      res.send({ idForNewSubreddit: results.insertId })
    })

  } catch (e) {
    res.status(400).send({ error: 'A subreddit with this name already exists' })
  }
})

// Delete subreddit
router.delete('/:subredditId/:userId', [
  param('subredditId').notEmpty().withMessage('Must specify a subreddit with a valid ID in order to delete').escape(),
  param('userId').notEmpty().withMessage('Must be signed in to delete a subreddit').escape()
], (req, res) => {

  const validatorFailed = checkForErrors(req, res)

  if(validatorFailed) return 

  const { subredditId, userId } = req.params

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

    db.query(deleteSubredditStatement, [userId, subredditId], (err, results) => {
      if(err) throw err
      res.send(results)
    })
    
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
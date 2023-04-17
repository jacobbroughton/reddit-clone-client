const express = require("express")
const { check, param } = require("express-validator")
const checkForErrors = require("../middleware/validationUtils")
const router = express.Router()
const db = require("../db")
const { encode } = require("html-entities")
const { isAuth } = require("../middleware/authMiddleware")

// Get all posts
router.get("/", isAuth, (req, res) => {

  let subredditName = req.query.filters
  let { userId } = req.query

  subredditName = encode(subredditName)
  console.log(subredditName)

  const getPostsStatement = `
  SELECT p.*, u.username, v.user_id, v.post_id, v.vote_value,
  ${userId
      ? `(
    SELECT vote_value FROM post_votes WHERE post_votes.post_id = p.id AND post_votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,`
      : ""
    }
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id 
  LEFT JOIN post_votes AS v ON v.post_id = p.id
  ${subredditName ? `WHERE p.subreddit_name = '${subredditName}'` : ""} 
  GROUP BY p.id
`

  db.query(getPostsStatement, (err, rows) => {
    if (err) {
      res
        .status(404)
        .send("There was an error fetching the posts, please try again.")
      // throw err
    } else {
      res.send(rows)
    }
  })
})
//

// Get single post
router.get(
  "/single/:postId/:userId?",
  isAuth,
  [param("postId").notEmpty().isNumeric()],
  (req, res) => {
    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    let { postId, userId } = req.params

    postId = encode(postId)

    const getSinglePostStatement = `
  SELECT p.*, u.username, v.vote_value,
  ${userId
        ? `(
    SELECT vote_value FROM post_votes WHERE post_votes.post_id = p.id AND post_votes.user_id = ${userId} LIMIT 1
  ) AS has_voted,`
        : ""
      } 
  COALESCE(SUM(v.vote_value), 0) AS vote_count
  FROM posts AS p
  INNER JOIN users AS u ON p.author_id = u.id
  LEFT JOIN post_votes v ON p.id = v.post_id 
  WHERE p.id = ?
  LIMIT 1
`

    db.query(getSinglePostStatement, [postId], (err, rows) => {
      if (err) {
        res
          .status(404)
          .send("There was an error fetching this post, please try again.")
        // throw err
      } else {
        res.send(rows[0])
      }
    })
  }
)

// Edit single post
router.put(
  "/single/:postId",
  isAuth,
  [check("body").trim(), param("postId").isNumeric()],
  (req, res) => {
    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    const { body } = encode(req.body)
    const { postId } = encode(req.params)

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
      if (err) {
        res
          .status(404)
          .send("There was an error updating this post, please try again.")
        // throw err
      }
      db.query(getSinglePostStatement, [postId], (err, rows) => {
        if (err) {
          res
            .status(404)
            .send(
              "There was an error fetching the updated post, please try again."
            )
          // throw err
        } else {
          res.send(rows[0])
        }
      })
    })
  }
)

// Add new post
router.post(
  "/",
  isAuth,
  [
    check("postType")
      .isString()
      .isLength(4)
      .withMessage("Post type must be either 'Link' or 'Text'"),
    check("title").notEmpty().withMessage("Post title cannot be empty").trim(),
    check("body").trim(),
    check("authorId").isNumeric(),
    check("subredditId").notEmpty().withMessage("You must post to a subreddit"),
    check("subredditName")
      .notEmpty()
      .withMessage("You must post to a subreddit"),
  ],
  (req, res) => {
    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    let { postType, title, body, authorId, subredditId, subredditName } =
      req.body

    console.log(req.body)

    title = encode(title)
    body = encode(body)
    subredditName = encode(subredditName)

    console.log(req.body)

    const createPostStatement = `
  INSERT INTO posts
  (post_type, title, body, author_id, subreddit_id, subreddit_name) 
  VALUES (?, ?, ?, ?, ?, ?)
  `

    db.query(
      createPostStatement,
      [postType, title, body, authorId, subredditId, subredditName],
      (err, result) => {
        if (err) {
          res
            .status(404)
            .send("There was an error creating the post, please try again.")
          // throw err
        } else {
          res.send(result)
        }
      }
    )
  }
)

router.delete(
  "/",
  isAuth,
  [
    check("id")
      .notEmpty()
      .withMessage("In order to delete a post, it must be a valid post")
      .isNumeric(),
  ],
  (req, res) => {
    const { id } = req.body

    const validatorFailed = checkForErrors(req, res)

    if (validatorFailed) return

    const deletePostStatement = `
    DELETE p, c, v
    FROM posts as p
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN post_votes AS v ON p.id = v.post_id
    WHERE p.id = ?
  `

    db.query(deletePostStatement, [id], (err, result) => {
      if (err) {
        res
          .status(404)
          .send("There was an error deleting the post, please try again.")
        // throw err
      } else {
        res.send(result)
      }
    })
  }
)

module.exports = router

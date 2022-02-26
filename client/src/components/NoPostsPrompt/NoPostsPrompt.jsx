import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import "./NoPostsPrompt.scss"

const NoPostsPrompt = ({ user, darkMode }) => {
  return (
    <div className={`no-posts-prompt ${darkMode ? "dark" : ""}`}>
      <h3>It&apos;s quiet in here...😴</h3>
      {!user ? (
        <p>
          <Link to="/login">Sign In</Link> or{" "}
          <Link to="/register">Register</Link> to get a new conversation
          started.
        </p>
      ) : (
        <p>
          Create a new <Link to="/new-post?type=text">text</Link> or{" "}
          <Link to="/new-post?type=link">link</Link> post to get a conversation
          started.
        </p>
      )}
    </div>
  )
}

NoPostsPrompt.propTypes = {
  user: PropTypes.object,
  darkMode: PropTypes.bool,
}

export default NoPostsPrompt

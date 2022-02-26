import "./LogInPrompt.scss"
import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const LogInPrompt = ({ actionText }) => {
  const darkMode = useSelector((state) => state.darkMode)

  return (
    <div className={`log-in-prompt ${darkMode ? "dark" : ""}`}>
      <p>Log in or register to {actionText}</p>
      <div className="log-in-prompt__buttons">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

LogInPrompt.propTypes = {
  actionText: PropTypes.string,
}

export default LogInPrompt

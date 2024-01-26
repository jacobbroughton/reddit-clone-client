import "./SubredditDropdown.scss"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import React, { useEffect } from "react"
import { getSubreddits } from "../../../redux/actions/subredditsActions"
import { setCurrentSubreddit } from "../../../redux/actions/subredditActions"

const SubredditDropdown = ({
  setSubredditDropdownToggle,
  subredditDropdownToggle,
}) => {
  const dispatch = useDispatch()
  const subreddits = useSelector((state) => state.subreddits)
  

  useEffect(() => {
    dispatch(getSubreddits())
  }, [dispatch])

  const handleSubredditClick = (subreddit) => {
    if (!subreddit) {
      dispatch(setCurrentSubreddit(null))
      setSubredditDropdownToggle(!subredditDropdownToggle)
      return
    }
    dispatch(setCurrentSubreddit(subreddit.name))
    setSubredditDropdownToggle(!subredditDropdownToggle)
  }

  return (
    <div
      className={`  ${
        subredditDropdownToggle
          ? "subreddit-dropdown open"
          : "subreddit-dropdown closed"
      }`}
    >
      <div className="dropdown-home-link-parent">
        <Link onClick={() => handleSubredditClick(null)} to={"/"}>
          Home
        </Link>
      </div>
      <div className="subreddits-list">
        {subreddits.map((subreddit, key) => (
          <Link
            onClick={() => handleSubredditClick(subreddit)}
            to={`/r/${subreddit.name}`}
            key={key}
          >
            {subreddit.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

SubredditDropdown.propTypes = {
  setSubredditDropdownToggle: PropTypes.func,
  subredditDropdownToggle: PropTypes.bool,
}

export default SubredditDropdown

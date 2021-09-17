import React from 'react'
import PropTypes from "prop-types"
import { Link, useHistory } from "react-router-dom";
import "./SidebarSubredditLink.scss"


const SidebarSubredditLink = ({ subreddit }) => {

  const history = useHistory()

  return (
    <Link
      className={`subreddit-link ${history.location.pathname.replace("/r/", "") === subreddit.name ? 'current' : ''}`}
      to={`/r/${subreddit.name}`}
    >
      r/{subreddit.name}
    </Link>
  )
}

SidebarSubredditLink.propTypes = {
  subreddit: PropTypes.object
}

export default SidebarSubredditLink

import "./Sidebar.scss"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSubreddits } from "../../actions/subredditsActions"
import { Link, useHistory } from "react-router-dom"
import SidebarSubredditLink from "../SidebarSubredditLink/SidebarSubredditLink"

const Sidebar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const subreddits = useSelector((state) => state.subreddits)
  const darkMode = useSelector((state) => state.darkMode)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(getSubreddits())
  }, [dispatch])

  return (
    <aside className={`sidebar ${darkMode ? "dark" : ""}`}>
      {!user && (
        <p className="no-user-error">
          {" "}
          <Link to="/login">Sign in</Link> or{" "}
          <Link to="/register">register</Link> to create new content
        </p>
      )}
      <div className="sidebar-buttons">
        <div className="post-and-link-buttons">
          <Link
            to={`${user ? "/new-post?type=text" : "#"}`}
            className={`new-post-sidebar ${!user ? "disabled" : ""}`}
          >
            New Post
          </Link>
          <Link
            to={`${user ? "/new-post?type=link" : "#"}`}
            className={`new-link-sidebar ${!user ? "disabled" : ""}`}
          >
            New Link
          </Link>
        </div>
        <Link
          to={`${user ? "/subreddits/create" : "#"}`}
          className={`create-subreddit ${!user ? "disabled" : ""}`}
        >
          Create Subreddit
        </Link>
      </div>
      {subreddits.length > 0 && (
        <div className="subreddit-lists">
          <h3 className="subreddit-list-label-main">Subreddits</h3>
          <Link
            className={`subreddit-link ${
              history.location.pathname === "/" ? "current" : ""
            }`}
            to="/"
          >
            Home
          </Link>
          <h3 className="subreddit-list-label">General</h3>
          {subreddits
            .filter((subreddit) => subreddit.user_id === 1)
            .map((subreddit, key) => (
              <SidebarSubredditLink subreddit={subreddit} key={key} />
            ))}

          <h3 className="subreddit-list-label">User Created</h3>
          {subreddits
            .filter((subreddit) => subreddit.user_id !== 1)
            .map((subreddit, key) => (
              <SidebarSubredditLink subreddit={subreddit} key={key} />
            ))}
        </div>
      )}
    </aside>
  )
}

export default Sidebar

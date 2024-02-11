import "./Sidebar.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubreddits } from "../../../redux/actions/subredditsActions";
import { Link, useHistory } from "react-router-dom";
import SidebarSubredditLink from "../SidebarSubredditLink/SidebarSubredditLink";

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  return (
    <aside className={`sidebar  `}>
      {!user && (
        <p className="no-user-error">
          {" "}
          <Link to="/login">Sign in</Link> or <Link to="/register">register</Link> to
          create new content
        </p>
      )}
      {user && <div className="sidebar-buttons">
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
      </div>}
      {subreddits.length > 0 && (
        <div className="subreddit-lists">
          <div className='subreddit-list'>
            <h3 className="subreddit-list-label-main">Subreddits</h3>
            <Link
              className={`subreddit-link ${
                history.location.pathname === "/" ? "current" : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </div>
          <div className="subreddit-list">
            <h3 className="subreddit-list-label">General</h3>
            {subreddits
              .filter((subreddit) => subreddit.user_id === 1)
              .map((subreddit, key) => (
                <SidebarSubredditLink subreddit={subreddit} key={key} />
              ))}
          </div>
          <div className="subreddit-list">
            <h3 className="subreddit-list-label">User Created</h3>
            {subreddits
              .filter((subreddit) => subreddit.user_id !== 1)
              .map((subreddit, key) => (
                <SidebarSubredditLink subreddit={subreddit} key={key} />
              ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

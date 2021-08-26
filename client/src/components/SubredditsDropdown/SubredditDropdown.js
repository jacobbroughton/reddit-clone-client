import "./SubredditDropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { getSubreddits } from "../../actions/subredditsActions";
import { setCurrentSubreddit } from "../../actions/subredditActions"

const SubredditDropdown = ({ setSubredditDropdownToggle, subredditDropdownToggle }) => {

  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits);
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (subreddit) => {
    if(!subreddit) {
      dispatch(setCurrentSubreddit(null))
      setSubredditDropdownToggle(!subredditDropdownToggle)
      return 
    }
    dispatch(setCurrentSubreddit(subreddit.name))
    setSubredditDropdownToggle(!subredditDropdownToggle)
  }


  return (
    <div     
      className={`${darkMode ? 'dark' : ''} ${subredditDropdownToggle ? 'subreddit-dropdown open' : 'subreddit-dropdown closed'}`}>
      <div className="dropdown-home-link-parent">
        <Link onClick={() => handleSubredditClick(null)} to={"/"}>Home</Link>
      </div>
      <div className="subreddits-list">
        {subreddits.map((subreddit, key) => (
          <Link onClick={() => handleSubredditClick(subreddit)} to={`/r/${subreddit.name}`} key={key}>{subreddit.name}</Link>
        ))}
      </div>
    </div>
  );
};

SubredditDropdown.propTypes = {
  setSubredditDropdownToggle: PropTypes.func,
  subredditDropdownToggle: PropTypes.bool
}

export default SubredditDropdown;

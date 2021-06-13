import "./SubredditDropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getSubreddits } from "../../actions/subredditsActions";
import { setCurrentSubreddit } from "../../actions/subredditActions"

const SubredditDropdown = ({ setSubredditDropdownToggle, subredditDropdownToggle }) => {

  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(getSubreddits());
  }, []);

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
    <div className={subredditDropdownToggle ? 'subreddit-dropdown open' : 'subreddit-dropdown closed'}>
      <div className="dropdown-home-link-parent">
        <Link onClick={() => handleSubredditClick(null)} to={"/"}>Home</Link>
      </div>
      <div className="subreddits-list">
        {subreddits.map((subreddit, key) => (
          // <Link onClick={() => handleSubredditClick(subreddit)} to={`/r/${subreddit.name.replace(/\s+/g, '-').toLowerCase()}`} key={key}>{subreddit.name}</Link>
          <Link onClick={() => handleSubredditClick(subreddit)} to={`/r/${subreddit.name}`} key={key}>{subreddit.name}</Link>
        ))}
      </div>
    </div>
  );
};

export default SubredditDropdown;

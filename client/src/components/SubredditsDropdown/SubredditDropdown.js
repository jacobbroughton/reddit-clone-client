import "./SubredditDropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getSubreddits } from "../../reducers/subredditsReducer";

const SubredditDropdown = ({ subredditDropdownToggle, setCurrentSubreddit }) => {

  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode)
  const subreddits = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(getSubreddits());
  }, []);

  return (
    <div className={subredditDropdownToggle ? 'subreddit-dropdown open' : 'subreddit-dropdown closed'}>
      <div className="dropdown-home-link-parent">
        <Link onClick={() => setCurrentSubreddit(null)} to={"/"}>Home</Link>
      </div>
      <div className="subreddits-list">
        {subreddits.map((subreddit, key) => (
          <Link onClick={() => setCurrentSubreddit(subreddit)} to={`/r/${subreddit.name.replace(/\s+/g, '-').toLowerCase()}`} key={key}>{subreddit.name}</Link>
        ))}
      </div>
    </div>
  );
};

export default SubredditDropdown;

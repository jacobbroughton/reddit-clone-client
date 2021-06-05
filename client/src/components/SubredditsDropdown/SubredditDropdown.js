import "./SubredditDropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getSubreddits } from "../../reducers/subredditsReducer";

const SubredditDropdown = ({ subredditDropdownToggle, setCurrentSubreddit }) => {

  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(getSubreddits());
  }, []);

  return (
    <div className={subredditDropdownToggle ? 'subreddit-dropdown open' : 'subreddit-dropdown closed'}>
      <div className="dropdown-home-link-parent">
        <Link onClick={() => setCurrentSubreddit("Home")} to={"/"}>Home</Link>
      </div>
      <div className="subreddits-list">
        {subreddits.map((subreddit, key) => (
          <Link onClick={() => setCurrentSubreddit(subreddit.name)} to={`/r/${subreddit.name}`} key={key}>{subreddit.name}</Link>
        ))}
      </div>
    </div>
  );
};

export default SubredditDropdown;

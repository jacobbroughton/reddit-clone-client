import "./SubredditDropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getSubreddits } from "../../reducers/subredditsReducer";

const SubredditDropdown = () => {
  const dispatch = useDispatch();

  const subreddits = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(getSubreddits());
  }, []);

  return (
    <div className="subreddit-dropdown">
      <div className="dropdown-home-link-parent">
        <Link to={"/"}>Home</Link>
      </div>
      <div className="subreddits-list">
        {subreddits.map((subreddit, key) => (
          <Link to={`/`} key={key}>{subreddit.name}</Link>
        ))}
      </div>
    </div>
  );
};

export default SubredditDropdown;

import "./Sidebar.scss"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSubreddits } from "../../actions/subredditsActions";
import { Link, useLocation } from "react-router-dom"
import { useQuery } from "../useQuery"

const Sidebar = () => {

  const dispatch = useDispatch()
  // const location = useLocation()
  const subreddits = useSelector(state => state.subreddits)
  const darkMode = useSelector(state => state.darkMode)

  const [searchQueryFromURL, setSearchQueryFromURL] = useState('')


  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  // const query = useQuery();

  // useEffect(() => {
  //   let searchQueryFromURL = query.get("q");
  //   setSearchQueryFromURL(searchQueryFromURL);
  // }, [location]);

  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar-buttons">
        <div className="post-and-link-buttons">
          <Link to={"/new-post?type=text"} className="new-post-sidebar">New Post</Link>
          <Link to={"/new-post?type=link"} className="new-link-sidebar">New Link</Link>
        </div>
        <Link to={"/subreddits/create"} className="create-subreddit">Create Subreddit</Link>
      </div>
      <div className="subreddit-list"> 
      <p className="subreddit-list-label">Subreddits</p>
      <Link className="subreddit-link" to="/">Home</Link>
        {subreddits.map(subreddit => 
          <Link className="subreddit-link" to={`/r/${subreddit.name}${searchQueryFromURL ? `?q=${searchQueryFromURL}` : ''}`}>r/{subreddit.name}</Link>  
        )}
      </div>
    </aside>
  )
}

export default Sidebar
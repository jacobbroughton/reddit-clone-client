import "./Sidebar.scss"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSubreddits } from "../../actions/subredditsActions";
import { Link } from "react-router-dom"
// import ProfilePicture from "../ProfilePicture/ProfilePicture"

const Sidebar = () => {

  const dispatch = useDispatch()
  const subreddits = useSelector(state => state.subreddits)
  const darkMode = useSelector(state => state.darkMode)
  const user = useSelector(state => state.auth.user)

  // const [noUserError, setNoUserError] = useState(null)

  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  // const handleNoUserError = (text) => {
  //   setNoUserError(`${text}`)
  //   clearTimeout()
  //   setTimeout(() => {
  //     setNoUserError(null)
  //   }, 3000)
  // }

  return (
    <aside className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <p className="no-user-error"> <Link to="/login">Sign in</Link> or <Link to="/register">register</Link> to create new content</p>
      <div className="sidebar-buttons">
        {/* <img className="profile" src={user?.profile_picture}/> */}
        {/* <ProfilePicture size="large" source={user.profile_picture}/> */}
        <div className="post-and-link-buttons">
          <Link to={`${user ? '/new-post?type=text' : '#'}`} className={`new-post-sidebar ${!user ? 'disabled' : ''}`}>New Post</Link>
          <Link to={`${user ? '/new-post?type=link' : '#'}`} className={`new-link-sidebar ${!user ? 'disabled' : ''}`}>New Link</Link>
        </div>
        <Link to={`${user ? '/subreddits/create' : '#'}`} className={`create-subreddit ${!user ? 'disabled' : ''}`}>Create Subreddit</Link>
      </div>
      <div className="subreddit-list"> 
      <p className="subreddit-list-label">Subreddits</p>
      <Link className="subreddit-link" to="/">Home</Link>
        {subreddits.map((subreddit, key) => 
          <Link className="subreddit-link" to={`/r/${subreddit.name}`} key={key}>r/{subreddit.name}</Link>  
        )}
      </div>
    </aside>
  )
}

export default Sidebar
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import { startLogout } from "../../actions/authActions"
import { toggleDarkMode } from "../../reducers/darkModeReducer"
import { setCurrentSubreddit } from "../../actions/subredditActions"
import { ReactComponent as DarkModeIcon } from "../../images/dark-mode-icon.svg"
import { formatISO9075 } from "date-fns"
import SubredditDropdown from "../SubredditsDropdown/SubredditDropdown"
import "./Navbar.scss";

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const darkMode = useSelector(state => state.darkMode)
  // const currentSubreddit = useSelector(state => state.currentSubreddit)

  const location = useLocation()
  const subredditName = location.pathname.match(/r\/[^\/]+/)


  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [subredditDropdownToggle, setSubredditDropdownToggle] = useState(false)

  useEffect(() => {
    let dateNow = formatISO9075(new Date())
    console.log('NAVBAR DATE NOW -->', dateNow)
  }, [])


  return (
    <nav className={`${darkMode && 'dark'}`}>
      <div className={`nav-container`}>
        <div className={`home-link-parent`} >
          <Link className={`nav-home-link`} to="/"><span className="not-span" onClick={() => dispatch(setCurrentSubreddit(null))} >(Not)</span> Reddit</Link>
          <button className={`subreddit-dropdown-toggle-button`} onClick={() => setSubredditDropdownToggle(!subredditDropdownToggle)}>{subredditName ? subredditName : "Home"}</button>
          { user && <Link className={`new-post-link`} to="/new-post">New Post</Link> }
          <SubredditDropdown 
            subredditDropdownToggle={subredditDropdownToggle} 
            setSubredditDropdownToggle={setSubredditDropdownToggle}
          />
          <div className={`dark-mode-icon-parent`}  >
            <DarkModeIcon className={`dark-mode-icon`}  onClick={() => dispatch(toggleDarkMode())}/>
          </div>
        </div>
        
        
        <div className="nav-menu">
          {
            user ? 
            <div className="logged-in-nav-view">
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="nav-username-button">{user.username}</button>
              <div className={`${isUserDropdownOpen ? 'user-dropdown open' : 'user-dropdown closed' }`}>
                <Link onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} to="/subreddits/create">Create Subreddit</Link>
                <button  className="logout-button" onClick={() => {
                  dispatch(startLogout(user))
                  setIsUserDropdownOpen(!isUserDropdownOpen)
                }}>Logout</button>
              </div>
            </div>
            :
            <div className="logged-out-nav-view">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          }
        </div>
      </div>
    </nav>
  )
};

export default Navbar;

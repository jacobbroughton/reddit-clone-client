import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../actions/authActions"
import { toggleDarkMode } from "../../reducers/darkModeReducer"
import { setCurrentSubreddit } from "../../actions/subredditActions"
// import { ReactComponent as DarkModeIcon } from "../../images/dark-mode-icon.svg"
import { ReactComponent as DownArrow } from "../../images/down-arrow.svg"
import ProfilePicture from "../ProfilePicture/ProfilePicture"
import Search from "../Search/Search"
import useBrowserResize from "../../utilities/useBrowserResize"
import HomeDark from "../../images/home-dark.png"
import HomeLight from "../../images/home-light.png"

import "./Navbar.scss";

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const darkMode = useSelector(state => state.darkMode)

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [overlayToggle, setOverlayToggle] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  const { width } = useBrowserResize()

  const handleDropdownClick = () => {
    setOverlayToggle(!overlayToggle)
    setIsUserDropdownOpen(!isUserDropdownOpen)
  }

  return (
    <nav className={`nav ${darkMode ? 'dark' : ''}`}>
      <div className={`nav-container`}>
        <div className={`home-search-darkicon`} >
          <Link className={`nav-home-link`} to="/"><span onClick={() => {
              dispatch(setCurrentSubreddit(null))
            }} >{width >= 767 ? 'Zeddit' : <img className="home-icon" src={darkMode ? HomeLight : HomeDark}/>}</span> </Link>
          <Search setSearchExpanded={setSearchExpanded} searchExpanded={searchExpanded}/>

          {!searchExpanded && 
            <button className={`dark-mode-icon-parent`}  onClick={() => dispatch(toggleDarkMode())}>
              {/* <DarkModeIcon className={`dark-mode-icon`}  onClick={() => dispatch(toggleDarkMode())}/> */}
              {darkMode ? '☀️' : '🌙'}
            </button>
          }
        </div>
        
        
        <div className="nav-menu">
          {
            user ? 
            <>
            {overlayToggle && <div onClick={() => handleDropdownClick()} className="overlay"></div> }
            <div className="logged-in-nav-view">
              <button onClick={() => {
                setOverlayToggle(!overlayToggle)
                setIsUserDropdownOpen(!isUserDropdownOpen)
              }} className="nav-username-button">
              <ProfilePicture size="small" source={user.profile_picture} />
              <span className="nav-username-span">{user.username} </span>
              <DownArrow className="down-arrow"/></button>
              <div className={`${isUserDropdownOpen ? 'user-dropdown open' : 'user-dropdown closed' }`}>
                <Link className="dropdown-link" onClick={() => handleDropdownClick()} to="/">Home</Link>
                <Link className="dropdown-link" onClick={() => handleDropdownClick()} to="/new-post?type=text">New Text Post</Link>
                <Link className="dropdown-link" onClick={() => handleDropdownClick()} to="/new-post?type=link">New Link Post</Link>
                <Link className="dropdown-link" onClick={() => handleDropdownClick()} to="/subreddits/create">Create Subreddit</Link>
                <button  className="logout-button" onClick={() => {
                  dispatch(startLogout(user))
                  handleDropdownClick()
                }}>Logout</button>
              </div>
            </div>
            </>
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

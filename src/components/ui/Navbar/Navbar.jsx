import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { startLogout } from "../../../redux/actions/authActions"
import { toggleTheme } from "../../../redux/reducers/themeReducer"
import { setCurrentSubreddit } from "../../../redux/actions/subredditActions"
// import { ReactComponent as DarkModeIcon } from "../../../images/dark-mode-icon.svg"
import { ReactComponent as DownArrow } from "../../../images/down-arrow.svg"
import ProfilePicture from "../ProfilePicture/ProfilePicture"
import Search from "../Search/Search"
import useBrowserResize from "../../../utils/useBrowserResize"
import HomeDark from "../../../images/home-dark.png"
import HomeLight from "../../../images/home-light.png"
import { motion } from "framer-motion"

import "./Navbar.scss"

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const theme = useSelector(state => state.theme)

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [overlayToggle, setOverlayToggle] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  const { width } = useBrowserResize()


  const handleDropdownClick = () => {
    setOverlayToggle(!overlayToggle)
    setIsUserDropdownOpen(!isUserDropdownOpen)
  }


  return (
    <nav className={`nav`}>
      <div className={`nav-container`}>
        <div className={`home-search-darkicon`}>
          {!searchExpanded && (
            <Link
              className={`nav-home-link`}
              onClick={() => dispatch(setCurrentSubreddit(null))}
              to="/"
            >
              {width >= 767 ? (
                "Zeddit"
              ) : (
                <img
                  className="home-icon"
                  src={theme ? HomeLight : HomeDark}
                />
              )}
            </Link>
          )}
          <Search
            setSearchExpanded={setSearchExpanded}
            searchExpanded={searchExpanded}
          />

          {!searchExpanded && (
            <motion.button
              className={`dark-mode-icon-parent`}
              onClick={() => dispatch(toggleTheme())}
              whileTap={{ scale: 1.25 }}
            >
              {theme ? "🌙" : "☀️"}
            </motion.button>
          )}
        </div>

        <div className="nav-menu"> 
          {user ? (
            <>
              {overlayToggle && (
                <div
                  onClick={() => handleDropdownClick()}
                  className="overlay"
                ></div>
              )}
              <div className="logged-in-nav-view">
                <button
                  onClick={() => {
                    setOverlayToggle(!overlayToggle)
                    setIsUserDropdownOpen(!isUserDropdownOpen)
                  }}
                  className="nav-username-button"
                >
                  <ProfilePicture size="small" source={user.profile_picture} />
                  <span className="nav-username-span">{user.username} </span>
                  <DownArrow className="down-arrow" />
                </button>
                <div
                  className={`${
                    isUserDropdownOpen
                      ? "user-dropdown open"
                      : "user-dropdown closed"
                  }`}
                >
                  <Link
                    className="dropdown-link"
                    onClick={() => handleDropdownClick()}
                    to="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="dropdown-link"
                    onClick={() => handleDropdownClick()}
                    to="/new-post?type=text"
                  >
                    New Text Post
                  </Link>
                  <Link
                    className="dropdown-link"
                    onClick={() => handleDropdownClick()}
                    to="/new-post?type=link"
                  >
                    New Link Post
                  </Link>
                  <Link
                    className="dropdown-link"
                    onClick={() => handleDropdownClick()}
                    to="/subreddits/create"
                  >
                    Create Subreddit
                  </Link>
                  <button
                    className="logout-button"
                    onClick={() => {
                      dispatch(startLogout(user))
                      handleDropdownClick()
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="logged-out-nav-view">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

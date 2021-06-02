import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../reducers/userReducer"
import "./Navbar.scss";

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)


  return (
    <nav>
      <div className="nav-container">
        <div className="home-link-parent">
          <Link className="nav-home-link" to="/subreddits/create"><span className="not-span">(Not)</span> Reddit</Link>
        </div>
        
        <div className="nav-menu">
          {
            user ? 
            <div className="logged-in-nav-view">
              <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="nav-username-button">{user.username}</button>
              <div className={`${isUserDropdownOpen ? 'user-dropdown open' : 'user-dropdown closed' }`}>
                <Link to="/">Create Subreddit</Link>
                <button className="logout-button"onClick={() => dispatch(startLogout(user))}>Logout</button>
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

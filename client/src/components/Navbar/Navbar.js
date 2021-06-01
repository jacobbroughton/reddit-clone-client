import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../reducers/userReducer"
import "./Navbar.scss";

const Navbar = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <div className="nav-container">
        <div className="home-link-parent">
          <Link className="nav-home-link" to="/"><span className="not-span">(Not)</span> Reddit</Link>
        </div>
        
        <div className="nav-menu">
          {
            user ? 
            <>
              <p className="nav-username">{user.username}</p>
              <button onClick={() => dispatch(startLogout(user))}>Logout</button>
            </>
            :
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          }

        </div>
      </div>
    </nav>
  )
};

export default Navbar;

import React, { useEffect } from "react"
import { Switch, Route, useLocation, useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSubreddit } from "./actions/subredditActions";
// import { HelmetProvider } from "react-helmet-async"
import PropTypes from "prop-types"
import ScrollToTop from './components/ScrollToTop'
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PostList from "./components/PostList/PostList";
import NewPost from "./components/NewPost/NewPost";
import SinglePostPage from "./components/SinglePostPage/SinglePostPage";
import CreateSubreddit from "./components/CreateSubreddit/CreateSubreddit";
import Sidebar from "./components/Sidebar/Sidebar";
// import Meta from "./components/Meta"
import "./App.scss"

function App() {

  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode);
  // const currentSubreddit = useSelector((state) => state.currentSubreddit);

  const { name } = useParams()

  const location = useLocation()

  useEffect(() => {
    if(name) {
      dispatch(setCurrentSubreddit(name))
    }
  }, [name])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else if (!darkMode) {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  

  const sidebarExcludedRoutes = [
    '/login',
    '/register'
  ]

  return (
    // <HelmetProvider>
      <div className={`App ${darkMode ? "dark" : ""}`}>
        {/* <Meta title={currentSubreddit ? `r/${currentSubreddit.name}` : 'Home'}/> */}
        <ScrollToTop>
          <Navbar />
          <main>
            <Switch>
              
              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <ProtectedRoute path="/subreddits/create">
                <CreateSubreddit />
              </ProtectedRoute>

              <ProtectedRoute path="/new-post">
                <NewPost />
              </ProtectedRoute>

              {/* <Route path="/r/:name/search">
                <SearchPage />
              </Route> */}

              <Route path="/r/:name/:postId">
                <SinglePostPage />
              </Route>

              <Route path="/r/:name">
                <PostList />
              </Route>

              {/* <Route path="/search">
                <SearchPage />
              </Route> */}

              <Route path="/">
                <PostList />
              </Route>

            </Switch>
            {sidebarExcludedRoutes.indexOf(location.pathname) < 0 && <Sidebar/>}
          </main>
          <Footer/>
        </ScrollToTop>
      </div>
    // </HelmetProvider>
    
  );
}

function ProtectedRoute ({ children, ...rest }) {
  let user = useSelector(state => state.auth.user)
  return (
    <Route
      {...rest}
      render={({ location }) => 
        user ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

ProtectedRoute.propTypes = {
  children: PropTypes.object
}

export default App;

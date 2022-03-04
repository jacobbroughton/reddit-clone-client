import React, { useEffect } from "react"
import { Switch, Route, useLocation, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
// import { setCurrentSubreddit } from "./actions/subredditActions";
import PropTypes from "prop-types"
import ScrollToTop from "./utilities/ScrollToTop"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import PostList from "./components/PostList/PostList"
import NewPost from "./components/NewPost/NewPost"
import SinglePostPage from "./components/SinglePostPage/SinglePostPage"
import CreateSubreddit from "./components/CreateSubreddit/CreateSubreddit"
import Sidebar from "./components/Sidebar/Sidebar"
import Meta from "./components/Meta"
import "./App.scss"
import { useQuery } from "./utilities/useQuery"
import ErrorPopupList from "./components/ErrorPopupList/ErrorPopupList"
import { useTheme } from "./utilities/useTheme"

function App() {
  const searchQuery = useQuery()

  
  const currentSubreddit = useSelector((state) => state.currentSubreddit)

  const location = useLocation()
  const [theme] = useTheme()

  const sidebarExcludedRoutes = ["/login", "/register"]

  useEffect(() => {
    // function getUserPreferance() {
    //   if(window.localStorage.getItem('theme')) {
    //     return window.localStorage.getItem('theme')
    //   }
    //   return window.matchMedia('(prefers-color-scheme: dark').matches
    //     ? 'dark'
    //     : 'light'
    // }

    // TODO: Fix the dark mode flashing on refresh
    document.body.dataset.theme = theme
    console.log(theme)
  },[theme])

  return (
    <div className={`App`}>
      <Meta title={currentSubreddit ? `r/${currentSubreddit.name}` : "Home"} />
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
              {searchQuery ? (
                <Redirect
                  to={
                    currentSubreddit
                      ? `/r/${currentSubreddit.name}?q=${searchQuery}`
                      : `/q=${searchQuery}`
                  }
                />
              ) : (
                <CreateSubreddit />
              )}
            </ProtectedRoute>

            <ProtectedRoute path="/new-post">
              {searchQuery ? (
                <Redirect
                  to={
                    currentSubreddit
                      ? `/r/${currentSubreddit.name}?q=${searchQuery}`
                      : `/q=${searchQuery}`
                  }
                />
              ) : (
                <NewPost />
              )}
            </ProtectedRoute>

            <Route path="/r/:name/:postId">
              <SinglePostPage />
            </Route>

            <Route path="/r/:name">
              <PostList />
            </Route>

            <Route path="/">
              <PostList />
            </Route>
          </Switch>
          {sidebarExcludedRoutes.indexOf(location.pathname) < 0 && <Sidebar />}
        </main>
        <ErrorPopupList />
        <Footer />
      </ScrollToTop>
    </div>
  )
}

function ProtectedRoute({ children, ...rest }) {
  console.log(rest)
  let user = useSelector((state) => state.auth.user)
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
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
}

export default App

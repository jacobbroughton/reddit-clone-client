import React, { useEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setCurrentSubreddit } from "./actions/subredditActions";
import PropTypes from "prop-types";
import ScrollToTop from "./utils/ScrollToTop";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Navbar from "./components/ui/Navbar/Navbar";
import Footer from "./components/ui/Footer/Footer";
import PostList from "./components/ui/PostList/PostList";
import NewPost from "./components/pages/NewPost/NewPost";
import SinglePostPage from "./components/pages/SinglePostPage/SinglePostPage";
import CreateSubreddit from "./components/pages/CreateSubreddit/CreateSubreddit";
import WrongBrowser from "./components/pages/WrongBrowser/WrongBrowser";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import Meta from "./components/ui/Meta";
import { useQuery } from "./utils/useQuery";
import ErrorPopupList from "./components/ui/ErrorPopupList/ErrorPopupList";
import "./App.scss";

function App() {
  const searchQuery = useQuery();

  const currentSubreddit = useSelector((state) => state.currentSubreddit);
  const theme = useSelector((state) => state.theme);

  const location = useLocation();

  const sidebarExcludedRoutes = ["/login", "/register"];

  useEffect(() => {
    document.body.dataset.theme = theme ? "dark" : "light";
  }, [theme]);

  return (
    <div className={`App`}>
      <Meta title={currentSubreddit ? `r/${currentSubreddit.name}` : "Home"} />
      {/* <div className="full-page-disabling-banner">
        <p>
          This app's server is currently being migrated from Heroku to Render. If you'd
          like to see how this app functions normally, check out a screen recording I
          posted on my LinkedIn (
          <a href="https://www.linkedin.com/feed/update/urn:li:activity:6853326116300562433/">
            Link
          </a>
          ). <br/> <br/> I've also got a page on my personal website regarding this app / project if
          you'd like to learn a little bit more about it. (
          <a href="https://www.jlbroughton.com/portfolio/reddit-clone">Link</a>)
        </p>
      </div> */}
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
  );
}

function ProtectedRoute({ children, ...rest }) {
  console.log(rest);
  let user = useSelector((state) => state.auth.user);
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
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default App;

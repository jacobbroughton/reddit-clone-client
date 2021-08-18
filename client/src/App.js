import { Switch, Route, useLocation } from "react-router-dom";
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
import SearchPage from "./components/SearchPage/SearchPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { formatDistanceStrict } from "date-fns"
import "./App.scss"

function App() {
  const darkMode = useSelector((state) => state.darkMode);

  const location = useLocation()

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
    <div className={`App ${darkMode ? "dark" : ""}`}>
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
            <Route path="/subreddits/create">
              <CreateSubreddit />
            </Route>
            <Route path="/new-post">
              <NewPost />
            </Route>
            {/* <Route path="/r/:name/search">
              <SearchPage />
            </Route> */}
            <Route path="/r/:name/:postId">
              <SinglePostPage />
            </Route>
            <Route path="/r/:name">
              <PostList />
            </Route>
            <Route exact path="/">
              <PostList />
            </Route>
          </Switch>
          {sidebarExcludedRoutes.indexOf(location.pathname) < 0 && <Sidebar/>}
        </main>
        <Footer/>
      </ScrollToTop>
      
    </div>
  );
}

export default App;

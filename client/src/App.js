import { Switch, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PostList from "./components/PostList/PostList";
import NewPost from "./components/NewPost/NewPost";
import SinglePostPage from "./components/SinglePostPage/SinglePostPage";
import CreateSubreddit from "./components/CreateSubreddit/CreateSubreddit";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { formatDistanceStrict } from "date-fns"

function App() {
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else if (!darkMode) {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);


  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Navbar />
      <main>
        <Sidebar/>
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
      </main>
      <Footer/>
    </div>
  );
}

export default App;

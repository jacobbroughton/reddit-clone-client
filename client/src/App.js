import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import PostList from "./components/PostList/PostList";
import NewPost from "./components/NewPost/NewPost";
import CreateSubreddit from "./components/CreateSubreddit/CreateSubreddit"
import store from "./store/store"
import { Provider, useSelector } from "react-redux"


function App() {

  // const user = useSelector(state => state)

  return (
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/subreddits/create">
              <CreateSubreddit/>
            </Route>
            <Route path="/r/:name">
              <PostList/>
            </Route>
                        <Route path="/new-post">
              <NewPost/>
            </Route>
            <Route path="/">
              <PostList/>
            </Route>

          </Switch>
        </div>
      </Router>
  );
}

export default App;

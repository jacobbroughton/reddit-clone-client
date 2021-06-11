import {
  Switch,
  Route
} from "react-router-dom";
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Navbar from "./components/Navbar/Navbar"
import PostList from "./components/PostList/PostList"
import NewPost from "./components/NewPost/NewPost"
import SinglePostPage from "./components/SinglePostPage/SinglePostPage"
import CreateSubreddit from "./components/CreateSubreddit/CreateSubreddit"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"



function App() {

  const darkMode = useSelector(state => state.darkMode)
  // const { name } = useParams()
  
  const [currentSubreddit, setCurrentSubreddit] = useState(null)

  useEffect(() => {
    if(darkMode) {
      document.body.classList.add("dark")
    } else if (!darkMode) {
      document.body.classList.remove("dark")
    }
  }, [darkMode]) 
  

  return (
      // <Router history={history}>
        <div className={`App ${darkMode && 'dark'}`}>
          <Navbar
            currentSubreddit={currentSubreddit}
            setCurrentSubreddit={setCurrentSubreddit}
          />
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
              <NewPost
                currentSubreddit={currentSubreddit}
              />
            </Route>     
            <Route path="/r/:name/:postId">
              <SinglePostPage/>
            </Route>       
            <Route path="/r/:name">
              <PostList currentSubreddit={currentSubreddit}/>
            </Route>
            <Route exact path="/">
              <PostList currentSubreddit={currentSubreddit}/>
            </Route>

          </Switch>
        </div>
      // </Router>
  );
}

export default App;

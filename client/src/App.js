import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import CreateSubreddit from "./components/CreateSubreddit/CreateSubreddit"
import store from "./store/store"
import { Provider, useSelector } from "react-redux"


function App() {

  const user = useSelector(state => state)

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
          </Switch>
        </div>
      </Router>
  );
}

export default App;

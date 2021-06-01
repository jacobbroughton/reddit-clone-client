import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar/Navbar";
import store from "./store/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

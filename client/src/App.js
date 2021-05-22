import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./components/auth/Register";
import { store } from "./store/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

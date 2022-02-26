import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import history from "./utilities/history"
import "./index.css"
import App from "./App"
import store from "./store/store"
import { Provider } from "react-redux"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

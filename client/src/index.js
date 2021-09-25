import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom"
import history from "./utilities/history"
import './index.css';
import App from './App';
import store from "./store/store"
import { Provider } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store/store"
import { Provider, useSelector } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

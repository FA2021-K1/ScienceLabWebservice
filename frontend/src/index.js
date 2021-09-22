import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Grid from "@material-ui/core/Grid";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

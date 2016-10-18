import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import LoginPage from './containers/Login/LoginPage';
//import SignupPage from './containers/Signup/SignupPage';
import configureStore from './store/configureStore';
import {Router ,hashHistory } from 'react-router';
import routes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

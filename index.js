import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import LoginPage from './containers/Login/LoginPage';
//import SignupPage from './containers/Signup/SignupPage';
//import configureStore from './store/configureStore';
import App from './containers/App';
import { Router ,browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import thunk from 'redux-thunk';
import configureStore from './store/configureStore';
import { createStore,applyMiddleware } from 'redux';
import selectLocationState from './selectors';
//const store = configureStore();
/*const store = createStore(
	(state =  {} )=> state,
	applyMiddleware(thunk)
	)*/
const initialState = {}
import { config } from 'react-loopback';
config.set('baseUrl', 'http://172.31.98.51:8080/api/');
const store = configureStore(initialState,browserHistory)

const history = syncHistoryWithStore(browserHistory,store,{
	selectLocationState: selectLocationState(),
})
const rootRoute = {
	component:App,
	childRoutes: createRoutes(store)
};
ReactDOM.render(
  <Provider store={store}>
  <Router history={history} routes={rootRoute} />
  </Provider>,
  document.getElementById('root')
);

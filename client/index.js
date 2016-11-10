import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { Router ,hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import thunk from 'redux-thunk';
import configureStore from './store/configureStore';
import { createStore,applyMiddleware } from 'redux';
import selectLocationState from './selectors';
import { config } from 'react-loopback';
import { Base_Url } from './constants/index';
//const store = configureStore();
/*const store = createStore(
	(state =  {} )=> state,
	applyMiddleware(thunk)
	)*/
config.set('baseUrl', Base_Url);
const initialState = {}

const store = configureStore(initialState,hashHistory)

/*hashHistory.listen(){
	console.log('app is busy');
}*/
const history = syncHistoryWithStore(hashHistory,store,{
	selectLocationState: selectLocationState(),
})
const rootRoute = {
	component:App,
	childRoutes: createRoutes(store)
}

ReactDOM.render(
  <Provider store={store}>
  		<Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={rootRoute} />
  </Provider>,
  document.getElementById('root')
);


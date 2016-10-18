import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createReducer from '../reducers';

export default function configureStore(initialState = {}, history) {
  	const middleware = [
  	routerMiddleware(history)];
  	
  	const enhancers = [
  	applyMiddleware(middleware)];

  	const store = createStore(
  		createReducer(),
  		fromJS(initialState),
  		);

  	if (module.hot) {
    	// Enable Webpack hot module replacement for reducers
    	module.hot.accept('../reducers', () => {
      		const nextRootReducer = require('../reducers');
      		store.replaceReducer(nextRootReducer);
    	});
  	}
  	return store;
}
import { GET_STARTED } from '../actions';
import { WELCOME_TEXT } from '../constants';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

/*function rootReducer (state = {}, action) {
	switch(action.type) {
		case GET_STARTED:
			return { welcomeText: WELCOME_TEXT };
		default:
			return state;
	}
}*/
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});


function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
      case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}
export default function createReducer(){
	return combineReducers({
		route: routeReducer
	})
}

/*
 * Redux suggests use multiple reducers instead of creating multiple stores, 
 * if more than one reducer is needed, use combineReducer from 'redux' module.
 * 
 * import { composeReducers } from 'redux'
 * 
 * export default combineReducers({
 *     rootReducer
 * 	   subReducer
 * });
 * 
 */
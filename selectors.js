import { createSelector	} from 'reselect';

export default function selectLocationState(){
	let prevRoutingState;
	let prevRoutingStateJS;
	return (state) => {
		const routingState = state.get('route');

	if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
	}
}
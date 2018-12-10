import * as React from 'react';
import Constants from '../common/constants';

//export default React.createContext(Constants.State.DEFAULT_SESSION_STATE);
export const initialState = {
	currentSession: {
		name: 'Default',
		times: [{
			value: 1222113,
			scramble: 'R'
		}],
		stats: []
	},
	savedSessions: {
	}
};


export default (state = initialState, action) => {
	switch (action.type){
		default:
			return state;
	}
};
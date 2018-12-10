import * as SessionTypes from './session_types';

export const DEFAULT_SESSION_NAME = 'Default';

const computeMean = (times) => {
	if(times.length > 1)
	{
		let sum = times[0].value;
		for(let i = 1; i < times.length; ++i){
			sum += times[i].value;
		}

		const mean = (sum / times.length);
		return mean;
	}else{
		return 0;
	}
};

export const DEFAULT_SESSION_STAT_COMPUTE_FUNCS = {
	Mean: computeMean,
	StdDev: (times) => {
		return 1.1;
	}
};

export const DEFAULT_SESSION_STATE: SessionTypes.Session = {
	name: DEFAULT_SESSION_NAME,
	times: [],
	stats: [
		{name: 'Mean', value: 0},
		{name: 'StdDev', value: 0}
	]
};

export const DEFAULT_SAVED_SESSIONS_STATE: SessionTypes.Session[] = [
	DEFAULT_SESSION_STATE,
];

export const DEFAULT_SAVED_SESSIONS_ACTIONS: SessionTypes.SavedSessionsActions = {
};

export const DEFAULT_SAVED_SESSION_STATE_AND_ACTIONS = {
	savedSessions: DEFAULT_SAVED_SESSIONS_STATE,
	savedSessionsActions: DEFAULT_SAVED_SESSIONS_ACTIONS
};
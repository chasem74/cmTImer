import * as React from 'react';
import {
	View
} from 'react-native';

import TimerView from '../components/TimerView';
import Scramble from '../components/Scramble';

import {withCurrentAndSavedSessions} from '../context';

class TimerScreen extends React.Component{
	render(){
		return (
			<View style={{flex: 1, backgroundColor: 'black'}}>
				<Scramble style={{flex: 1}} scramble="R' L U" />
				<TimerView
				style={{flex: 3}}
				onTimerDone={(time, scramble) => {
					this.props.sessionActions.addTimeToSession({value: time, scramble}, this.props.currentSession);
				}}
				/>
			</View>
		);
	}
}

export default withCurrentAndSavedSessions(TimerScreen);
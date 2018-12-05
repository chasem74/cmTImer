import * as React from 'react';
import {
	View
} from 'react-native';

import TimerView from '../components/TimerView';
import Scramble from '../components/Scramble';

export default class TimerScreen extends React.Component{
	render(){
		return (
			<View style={{flex: 1}}>
				<Scramble style={{flex: 1}} scramble="R' L U" />
				<TimerView style={{flex: 3}}/>
			</View>
		);
	}
}
import * as React from 'react';

import {
	StatusBar,
	View
} from 'react-native';

import TimerView from '../components/TimerView';
import Scramble from '../components/Scramble';

import * as Constants from '../common/constants';

class TimerScreen extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			isTiming: false,
			isReady: false
		};
	}

	componentDidMount(){
		this.navListener = this.props.navigation.addListener('didFocus', () => {
			StatusBar.setBarStyle('dark-content');
		});
	}

	componentWillUnmount(){
		this.navListener.remove();
	}

	render(){
		return (
			<View style={{flex: 1}}>
				<Scramble
				style={{flex: 1}}
				scramble="R' L U"
				/>

				<TimerView style={{flex: 3}}/>
			</View>
		);
	}
}

export default TimerScreen;
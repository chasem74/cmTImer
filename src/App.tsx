import * as React from 'react';
import {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';

import TimerView from './components/TimerView';

export default class App extends React.Component {
	public render() {
		return (
			<View style={styles.container}>
				<TimerView />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
});

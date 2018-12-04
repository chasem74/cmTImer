import * as React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation';

import {createAppContainer} from '@react-navigation/native';

import {
	Entypo,
	FontAwesome,
	Feather,
} from '@expo/vector-icons';

import TimerScreen from './containers/TimerScreen';

const StatsNavigator = createStackNavigator({
	stats: TimerScreen,
	new_session: {
		screen: TimerScreen,
		navigationOptions: {
		}
	},
},{
	mode: 'modal',
	navigationOptions: {
	}
});

const MainNavigator = createBottomTabNavigator({
	timer: {
		screen: TimerScreen,
		navigationOptions: {
			title: 'Timer',
			tabBarIcon: ({tintColor}) => <Entypo size={25} name="stopwatch" color={tintColor}/>
		}
	},
	stats: {
		screen: StatsNavigator,
		navigationOptions: {
			title: 'Stats',
			tabBarIcon: ({tintColor}) => <FontAwesome size={25} name="bar-chart" color={tintColor}/>
		}
	},
	help: {
		screen: () => { return <View><Text>Hellppppp</Text></View>},
		navigationOptions: {
			title: 'Help',
			tabBarIcon: ({tintColor}) => <Feather size={25} name="help-circle" color={tintColor}/>
		}
	},
	more: {
		screen: TimerScreen,
		navigationOptions: {
			title: 'More',
			tabBarIcon: ({tintColor}) => <Feather size={25} name="more-horizontal" color={tintColor}/>
		}
	}
}, {
	tabBarOptions: {
		activeBackgroundColor: 'black',
		inactiveBackgroundColor: 'black',
	}
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
	public render() {
		return (
			<View style={styles.container}>
				<AppContainer style={{flex: 1}} />
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

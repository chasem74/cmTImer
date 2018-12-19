import * as React from 'react';
import * as Expo from 'expo';
import {
	StyleSheet,
	View,
	Text,
	StatusBar
} from 'react-native';

import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {createAppContainer} from '@react-navigation/native'

import {
	Entypo,
	FontAwesome,
	Feather
} from '@expo/vector-icons';

import TimerScreen from './containers/TimerScreen';
import StatsAndSessionScreen from './containers/StatsAndSessionScreen';
import NewSessionScreen from './containers/NewSessionScreen';

import CurrentSessionContext from './context/CurrentSessionContext';
import SavedSessionsContext from './context/SavedSessionsContext';
import * as SessionTypes from './common/session_types';
import Constants from './common/constants';

const StatsNavigator = createStackNavigator({
	stats: StatsAndSessionScreen,
	new_session: {
		screen: NewSessionScreen,
		navigationOptions: {
		}
	},
},{
	mode: 'modal',
	defaultNavigationOptions: {
		headerBackTitleVisisble: false,
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: 'black'
		}
	}
});

const MainNavigator = createMaterialBottomTabNavigator({
	timer: {
		screen: TimerScreen,
		navigationOptions: {
			title: 'Timer',
			tabBarIcon: ({tintColor}) => <Entypo size={25} name="stopwatch" color={tintColor}/>,
			tabBarColor: '#1a2'
		}
	},
	stats: {
		screen: StatsNavigator,
		navigationOptions: {
			title: 'Stats',
			tabBarIcon: ({tintColor}) => <FontAwesome size={25} name="bar-chart" color={tintColor}/>,
			tabBarColor: '#ffa500'
		}
	},
	help: {
		screen: () => { return <View><Text>Hellppppp</Text></View>},
		navigationOptions: {
			title: 'Help',
			tabBarIcon: ({tintColor}) => <Feather size={25} name="help-circle" color={tintColor}/>,
			tabBarColor: '#dd1115'
		}
	},
	more: {
		screen: TimerScreen,
		navigationOptions: {
			title: 'More',
			tabBarIcon: ({tintColor}) => <Feather size={25} name="more-horizontal" color={tintColor}/>,
			tabBarColor: '#0055ff'
		}
	}
}, {
	activeColor: 'white',
	inactiveColor: 'black'
});

const AppContainer = createAppContainer(MainNavigator);

interface AppState{
	currentSession: SessionTypes.Session,
	savedSessions: SessionTypes.Session[],
	sessionActions: SessionTypes.SessionStateActions
};

export default class App extends React.Component<{}, AppState> {
	constructor(props: object){
		super(props);

		this.state = {
			currentSession: {
				...Constants.State.DEFAULT_SESSION_STATE
			},
			savedSessions: [],
			sessionActions: {
				setCurrentSession: this.setCurrentSession,
				createNewSession: this.createNewSession,
				resetSession: this.resetSession,
				addTimeToSession: this.addTimeToSession
			}
		};
	}

	componentDidMount(){
		this.setState(({savedSessions, currentSession}) => {
			return {
				savedSessions: [...savedSessions, currentSession]
			};
		});
	}

	getSavedSessionFromName(sessionName: string){
		const foundIndex = this.state.savedSessions.findIndex(session => session.name === sessionName);
		return {session: this.state.savedSessions[foundIndex], index: foundIndex};
	}

	resetSession = (session: SessionTypes.Session) => {
		this.setState(({savedSessions}) => {
			const newCurrentSession = {
				...Constants.State.DEFAULT_SESSION_STATE,
				name: session.name
			};

			const {index} = this.getSavedSessionFromName(session.name); //savedSessions.findIndex(s => s.name === session.name);
			const newSavedSessions = [...savedSessions];
			newSavedSessions[index] = newCurrentSession;

			return {
				savedSessions: newSavedSessions,
				currentSession: newCurrentSession
			}
		});
	}

	setCurrentSession = (sessionName: string) => {
		const {session} = this.getSavedSessionFromName(sessionName); //this.state.savedSessions.find(session => session.name === sessionName);
		if(session !== undefined){
			this.setState({currentSession: session});
		}
	}

	createNewSession = (sessionName: string): SessionTypes.Session => {
		const newSession = {
			...Constants.State.DEFAULT_SESSION_STATE,
			name: sessionName
		};

		this.setState(({savedSessions}) => ({
			savedSessions: [
				...savedSessions,
				newSession
			]
		}), () => this.setState({currentSession: newSession}));

		return newSession;
	}

	addTimeToSession = (time: SessionTypes.SessionTime, session: SessionTypes.Session) => {
		const newTimes = [
			...session.times,
			time,
		];

		const {index} = this.getSavedSessionFromName(session.name);
		const updatedSession = {...session, times: newTimes};

		const newSavedSessions = [...this.state.savedSessions];
		newSavedSessions[index] = updatedSession;
		this.setState({
			savedSessions: newSavedSessions
		}, () => {
			if(session.name === this.state.currentSession.name){
				this.setState({currentSession: updatedSession});
			}
		});
	}


	async componentWillMount(){
		await Expo.Font.loadAsync({
			'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
			'Feather': require('@expo/vector-icons/fonts/Feather.ttf')
		});
	}

	public render() {
		const {currentSession, sessionActions, savedSessions} = this.state;
		return (
			<View style={styles.container}>
				<Expo.KeepAwake />
				<StatusBar barStyle="light-content" />
				<SavedSessionsContext.Provider value={{savedSessions, sessionActions}}>
					<CurrentSessionContext.Provider value={currentSession}>
						<AppContainer style={{flex: 1}} />
					</CurrentSessionContext.Provider>
				</SavedSessionsContext.Provider>
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

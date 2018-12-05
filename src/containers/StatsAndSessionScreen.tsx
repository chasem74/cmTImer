import * as React from 'react';

import {
	View,
	Platform,
	SafeAreaView,
	ScrollView,
} from 'react-native';

import SessionView from '../components/SessionView';
import StatsView from '../components/StatsView';

import SessionContext from '../context/SessionContext';

import {MaterialHeaderButtons, Item} from '../components/StandardHeaderButton';

export default class StatsAndSessionScreen extends React.Component{

	static navigationOptions = ({navigation, navigationOptions}) => {
		return {
			headerTitle: 'Stats',
			headerStyle: {
				marginTop: Platform.OS === 'android' ? 24 : 0,
				backgroundColor: 'black'
			},
			headerTintColor: 'white',
			headerLeft: (
				<MaterialHeaderButtons>
					<Item
					title="Clear"
					color="white"
					onPress={() => navigation.getParam('resetSessionDataToDefault')()}
					/>
				</MaterialHeaderButtons>
			),
			headerRight: (
				<MaterialHeaderButtons>
					<Item
					title="Sessions"
					color="white"
					onPress={() => navigation.navigate('new_session', {...navigation.state.params})}
					/>
				</MaterialHeaderButtons>
			),
		}
	}

	state = {
		currentSession: {
			name: 'Default',
			times: [{
				value: 123,
				scramble: 'R'
			}],
			stats: []
		}
	};

	componentDidMount(){
		this.props.navigation.setParams({
			resetSessionDataToDefault: this.props.resetSessionDataToDefault,
			currentSession: this.state.currentSession
		});
	}

	renderSessionAndStatsView = (session) => {
		return (
			<View style={{flex: 1}}>
				<StatsView stats={session.stats} numTimes={session.times.length} />
				<SessionView name={session.name} times={session.times} />
			</View>
		);
	}

	render(){
		return (
			<SafeAreaView style={{flex: 1}}>
				<ScrollView>
					<SessionContext.Provider value={this.state.currentSession}>
						{this.renderSessionAndStatsView(this.state.currentSession)}
					</SessionContext.Provider>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

/*
const mapDispatchToProps = (dispatch) => ({
	computeNewStats: () => dispatch(actions.computeStatsForCurrentSession()),
	createNewSession: (name) => dispatch(actions.createNewSession(name)),
	setCurrentSessionByName: (sessionName) => dispatch(actions.setCurrentSessionByName(sessionName)),
	resetSessionDataToDefault: () => dispatch(actions.resetSessionDataToDefault()),
});
*/
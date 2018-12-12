import * as React from 'react';

import {
	View,
	Platform,
	SafeAreaView,
	ScrollView,
} from 'react-native';

import {Divider} from 'react-native-elements';

import SessionView from '../components/SessionView';
import StatsView from '../components/StatsView';
import {MaterialHeaderButtons, Item} from '../components/StandardHeaderButton';

import {withCurrentAndSavedSessions} from '../context';
import * as SessionTypes from '../common/session_types';

interface Props{
	navigation: any,
	savedSessions: SessionTypes.Session[],
	sessionActions: SessionTypes.SessionStateActions,
	currentSession: SessionTypes.Session,
}

class StatsAndSessionScreen extends React.Component<Props>{

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
					onPress={() => navigation.getParam('resetCurrentSession')()}
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

	componentDidMount(){
		this.props.navigation.setParams({
			resetCurrentSession: () => this.props.sessionActions.resetSession(this.props.currentSession),
			currentSession: this.props.currentSession
		});
	}

	render(){
		const session = this.props.currentSession;
		return (
			<SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
				<View style={{flex: 1}}>
					<StatsView stats={session.stats} numTimes={session.times.length} />
					<Divider style={{height: 2}}/>
					<ScrollView style={{flex: 8, backgroundColor: 'white'}}>
						<SessionView name={session.name} times={session.times} />
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}

export default withCurrentAndSavedSessions(StatsAndSessionScreen);
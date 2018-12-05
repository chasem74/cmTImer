import * as React from 'react';

import {
	StyleSheet,
	Alert,
	SafeAreaView
} from 'react-native';

import {
	FormLabel,
	FormInput,
	FormValidationMessage,
	List,
	ListItem
} from 'react-native-elements';

import {MaterialHeaderButtons, Item} from '../components/StandardHeaderButton';

import SessionContext from '../context/SessionContext';

export default class NewSessionScreen extends React.Component {

	static navigationOptions = ({navigation, navigationOptions}) => {
		return {
			headerTitle: "New Session",
			headerLeft: (
				<MaterialHeaderButtons>
					<Item
					title="Cancel"
					color={navigationOptions.headerTintColor}
					onPress={() => navigation.pop()}
					/>
				</MaterialHeaderButtons>
			)
		};
	};

	state = {
		newSessionName: '',
		selectedSessionName: ''
	}

	constructor(props){
		super(props);

		this.state.selectedSessionName = this.props.navigation.state.params.currentSession.name;
	}

	componentDidMount(){
	}

	setSessionNameInput = newSessionName => {
		this.setState({newSessionName});
	}

	onSubmitEditing = (sessions) => {
		const trimmedName = this.state.newSessionName.trim();
		if(trimmedName !== ""){
			if(sessions[trimmedName]){
				Alert.alert('A session with that name already exists');
			}else{
//				this.props.createNewSession(trimmedName);
//				this.props.setCurrentSessionByName(trimmedName);
				this.props.navigation.pop();
			}
		}
	}

	onSelectSessionFromList = (selectedSessionName) => {
		if(this.state.selectedSessionName !== selectedSessionName){
			this.setState({selectedSessionName});
		//	this.props.setCurrentSessionByName(selectedSessionName);
			this.props.navigation.pop();
		}
	}

	renderSession = (session) => {
		if(session.name !== this.state.selectedSessionName){
			return (
				<ListItem
				hideChevron
				key={session.name}
				title={session.name}
				onPress={() => this.onSelectSessionFromList(session.name)}
				/>
			);
		}else{
			return (
				<ListItem
				key={session.name}
				title={session.name}
				rightIcon={{name: "check", type: "feather", color: "blue"}}
				onPress={() => this.onSelectSessionFromList(session.name)}
				/>
			);
		}
	}

	renderSessions = (sessions) => {
		let result = [];
		for(var key in sessions){
			if(sessions.hasOwnProperty(key)){
				const session = sessions[key];
				result.push(this.renderSession(session));
			}
		}
		return result;
	}

	renderSessionsList = (sessions) => {
		return (
			<List>
				{this.renderSessions(sessions)}
			</List>
		);
	}

	render(){
		return(
			<SessionContext.Consumer>
			{sessions => (
				<SafeAreaView style={{flex: 1}}>
					<FormInput
					inputStyle={styles.textInput}
					value={this.state.newSessionName}
					autoFocus
					containerStyle={{margin: 15}}
					returnKeyType="done"
					placeholder="Session name"
					onChangeText={this.setSessionNameInput}
					onSubmitEditing={() => this.onSubmitEditing(sessions)}
					/>

					{this.renderSessionsList(sessions)}
				</SafeAreaView>
			)}
			</SessionContext.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		color: 'black',
	}
});

/*const mapStateToProps = (state) => ({
	currentSession: state.currentSession,
	allSessions: state.savedSessions
});

const mapDispatchToProps = (dispatch) => ({
	createNewSession: (name) => {
		dispatch(actions.createNewSession(name))
	},
	setCurrentSessionByName: (sessionName) => {
		dispatch(actions.setCurrentSessionByName(sessionName))
	},
//	resetSessionDataToDefault: () => dispatch(actions.resetSessionDataToDefault()),
});
*/
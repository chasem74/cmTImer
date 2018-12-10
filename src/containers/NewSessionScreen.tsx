import * as React from 'react';

import {
	StyleSheet,
	Alert,
	SafeAreaView
} from 'react-native';

import {
//	FormLabel,
	FormInput,
//	FormValidationMessage,
	List,
	ListItem
} from 'react-native-elements';

import {MaterialHeaderButtons, Item} from '../components/StandardHeaderButton';

import {withCurrentAndSavedSessions} from '../context';
import * as SessionTypes from '../common/session_types';

interface Props{
	navigation: any,
	savedSessions: SessionTypes.Session[],
	savedSessionsActions: SessionTypes.SavedSessionsActions,
	currentSession: SessionTypes.Session,
}

type State = {
	selectedSessionName: string,
	newSessionName: string
};

class NewSessionScreen extends React.Component<Props, State>{

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

	constructor(props: Props){
		super(props);

		this.state = {
			selectedSessionName: props.currentSession.name,
			newSessionName: ''
		};
	}

	setSessionNameInput = (newSessionName: string) => {
		this.setState({newSessionName});
	}

	onSubmitEditing = () => {
		const trimmedName = this.state.newSessionName.trim();
		if(trimmedName === ''){
			Alert.alert('Name can not be empty!');
			return;
		}

		if(this.props.savedSessions.find(session => session.name === trimmedName)){
			Alert.alert('A session with that name already exists');
			return;
		}

		this.props.savedSessionsActions.createNewSession(trimmedName);
		this.props.navigation.pop();
	}

	onSelectSessionFromList = (selectedSessionName: string) => {
		if(this.state.selectedSessionName !== selectedSessionName){
			this.setState({selectedSessionName});
			this.props.savedSessionsActions.setCurrentSession(selectedSessionName);
			this.props.navigation.pop();
		}
	}

	renderSession = (session: SessionTypes.Session) => {
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

	renderSessionsList = () => {
		return (
			<List>
				{this.props.savedSessions.map(session => this.renderSession(session))/*this.renderSessions(sessions)*/}
			</List>
		);
	}

	render(){
		return(
			<SafeAreaView style={{flex: 1}}>
				<FormInput
				inputStyle={styles.textInput}
				value={this.state.newSessionName}
				autoFocus
				containerStyle={{margin: 15}}
				returnKeyType="done"
				placeholder="Session name"
				onChangeText={this.setSessionNameInput}
				onSubmitEditing={() => this.onSubmitEditing(this.props.savedSessions)}
				/>
				{this.renderSessionsList()}
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		color: 'black',
	}
});

export default withCurrentAndSavedSessions(NewSessionScreen);
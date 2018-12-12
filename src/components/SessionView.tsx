import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SectionList
} from 'react-native';

import {ListItem} from 'react-native-elements';

import moment from 'moment';
import * as SessionTypes from '../common/session_types';

export default ({name, times}) => {

	function createListItemText(item: SessionTypes.SessionTime, index: number): string{
		return (index + 1) + '. ' + moment(item.value).format('mm:ss:SS');;
	}

	function renderListItem({item, index}){
		return (
			<View style={{flex: 1}}>
				<ListItem
				key={index}
				title={createListItemText(item, index)}
				subtitle={item.scramble}
				containerStyle={{backgroundColor: 'white'}}
				/>
			</View>
		);
	}

	return (
		<View style={{flex: 1}}>
			<SectionList
			sections={[{data: times}]}
			renderItem={renderListItem}
			renderSectionHeader={() => (<View style={styles.sessionListHeader}><Text>{name}</Text></View>)}
			keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	timeListItem: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 5,
	},

	sessionListHeader: {
		backgroundColor: 'lightgray',
		padding: 2
	}
});
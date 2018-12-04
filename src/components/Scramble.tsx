import * as React from 'react';

import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

function Scramble(props){
	return (
		<View style={[styles.container, props.style]}>
			<Text style={styles.algorithmText}>{props.scramble}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'black'
	},

	algorithmText: {
		color: 'white',
		fontSize: 18,
		alignSelf: 'center',
	}
});

export default Scramble;
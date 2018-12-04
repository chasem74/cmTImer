import * as React from 'react';
import {useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';

interface CounterProps{
	initialValue: number
}

function Counter({initialValue}: CounterProps) {
	let [count, setCount] = useState(initialValue);

	return <Button onPress={() => setCount(count + 1)} title={count.toString()} />
}


export default class App extends React.Component {
	public render() {
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Counter initialValue={4}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

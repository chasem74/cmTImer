import * as React from 'react';
import {useState, useEffect} from 'react';

import {
	StatusBar,
	View
} from 'react-native';

import TimerView from '../components/TimerView';
import Scramble from '../components/Scramble';

import {useStatusBarStyle} from '../common/hooks';

export default function TimerScreen(props){

	const [statusStyle, setStatusStyle] = useStatusBarStyle('light-content');

	return (
		<View style={{flex: 1}}>
			<Scramble style={{flex: 1}} scramble="R' L U" />
			<TimerView style={{flex: 3}}/>
		</View>
	);
}
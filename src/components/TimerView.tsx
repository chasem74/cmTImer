import * as React from 'react';
import {useState, useEffect} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import moment from 'moment';

import Constants from '../common/constants';

function useTimerInterval(duration: number, startImmediately: boolean, callback: () => void | undefined | null){
	const [intervalState, setIntervalState] = useState(startImmediately);
	const [time, setTime] = useState(0);
	useEffect(() => {
		let tmpID: null | number = null;
		if(intervalState){
			tmpID = setInterval(() => {
				setTime(moment.now() - time);
				callback && callback();
			}, duration);
		}

		return () => {
			if(tmpID){
				clearInterval(tmpID);
			}
		};
	}, [intervalState]);

	return {
		isRunning: intervalState,
		time,
		startTimer: () => setIntervalState(true),
		stopTimer: () => setIntervalState(false),
		resetTimer: () => {
			setTime(moment.now());
			setIntervalState(false);
		}
	};
}

export default () => {
	const [backgroundColor, setBackgroundColor] = useState(Constants.UI.DEFAULT_TIMER_BACKGROUND_COLOR);
	const {time, isRunning, resetTimer, startTimer, stopTimer} = useTimerInterval(50, false, () => {
	});
	const [isHoldingDown, setIsHoldingDown] = useState(false);

	useEffect(() => {
		if(isHoldingDown){
			setBackgroundColor(Constants.UI.PRESSED_TIMER_BACKGROUND_COLOR);
		}else{
			setBackgroundColor(Constants.UI.DEFAULT_TIMER_BACKGROUND_COLOR);
		}
	}, [isHoldingDown]);

	function onTimerPress(){
		if(isRunning){
			stopTimer();
		}
	}

	function onTimerLongPress(){
		if(!isRunning){
			setIsHoldingDown(true);
		}else{
			stopTimer();
		}
	}

	function onTimerPressOut(){
		if(isHoldingDown){
			resetTimer();
			setIsHoldingDown(false);
			startTimer();
		}
	}

	return (
		<View style={styles.timerContainer}>
			<TouchableOpacity
			style={[styles.timerTextContainer, {backgroundColor: backgroundColor}]}
			activeOpacity={0.7}
			onPress={onTimerPress}
			onLongPress={onTimerLongPress}
			onPressOut={onTimerPressOut}
			>
				<Text style={styles.timerText}>{moment(time).format("mm:ss:SS")}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	timerContainer: {
		flex: 1
	},
	timerTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	timerText: {
		color: 'white',
		fontSize: 36,
	//	alignSelf: 'center',
	},
});
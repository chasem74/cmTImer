import {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import moment from 'moment';

export function useTimerInterval(duration: number, startImmediately: boolean, callback: () => void | undefined | null){
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

export function useStatusBarStyle(initialStyle: string){
	const [style, setStyle] = useState(initialStyle);
	useEffect(() => {
		StatusBar.setBarStyle(style);

		return () => {
			StatusBar.setBarStyle(initialStyle);
		};
	}, [style]);

	return [style, setStyle];
}
export type SessionTime = {
	value: number,
	scramble: string
}

export type SessionStat = {
	name: string,
	value: number
}

export type Session = {
	name: string,
	times: SessionTime[]
	stats: SessionStat[]
};

export interface SavedSessionsActions{
	resetSession?: (session: Session) => void,
	createNewSession?: (sessionName: string) => Session,
	setCurrentSession?: (sessionName: string) => void
}
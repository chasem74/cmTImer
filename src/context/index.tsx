import * as React from 'react';
import {useContext} from 'react';

import CurrentSessionContext from './CurrentSessionContext';
import SavedSessionsContext from './SavedSessionsContext';

export const withCurrentAndSavedSessions = WrappedComponent => {
	return class extends React.Component {
		static navigationOptions = WrappedComponent.navigationOptions;

		public render(){
			return (
				<CurrentSessionContext.Consumer>
					{
						currentSession => (
							<SavedSessionsContext.Consumer>
							{
								(sessionState) => <WrappedComponent {...this.props} currentSession={currentSession} {...sessionState} />
							}
							</SavedSessionsContext.Consumer>
						)
					}
				</CurrentSessionContext.Consumer>
			);
		}
	}
};
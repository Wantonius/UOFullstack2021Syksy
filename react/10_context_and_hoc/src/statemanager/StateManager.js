import React from 'react';
import StateContext from './StateContext';

const StateManager = (Component) => {
	return class StateManager extends React.Component {
		render() {
			return(
				<StateContext.Consumer>
				{state => <Component {...this.props} {...state}/>}
				</StateContext.Consumer>	
			)
		}
	}
}
export default StateManager;
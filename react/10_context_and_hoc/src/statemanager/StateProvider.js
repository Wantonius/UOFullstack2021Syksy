import React from 'react';
import StateContext from './StateContext';

export default class StateProvider extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100
		}
	}
	
	addToList = (contact) => {
		contact.id = this.state.id;
		this.setState((state) => {
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	removeFromList = (id) => {
		this.setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id)
			return {
				list:tempList
			}
		})
	}
	
	render() {
		return(
			<StateContext.Provider value={{
				list:this.state.list,
				addToList:this.addToList,
				removeFromList:this.removeFromList
			}}>
			{this.props.children}
			</StateContext.Provider>
		)
	}
}
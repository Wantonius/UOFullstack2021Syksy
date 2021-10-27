import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

class App extends React.Component {
	
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
			let tempList = state.list.filter(item => item.id !== id)
			return {
				list:tempList
			}
		})
	}
	
	render() {
		return (
			<div className="App">
				<ContactForm addToList={this.addToList}/>
				<hr/>
				<ContactList list={this.state.list} removeFromList={this.removeFromList}/>
			</div>
		);
	}
}

export default App;

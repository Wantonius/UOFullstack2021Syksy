import React from 'react';
import StateManager from '../statemanager/StateManager';

class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		this.props.addToList(this.state);
		this.setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="firstname">First Name</label>
				<input type="text"
						name="firstname"
						onChange={this.onChange}
						value={this.state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last Name</label>
				<input type="text"
						name="lastname"
						onChange={this.onChange}
						value={this.state.lastname}/>
				<br/>
				<label htmlFor="email">Email</label>
				<input type="email"
						name="email"
						onChange={this.onChange}
						value={this.state.email}/>
				<br/>
				<label htmlFor="phone">Phone</label>
				<input type="text"
						name="phone"
						onChange={this.onChange}
						value={this.state.phone}/>
				<br/>
				<input type="submit" value="add"/>
			</form>
		)
	}
	
}

export default StateManager(ContactForm);
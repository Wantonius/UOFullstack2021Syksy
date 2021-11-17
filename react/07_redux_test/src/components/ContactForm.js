import React from 'react';
import {connect} from 'react-redux';

class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:""
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		console.log("ContactForm, onSubmit, dispatch ADD_TO_LIST")
		this.props.dispatch({
			 type:"ADD_TO_LIST",
			 contact:this.state
		})
	}
	
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="firstname">First name</label>
				<input type="text"
						name="firstname"
						onChange={this.onChange}
						value={this.state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last name</label>
				<input type="text"
						name="lastname"
						onChange={this.onChange}
						value={this.state.lastname}/>
				<br/>
				<input type="submit" value="Add"/>
			</form>
		)
	}
}

export default connect()(ContactForm);
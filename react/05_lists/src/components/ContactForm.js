import React from 'react';
import {Form,Button} from 'semantic-ui-react';

export default class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			email:"",
			phone:"",
			address:"",
			city:""
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...this.state
		}
		this.props.addToList(contact)
		this.setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:"",
			address:"",
			city:""			
		})
	}
	
	render() {
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="firstname">First Name</label>
					<input type="text"
							name="firstname"
							onChange={this.onChange}
							value={this.state.firstname}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="lastname">Last Name</label>
					<input type="text"
							name="lastname"
							onChange={this.onChange}
							value={this.state.lastname}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="email">Email</label>
					<input type="email"
							name="email"
							onChange={this.onChange}
							value={this.state.email}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="phone">Phone</label>
					<input type="text"
							name="phone"
							onChange={this.onChange}
							value={this.state.phone}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="address">Address</label>
					<input type="text"
							name="address"
							onChange={this.onChange}
							value={this.state.address}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="city">City</label>
					<input type="text"
							name="city"
							onChange={this.onChange}
							value={this.state.city}/>
				</Form.Field>
				<Button type="submit">Add</Button>
			</Form>
		)
		
	}
}
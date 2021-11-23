import React from 'react';
import StateManager from '../statemanager/StateManager';

class ContactList extends React.Component {
	
	render() {
		let contacts = this.props.list.map((contact) => {
			return (
				<tr key={contact.id}>
					<td>{contact.firstname}</td>
					<td>{contact.lastname}</td>
					<td>{contact.email}</td>
					<td>{contact.phone}</td>
					<td><button onClick={() => this.props.removeFromList(contact.id)}>Remove</button></td>
				</tr>
			)
		})
		return (
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
				{contacts}
				</tbody>
			</table>
		)
	}
	
}

export default StateManager(ContactList);
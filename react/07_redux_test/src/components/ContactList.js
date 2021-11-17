import React from 'react';
import {connect} from 'react-redux';

class ContactList extends React.Component {
	
	render() {		
		let contacts = this.props.list.map((contact,index) => {
			return (
				<li key={index}>First Name:{contact.firstname}<br/>
						Last Name:{contact.lastname}<br/>
						<button onClick={() => this.props.dispatch({
							type:"REMOVE_FROM_LIST",
							index:index
						})}>Remove</button>
				</li>
			)
		})
		return(
			<ul style={{listStyleType:"none"}}>
				{contacts}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	console.log("ContactList, mapStateToProps, state:",state)
	return {
		list:state.list
	}
}

export default connect(mapStateToProps)(ContactList);

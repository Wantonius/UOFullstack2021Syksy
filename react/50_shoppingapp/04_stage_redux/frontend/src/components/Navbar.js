import React from 'react';
import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';

class Navbar extends React.Component {
	
	render() {
		let navStyle = {
			height:120,
			backgroundColor:"lightblue"
		}
		let header = <Header>Shopping App</Header>
		if(this.props.loading) {
			header = <Header>Loading ... </Header>
		}
		if(this.props.error) {
			header = <Header>{this.props.error}</Header>
		}
		if(this.props.isLogged) {
			return(
				<div style={navStyle}>
					{header}
					<List>
						<List.Item><Link to="/list">Shopping List</Link></List.Item>
						<List.Item><Link to="/form">Add new item</Link></List.Item>
						<List.Item><Link to="/" onClick={() => this.props.dispatch(logout(this.props.token))}>Logout</Link></List.Item>
					</List>
				</div>
			)
		} else {
			return(
				<div style={navStyle}>
					{header}
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	let error = "";
	if(state.shopping.error) {
		error = state.shopping.error
	}
	if(state.login.error) {
		error = state.login.error
	}
	return {
		isLogged:state.login.isLogged,
		token:state.login.token,
		loading:state.login.loading,
		error:error
	}
}

export default connect(mapStateToProps)(Navbar);
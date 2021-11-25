import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import useAppState from '../statemanager/useappstate';
import useAction from '../statemanager/useaction';
const Navbar = (props) => {
	
	const state = useAppState();
	const {logout} = useAction();
	
	let navStyle = {
		height:120,
		backgroundColor:"lightblue"
	}
	let header = <Header>Shopping App</Header>
	if(state.loading) {
		header = <Header>Loading ... </Header>
	}
	if(state.error) {
		header = <Header>{state.error}</Header>
	}
	if(state.isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<List>
					<List.Item><Link to="/list">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add new item</Link></List.Item>
					<List.Item><Link to="/" onClick={logout}>Logout</Link></List.Item>
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

export default Navbar;
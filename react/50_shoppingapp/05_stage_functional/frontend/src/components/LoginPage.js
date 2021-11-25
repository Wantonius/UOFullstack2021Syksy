import {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import useAction from '../statemanager/useaction';

const LoginPage = (props) => {

	const [state,setState] = useState({
		username:"",
		password:""
	})
	
	const {login,register} = useAction();
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		let user = {
			...state
		}
		if(event.target.name === "register") {
			register(user);
		} else {
			login(user);
		}
	}
	
	let loginStyle = {
		width:500,
		margin:"auto"
	}
	return(
	<div style={loginStyle}>
		<Form>
			<Form.Field>
				<label htmlFor="username">Username</label>
				<input type="text"
						name="username"
						onChange={onChange}
						value={state.username}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="password">Password</label>
				<input type="password"
						name="password"
						onChange={onChange}
						value={state.password}/>
			</Form.Field>				
			<Button name="register" onClick={onSubmit}>Register</Button>
			<Button name="login" onClick={onSubmit}>Login</Button>
		</Form>
	</div>
	)
}

export default LoginPage;
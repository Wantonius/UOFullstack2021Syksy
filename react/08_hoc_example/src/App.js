import logo from './logo.svg';
import './App.css';
import FirstButton from './components/FirstButton';
import SecondButton from './components/SecondButton';
import React from 'react';

class App extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			message:""
		}
	}
	
	callback = (message) => {
		this.setState({
			message:message
		})
	}
	render() {
	  return (
		<div className="App">
			<h2>Button says:{this.state.message}</h2>
			<FirstButton callback={this.callback}/>
			<SecondButton callback={this.callback}/>
		</div>
		);
	}
}

export default App;

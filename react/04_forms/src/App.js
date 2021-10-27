import React from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			greeting:""
		}
	}
	
	setGreeting = (name) => {
		this.setState({
			greeting:"Hello,"+name
		})
	}
	
    render() {
	  return (
		<div className="App">
			<NameForm setGreeting={this.setGreeting}/>
			<h3>{this.state.greeting}</h3>
		</div>
	  );
    }
}

export default App;

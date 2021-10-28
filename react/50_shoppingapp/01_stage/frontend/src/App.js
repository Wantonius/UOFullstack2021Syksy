import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import React from 'react';
class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	getList = async () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		let response = await fetch("/api/shopping",request).catch(error => console.log(error))
		if(!response) {
			return;
		}
		if(response.ok) {
			let data = await response.json();
			this.setState({
				list:data
			})
		} else {
			console.log("Server responded with a status:",response.status)
		}
	}
	
	addToList = async (item) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		let response = await fetch("/api/shopping",request).catch(error => console.log(error))
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList();
		} else {
			console.log("Server responded with a status:",response.status)
		}
	}
	render() {
		return (
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
			</div>
		);
	}
}

export default App;

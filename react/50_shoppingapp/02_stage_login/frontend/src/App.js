import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	componentDidMount() {
		this.getList();
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
	
	removeFromList = async (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		const response = await fetch("/api/shopping/"+id,request).catch(error => console.log(error))
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList()
		} else {
			console.log("Failed to remove item from list. Server responded with a status:",response.status)
		}
	}
	
	editItem = async (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		const response = await fetch("/api/shopping/"+item.id,request).catch(error => console.log(error))
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList()
		} else {
			console.log("Failed to edit item. Server responded with a status",response.status);
		}
	}
	
	render() {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Switch>
				<Route exact path="/" render={() => 
					(<ShoppingList list={this.state.list}
					removeFromList={this.removeFromList}
					editItem={this.editItem}/>)
				}/>
				<Route path="/form" render={() => 
					(<ShoppingForm addToList={this.addToList}/>)
				}/>
				</Switch>
			</div>
		);
	}
}

export default App;

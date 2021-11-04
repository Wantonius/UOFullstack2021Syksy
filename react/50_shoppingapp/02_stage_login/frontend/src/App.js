import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			token:"",
			isLogged:false
		}
	}
	
	componentDidMount() {
		this.getList();
	}
	
//LOGIN API 	
	
	register = async (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		let response = await fetch("/register",request).catch(error => console.log("There was an error registering:",error));
		if(!response) {
			return;
		}
		if(response.ok) {
			alert("Register success!");
		} else {
			if(response.status === 409) {
				alert("Username already in use");
			}
			console.log("Server responded with a status:",response.status);
		}
	}

	login = async (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		let response = await fetch("/login",request).catch(error => console.log("There was an error logging in:",error));
		if(!response) {
			return;
		}
		if(response.ok) {
			let data = await response.json().catch(error => console.log("Failed to parse JSON"))
			if(!data) {
				return;
			}
			this.setState({
				isLogged:true,
				token:data.token
			},() => {
				this.getList();
			})			
		} else {
			console.log("Server responded with a status:",response.status);
		}
	}
	
//REST API	
	
	getList = async () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token}
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
			headers:{"Content-type":"application/json",
					"token":this.state.token},
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
			headers:{"Content-type":"application/json",
					"token":this.state.token}
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
			headers:{"Content-type":"application/json",
					"token":this.state.token},
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
						(<LoginPage register={this.register}
							login={this.login}/>)
					}/>
					<Route path="/list" render={() => 
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

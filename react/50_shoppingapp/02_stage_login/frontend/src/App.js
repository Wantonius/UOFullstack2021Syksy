import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			token:"",
			isLogged:false,
			loading:false,
			error:""
		}
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state, () => {
				if(this.state.isLogged) {
					this.getList();
				}
			})
		}
	}
	
//HELPERS

	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state))
	}
	
	clearState = () => {
		this.setState({
			list:[],
			token:"",
			isLogged:false,
			loading:false,
			error:""
		}, () => {
			this.saveToStorage();
		})
	}
	
	setError = (error) => {
		this.setState({
			error:error
		})
	}
	
	setLoading = (loading) => {
		this.setState({
			loading:loading
		})
	}
	
//LOGIN API 	
	
	register = async (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		this.setError("");
		this.setLoading(true);
		let response = await fetch("/register",request).catch(error => console.log("There was an error registering:",error));
		this.setLoading(false);
		if(!response) {
			return;
		}
		if(response.ok) {
			this.setError("Register success!");
		} else {
			if(response.status === 409) {
				this.setError("Username already in use");
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
		this.setError("");
		this.setLoading(true);
		let response = await fetch("/login",request).catch(error => console.log("There was an error logging in:",error));
		this.setLoading(false);
		if(!response) {
			return;
		}
		if(response.ok) {
			let data = await response.json().catch(error => this.setError("Failed to parse JSON. Please, try again!"))
			if(!data) {
				return;
			}
			this.setState({
				isLogged:true,
				token:data.token
			},() => {
				this.getList();
				this.saveToStorage();
			})			
		} else {
			this.setError("Login Failed! Server responded with a status:"+response.statusText);
		}
	}
	
	logout = async () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token}
		}
		this.setError("");
		this.setLoading(true);
		let response = await fetch("/logout",request).catch(error => console.log("There was an error logging out:",error))
		this.setLoading(false);
		this.clearState();
		if(!response) {
			return;
		}
		if(response.ok) {
			this.setError("You have been successfully logged out!");
		} else {
			this.setError("Server responded with no session found. Logging you out!");
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
		this.setError("");
		this.setLoading(true);
		let response = await fetch("/api/shopping",request).catch(error => console.log(error))
		this.setLoading(false);
		if(!response) {
			return;
		}
		if(response.ok) {
			let data = await response.json();
			this.setState({
				list:data
			}, () => {
				this.saveToStorage();
			})
		} else {
			if(response.status === 403) {
				this.clearState();
				this.setError("Session has expired! Logging you out!");
			}
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
		this.setError("");
		this.setLoading(true);
		let response = await fetch("/api/shopping",request).catch(error => console.log(error))
		this.setLoading(false);
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList();
		} else {
			if(response.status === 403) {
				this.clearState();
				this.setError("Session has expired! Logging you out!");
			}
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
		this.setError("");
		this.setLoading(true);
		const response = await fetch("/api/shopping/"+id,request).catch(error => console.log(error))
		this.setLoading(false);
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList()
		} else {
			if(response.status === 403) {
				this.clearState();
				this.setError("Session has expired! Logging you out!");
			}
			if(response.status === 404) {
				this.getList();
			}			
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
		this.setError("");
		this.setLoading(true);
		const response = await fetch("/api/shopping/"+item.id,request).catch(error => console.log(error))
		this.setLoading(false);
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList()
		} else {			
			if(response.status === 403) {
				this.clearState();
				this.setError("Session has expired! Logging you out!");
			}
			if(response.status === 404) {
				this.getList();
			}	
			console.log("Failed to edit item. Server responded with a status",response.status);
		}
	}
	
	render() {
		return (
			<div className="App">
				<Navbar isLogged={this.state.isLogged} 
				logout={this.logout} loading={this.state.loading}
				error={this.state.error}/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() =>  this.state.isLogged ?
					    (<Redirect to="/list"/>) :
						(<LoginPage register={this.register}
							login={this.login}/>)
					}/>
					<Route path="/list" render={() => this.state.isLogged ?
						(<ShoppingList list={this.state.list}
						removeFromList={this.removeFromList}
						editItem={this.editItem}/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() =>  this.state.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>):
						(<Redirect to="/"/>)
					}/>
					<Route render={() => this.state.isLogged ? 
						(<Redirect to="/list"/>):
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

export default App;

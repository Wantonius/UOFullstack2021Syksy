import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import {connect} from 'react-redux';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state, () => {
				if(this.props.isLogged) {
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
			list:[]
		}, () => {
			this.saveToStorage();
		})
	}
	
	setError = (error) => {
	}
	
	setLoading = (loading) => {
	}
	
//LOGIN API 	
	



	
	logout = async () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token}
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
					"token":this.props.token}
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
					"token":this.props.token},
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
					"token":this.props.token}
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
					"token":this.props.token},
			body:JSON.stringify(item)
		}
		this.setError("");
		this.setLoading(true);
		const response = await fetch("/api/shopping/"+item._id,request).catch(error => console.log(error))
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
				<Navbar logout={this.logout} />
				<hr/>
				<Switch>
					<Route exact path="/" render={() =>  this.props.isLogged ?
					    (<Redirect to="/list"/>) :
						(<LoginPage	/>)
					}/>
					<Route path="/list" render={() => this.props.isLogged ?
						(<ShoppingList list={this.state.list}
						removeFromList={this.removeFromList}
						editItem={this.editItem}/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() =>  this.props.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>):
						(<Redirect to="/"/>)
					}/>
					<Route render={() => this.props.isLogged ? 
						(<Redirect to="/list"/>):
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default connect(mapStateToProps)(App);

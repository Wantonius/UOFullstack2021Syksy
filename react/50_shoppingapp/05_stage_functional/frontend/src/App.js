import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends React.Component {
	

	render() {
		return (
			<div className="App">
				<Navbar />
				<hr/>
				<Switch>
					<Route exact path="/" render={() =>  this.state.isLogged ?
					    (<Redirect to="/list"/>) :
						(<LoginPage />)
					}/>
					<Route path="/list" render={() => this.state.isLogged ?
						(<ShoppingList />) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() =>  this.state.isLogged ?
						(<ShoppingForm />):
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

import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import useAppState from './statemanager/useappstate';

function App() {
	
	const state = useAppState();
	
	return (
		<div className="App">
			<Navbar />
			<hr/>
			<Switch>
				<Route exact path="/" render={() =>  state.isLogged ?
					(<Redirect to="/list"/>) :
					(<LoginPage />)
				}/>
				<Route path="/list" render={() => state.isLogged ?
					(<ShoppingList />) :
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() =>  state.isLogged ?
					(<ShoppingForm />):
					(<Redirect to="/"/>)
				}/>
				<Route render={() => state.isLogged ? 
					(<Redirect to="/list"/>):
					(<Redirect to="/"/>)
				}/>
			</Switch>
		</div>
	);

}

export default App;

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import ShoppingForm from './ShoppingForm';

function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		item.id = state.id;
		setState(state => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	const removeFromList = (id) => {
		setState(state => {
			let tempList = state.list.filter(item => id !== item.id)
			return {
				...state,
				list:tempList
			}
		})
	} 
	
	return (
		<div className="App">
			<ShoppingForm addToList={addToList}/>
    
		</div>
	);
}

export default App;

import logo from './logo.svg';
import './App.css';
import {useReducer} from 'react';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';

const initialState = {
	list:[],
	id:100
}

const listReducer = (state,action) => {
	let tempList = [];
	switch(action.type) {
		case "ADD_TO_LIST":
			action.item.id = state.id;
			tempList = state.list.concat(item);
			return {
				list:tempList,
				id:state.id+1
			}
		case "REMOVE_FROM_LIST":
			tempList = state.list.filter(item => item.id !== action.id)
			return {
				...state,
				list:tempList
			}
		default:
			return state;
	}
}

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
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;

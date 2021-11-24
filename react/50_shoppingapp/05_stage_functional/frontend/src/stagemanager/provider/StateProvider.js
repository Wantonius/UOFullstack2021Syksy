import {useReducer} from 'react';
import StateContext from '../context/StateContext';
import ActionContext from '../context/ActionContext';
import {ActionConstants} from '../actionconstants';

const getInitialState = () => {
	if(sessionStorage.getItem("state")) {
	 	let state = JSON.parse(sessionStorage.getItem("state"));
		return state;
	} else {
		return {
			loading:false,
			error:"",
			list:[],
			token:"",
			isLogged:false
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const reducer = (state,action) => {
	let tempState = {}
	switch(action.type) {
		case ActionConstants.LOADING: 
			return {
				...state,
				loading:true,
				error:""
			}
		case ActionConstants.STOP_LOADING:
			return {
				...state,
				loading:false,
				error:""
			}
		case ActionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"Register success!"
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.REGISTER_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGIN_SUCCESS:
			tempState = {
				...state,
				error:"",
				isLogged:true,
				token:action.token
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGOUT_SUCCESS:
			tempState = {
				loading:false,
				list:[],
				token:"",
				isLogged:false,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		 case ActionConstants.LOGOUT_FAILED:
			tempState = {
				loading:false,
				list:[],
				token:"",
				isLogged:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.FETCH_LIST_SUCCESS:
			tempState = {
				...state,
				list:action.list,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.FETCH_LIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.ADD_ITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.ADD_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.REMOVE_ITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;	
		case ActionConstants.REMOVE_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.EDIT_ITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;	
		case ActionConstants.EDIT_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

const StateProvider = (props) => {
	const [state,dispatch] = useReducer(reducer,initialState);
	return (
		<StateContext.Provider value={state}>
			<ActionContext.Provider value={dispatch}>
				{props.children}	
			</ActionContext.Provider>
		</StateContext.Provider>
	)
}

export default StateProvider;
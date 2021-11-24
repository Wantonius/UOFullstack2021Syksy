import {useReducer} from 'react';
import StateContext from '../context/StateContext';
import ActionContext from '../context/ActionContext';
import {ActionConstants} from '../actionconstants';

const initialState = {
	loading:false,
	error:"",
	list:[],
	token:"",
	isLogged:false
}

const reducer = (state,action) => {
	
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
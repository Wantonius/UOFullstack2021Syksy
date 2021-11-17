import {LOADING,
		STOP_LOADING,
		REGISTER_SUCCESS,
		REGISTER_FAILED,
		LOGIN_SUCCESS,
		LOGIN_FAILED,
		LOGOUT_SUCCESS,
		LOGOUT_FAILED,
		CLEAR_LOGIN_STATE} from '../actions/loginActions';


/* login state
	isLogged:boolean,
	loading:boolean,
	error:string,
	token:string
*/

const getInitialState = () => {
	if(sessionStorage.getItem("loginstate")) {
		let state = JSON.parse(sessionStorage.getItem("loginstate"))
		return state;
	} else {
		return {
			isLogged:false,
			loading:false,
			error:"",
			token:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state=initialState,action) => {
	console.log("LoginReducer, action:",action)
	let tempState = {};
	switch(action.type) {
		case LOADING:
			return {
				...state,
				loading:true,
				error:""
			}
		case STOP_LOADING:
			return {
				...state,
				loading:false,
				error:""
			}
		case REGISTER_SUCCESS: 
			tempState = {
				...state,
				error:"Register Success",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case REGISTER_FAILED:
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case LOGIN_SUCCESS:
			tempState = {
				isLogged:true,
				token:action.token,
				error:"",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				isLogged:false,
				error:"You have successfully logged out",
				token:"",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				isLogged:false,
				error:action.error,
				token:"",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case CLEAR_LOGIN_STATE:
			tempState = {
				isLogged:false,
				token:"",
				error:"",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default loginReducer;
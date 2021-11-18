import {FETCH_LIST_SUCCESS,
		FETCH_LIST_FAILED,
		ADD_ITEM_SUCCESS,
		ADD_ITEM_FAILED,
		REMOVE_ITEM_SUCCESS,
		REMOVE_ITEM_FAILED,
		EDIT_ITEM_SUCCESS,
		EDIT_ITEM_FAILED,
		CLEAR_SHOPPING_STATE} from '../actions/shoppingActions';
		

const getInitialState = () => {
	if(sessionStorage.getItem("shoppingstate")) {
		let state = JSON.parse(sessionStorage.getItem("shoppingstate"))
		return state;
	} else {
		return {
			list:[],
			error:""
		}
	}
}
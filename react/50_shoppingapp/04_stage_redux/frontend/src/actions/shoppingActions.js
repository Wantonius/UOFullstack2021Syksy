import {loading,stopLoading,clearLoginState} from './loginActions';

export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILED = "ADD_ITEM_FAILED";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE";

//ASYNC ACTION CREATORS

export const getList = (token) => {
	return async (dispatch) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":token}
		}
		dispatch(loading());
		let response = await fetch("/api/shopping",request).catch(error => console.log(error))
		dispatch(stopLoading());
		if(!response) {
			dispatch(fetchListFailed("There was an error with the connection"))
			return;
		}
		if(response.ok) {
			let data = await response.json();
			dispatch(fetchListSuccess(data));
		} else {
			if(response.status === 403) {
				dispatch(clearLoginState());
				dispatch(clearShoppingState());
				dispatch(fetchListFailed("Your session expired. Logging you out!"));
			} else {
				dispatch(fetchListFailed("Server responded with a status:"+response.status));
			}
		}
	}
}
//ACTION CREATORS

export const fetchListSuccess = (list) => {
	return {
		type:FETCH_LIST_SUCCESS,
		list:list
	}
}

export const fetchListFailed = (error) => {
	return {
		type:FETCH_LIST_FAILED,
		error:error
	}
}

export const addItemSuccess = () => {
	return {
		type:ADD_ITEM_SUCCESS
	}
}

export const addItemFailed = (error) => {
	return {
		type:ADD_ITEM_FAILED,
		error:error
	}
}

export const removeItemSuccess = () => {
	return {
		type:REMOVE_ITEM_SUCCESS
	}
}

export const removeItemFailed = (error) => {
	return {
		type:REMOVE_ITEM_FAILED,
		error:error
	}
}

export const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

export const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const clearShoppingState = () => {
	return {
		type:CLEAR_SHOPPING_STATE
	}
}
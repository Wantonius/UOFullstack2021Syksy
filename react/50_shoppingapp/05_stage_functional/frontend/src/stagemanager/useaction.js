import {useState,useEffect,useContext,useMemo} from 'react';
import useAppState from './useappstate';
import ActionContext from './context/ActionContext';
import {ActionConstants} from './actionconstants';

const useAction = () => {
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const dispatch = useContext(ActionContext);
	const state = useAppState();
	
	useEffect(() => {
		if(urlRequest.url === "") {
			return
		}
		const fetchData = async () => {
			dispatch({
				type:ActionConstants.LOADING			
			})
			const response = await fetch(urlRequest.url,urlRequest.request);
			dispatch({
				type:ActionConstants.STOP_LOADING			
			})
			if(!response) {
				return;
			}
			if(response.ok) {
				if(urlRequest.action === "register") {
					dispatch({
						type:ActionConstants.REGISTER_SUCCESS
					})
					return;
				}
				if(urlRequest.action === "login") {
					const data = await response.json();
					dispatch({
						type:ActionConstants.LOGIN_SUCCESS,
						token:data.token
					})
					getList(data.token);
				}
				if(urlRequest.action === "logout") {
					dispatch({
						type:ActionConstants.LOGOUT_SUCCESS
					})
					return;
				}
				if(urlRequest.action === "getlist") {
					const list = await response.json();
					dispatch({
						type:ActionConstants.FETCH_LIST_SUCCESS,
						list:list
					})
					return;
				}
				if(urlRequest.action === "additem") {
					dispatch({
						type:ActionConstants.ADD_ITEM_SUCCESS
					})
					getList(state.token);
					return;
				}
				if(urlRequest.action === "removeitem") {
					dispatch({
						type:ActionConstants.REMOVE_ITEM_SUCCESS
					})
					getList(state.token);
					return
				}
				if(urlRequest.action === "edititem") {
					dispatch({
						type:ActionConstants.EDIT_ITEM_SUCCESS
					})
					getList(state.token);
					return;
				}
			} else {
				
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}
	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":state.token},
				},
			action:"logout"
		})
	}
	
	const getList = (token) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":token}
			},
			action:"getlist"
		})
	}

	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":state.token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})	
	}

	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
						 "token":state.token},
			},
			action:"removeitem"
		})
	}

	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":state.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}

	return useMemo(() => ({
		register,
		login,
		logout,
		addItem,
		removeItem,
		editItem
	}),[dispatch])
}

export default useAction;
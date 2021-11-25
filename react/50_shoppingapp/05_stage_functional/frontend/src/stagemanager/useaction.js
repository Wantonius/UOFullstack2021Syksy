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
	
	useEffect(() => {},[urlRequest]);
	
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
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":state.token}
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
const initialState = {
	list:[]
}

const contactReducer = (state = initialState, action) => {
	console.log(state);
	console.log(action);
	let tempList = state.list.slice();
	switch(action.type) {
		case "ADD_TO_LIST": 
			tempList.push(action.contact);
			return {
				list:tempList
			}
		case "REMOVE_FROM_LIST":
			tempList.splice(action.index,1)
			return {
				list:tempList
			}
		default:
			return state;
	}
}

export default contactReducer;
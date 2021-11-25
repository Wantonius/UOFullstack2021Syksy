import {useState} from 'react';
import {Table} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import useAppState from '../statemanager/useappstate';
import useAction from '../statemanager/useaction';

const ShoppingList = (props) =>  {
	
	const appstate = useAppState();
	
	const {removeItem,editItem} = useAction();
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeToRemoveMode = (index) => {
		setState({
			removeIndex:index,
			editIndex:-1
		})
	}

	const changeToEditMode = (index) => {
		setState({
			removeIndex:-1,
			editIndex:index
		})
	}
	
	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const removeFromList = (id) => {
		removeItem(id);
		cancel();
	}
	
	const edit = (item) => {
		editItem(item);
		cancel();
	}
	
	let items = appstate.list.map((item,index) => {
		if(state.editIndex === index) {
			return (<EditRow key={item._id} item={item}
				editItem={edit}
				cancel={cancel} />)
		}
		if(state.removeIndex === index) {
			return (<RemoveRow key={item._id} item={item}
				cancel={cancel} removeFromList={removeFromList}/>)
		}
		return (
			<Row key={item._id} item={item}
				index={index} 
				changeToRemoveMode={changeToRemoveMode}
				changeToEditMode={changeToEditMode}/>
		)
	})
	return(
		<Table striped>
			<Table.Header>
				<Table.HeaderCell>Item Type</Table.HeaderCell>
				<Table.HeaderCell>Count</Table.HeaderCell>
				<Table.HeaderCell>Price</Table.HeaderCell>
				<Table.HeaderCell>Remove</Table.HeaderCell>
				<Table.HeaderCell>Edit</Table.HeaderCell>
			</Table.Header>
			<Table.Body>
			{items}
			</Table.Body>
		</Table>
	) 
		
}

export default ShoppingList;
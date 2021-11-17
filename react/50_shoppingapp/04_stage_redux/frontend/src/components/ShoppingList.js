import React from 'react';
import {Table} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	changeToRemoveMode = (index) => {
		this.setState({
			removeIndex:index,
			editIndex:-1
		})
	}

	changeToEditMode = (index) => {
		this.setState({
			removeIndex:-1,
			editIndex:index
		})
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	removeFromList = (id) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	editItem = (item) => {
		this.props.editItem(item);
		this.cancel();
	}
	
	render() {
		let items = this.props.list.map((item,index) => {
			if(this.state.editIndex === index) {
				return (<EditRow key={item._id} item={item}
					editItem={this.editItem}
					cancel={this.cancel} />)
			}
			if(this.state.removeIndex === index) {
				return (<RemoveRow key={item._id} item={item}
					cancel={this.cancel} removeFromList={this.removeFromList}/>)
			}
			return (
				<Row key={item._id} item={item}
					index={index} 
					changeToRemoveMode={this.changeToRemoveMode}
					changeToEditMode={this.changeToEditMode}/>
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
}
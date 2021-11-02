import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import Row from './Row';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.setState = {
			removeIndex:-1
		}
	}
	
	changeToRemoveMode = (index) => {
		this.setState({
			removeIndex:index
		})
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1
		})
	}
	
	render() {
		let items = this.props.list.map((item,index) => {
			return (
				<Row key={item.id} item={item}
					index={index} changeToRemoveMode={this.changeToRemoveMode}/>
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
import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class ShoppingList extends React.Component {
	
	render() {
		let items = this.props.list.map(item => {
			return (
				<Table.Row key={item.id}>
					<Table.Cell>{item.type}</Table.Cell>
					<Table.Cell>{item.count}</Table.Cell>
					<Table.Cell>{item.price}</Table.Cell>
					<Table.Cell><Button color="red">Remove</Button></Table.Cell>
					<Table.Cell><Button color="lightblue">Edit</Button></Table.Cell>
				</Table.Row>
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
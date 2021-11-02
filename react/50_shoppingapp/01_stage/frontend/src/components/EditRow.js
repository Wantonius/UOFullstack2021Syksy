import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditRow extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			type:props.item.type,
			count:props.item.count,
			price:props.item.price
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		let item = {
			...this.state,
			id:this.props.item.id
		}
		this.props.editItem(item);
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>
					<input type="text"
							name="type"
							onChange={this.onChange}
							value={this.state.type}/>
				</Table.Cell>
				<Table.Cell>
					<input type="number"
							name="count"
							onChange={this.onChange}
							value={this.state.count}/>
				</Table.Cell>
				<Table.Cell>
					<input type="number"
							name="price"
							step="0.01"
							onChange={this.onChange}
							value={this.state.price}/>
				</Table.Cell>
				<Table.Cell><Button color="green"
					onClick={this.onSubmit}
					>Save</Button></Table.Cell>
				<Table.Cell><Button color="red"
					onClick={() => this.props.cancel()}
					>Cancel</Button></Table.Cell>
			</Table.Row>
				)
	}
}
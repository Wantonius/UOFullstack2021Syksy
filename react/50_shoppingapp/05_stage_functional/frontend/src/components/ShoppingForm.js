import {useState} from 'react';
import {Form,Button} from 'semantic-ui-react';
import useAction from '../statemanager/useaction';

const ShoppingForm = (props) => {
	
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
	})
	
	const {addItem} = useAction();
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			...this.state
		}
		this.props.addToList(item);
		this.setState({
			type:"",
			count:0,
			price:0	
		})
	}
	
	render() {
		return(
		<div style={{
			width:500,
			margin:"auto",
			backgroundColor:"lightgreen"
		}}>
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="type">Item Type</label>
					<input type="text"
							name="type"
							onChange={this.onChange}
							value={this.state.type}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="count">Count</label>
					<input type="number"
							name="count"
							onChange={this.onChange}
							value={this.state.count}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="price">Price</label>
					<input type="number"
							name="price"
							step="0.01"
							onChange={this.onChange}
							value={this.state.price}/>
				</Form.Field>
				<Button type="submit">Add</Button>
			</Form>
		</div>
		)
		
	}
}
import {useState} from 'react';

const ShoppingForm = (props) => {
	
	const [item,setItem] = useState({
		type:"",
		count:0,
		price:0
	})
	
	const onChange = (event) => {
		setItem({
			...item,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		props.addToList(item);
		setItem({
			type:"",
			count:0,
			price:0
		})
	}
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="type">Type</label>
			<input type="text"
					name="type"
					onChange={onChange}
					value={item.type}/>
			<br/>
			<label htmlFor="count">Count</label>
			<input type="number"
					name="count"
					onChange={onChange}
					value={item.count}/>
			<br/>
			<label htmlFor="price">Price</label>
			<input type="number"
					name="price"
					onChange={onChange}
					value={item.price}/>
			<br/>
			<input type="submit" value="Add"/>
		</form>
	)
}

export default ShoppingForm;
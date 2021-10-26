import React from 'react';
import Square from './Square';
import Label from './Label';

export default class Card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			color:"red"
		}
	}
	
	onColorChange = () => {
		const letters = "ABCDEF0123456789";
		let color = "#";
		for(let i=0;i<6;i++) {
			let temp = Math.floor(Math.random()*16);
			color = color + letters[temp];
		}
		this.setState({
			color:color
		})
	}
	
	render() {
		let cardStyle= {
			height:200,
			width:150,
			backgroundColor:"#FFF",
			Webkitfilter:"drop-shadow(0px 0px 5px #6666)",
			filter:"drop-shadow(0px 0px 5px #6666)"
		}
		return(
			<div style={cardStyle}>
				<Square color={this.state.color}/>
				<Label color={this.state.color} onColorChange={this.onColorChange}/>
			</div>
		)
	}
}
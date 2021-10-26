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
				<Label color={this.state.color}/>
			</div>
		)
	}
}
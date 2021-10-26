import React from 'react';

export default class StatefulComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			seconds:0,
			timerid:0
		}
	}
	
	componentDidMount() {
		console.log("Stateful Component - ComponentDidMount");
		let tempid = setInterval(this.startTimer,1000);
		this.setState({
			timerid:tempid
		}) 
	}
	
	componentWillUnmount() {
		clearInterval(this.state.timerid);
	}
	
	startTimer = () => {
		this.setState((state) => {
				return {
					seconds:state.seconds+1
				}
		})
	}
	
	render() {
		return (
			<h3>Seconds since page loaded:{this.state.seconds}</h3>
		)
	}
}
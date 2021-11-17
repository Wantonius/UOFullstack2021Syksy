import React from 'react';

const Decorator = (Component) => {
	return class ColorHoc extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				color:"red"
			}
		}
		
		onChange = (event) => {
			this.setState({
				 [event.target.name]:event.target.value
			})
		}
		render() {
			return(
				<div>
					<Component {...this.props} color={this.state.color}/>
					<input type="text"
							name="color"
							value={this.state.color}
							onChange={this.onChange}/>
				</div>
			)
		}
	}
}

export default Decorator;
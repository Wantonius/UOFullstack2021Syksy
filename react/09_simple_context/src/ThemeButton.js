import React from 'react';
import {ThemeContext} from './ThemeContext';

export default class ThemeButton extends React.Component {
	
	render() {
		return(
			<ThemeContext.Consumer>
			{value => <button style={{
				color:value.textcolor,
				backgroundColor:value.background
			}} onClick={this.props.toggleTheme}>Toggle Theme</button>
			}
			</ThemeContext.Consumer>	
			)
	}
}
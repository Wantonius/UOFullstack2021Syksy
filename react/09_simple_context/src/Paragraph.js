import React from 'react';
import {ThemeContext} from './ThemeContext';

export default class Paragraph extends React.Component {
	
	render() {
		return(
			<ThemeContext.Consumer>
			{value => <p style={{
				color:value.textcolor,
				backgroundColor:value.background
			}}>{this.props.children}</p>
			}
			</ThemeContext.Consumer>	
			)
	}
}
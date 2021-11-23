import React from 'react';
import {ThemeContext} from './ThemeContext';

export default class Headline extends React.Component {
	
	render() {
		return(
			<ThemeContext.Consumer>
			{value => <h1 style={{
				color:value.textcolor,
				backgroundColor:value.background
			}}>{this.props.children}</h1>
			}
			</ThemeContext.Consumer>	
			)
	}
}
import React from 'react';
import './App.css';
import {ThemeContext,themes} from './ThemeContext';
import Headline from './Headline';
import Paragraph from './Paragraph';
import ThemeButton from './ThemeButton';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			theme:themes.dark
		}
	}
	
	toggleTheme = () => {
		if(this.state.theme === themes.dark) {
			this.setState({
				theme:themes.light
			})
		} else {
			this.setState({
				theme:themes.dark
			})			
		}
	}
	render() {
	  return (
	  <ThemeContext.Provider value={this.state.theme}>
		<div className="App">
			<Headline>Context</Headline>
			<Paragraph>Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.</Paragraph>
			<ThemeButton toggleTheme={this.toggleTheme}/>
		</div>
	  </ThemeContext.Provider>
	  );
	}
}

export default App;

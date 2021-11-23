import React from 'react';

export const themes = {
	light: {
		textcolor:"#000000",
		background:"#d3d3d3"
	},
	dark: {
		textcolor:"#ffffff",
		background:"#595959"
	}
}

export const ThemeContext = React.createContext(themes.dark);

ThemeContext.displayName = "ThemeContext";
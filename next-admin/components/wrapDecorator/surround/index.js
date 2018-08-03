// 边框容器
/**
* props= {
		theme:string, //red和blue
		title:string
	}
**/
import React from 'react';

import './index.css';

let theme = {
	default: {
		backgroundColor: '#e02222',
		borderColor: ' #ef8476'
	},
	red: {
		backgroundColor: '#e02222',
		borderColor: ' #ef8476'
	},
	blue: {
		backgroundColor: '#4B8DF8',
		borderColor: '#4b8df8'
	}
}

class Surround extends React.Component {
	render () {
		//定义样式
		let themeTemp = this.props.theme;
		let title = this.props.title || 'Default Title';
		let theTheme = (themeTemp && theme[themeTemp] ) || theme.default;
		let headStyle = {
			backgroundColor: theTheme.backgroundColor
		}
		let borderColorStyle = {
			border: `1px solid ${ theTheme.borderColor }`
		}
		return (
			<div className="surround-content" style={ borderColorStyle }>
        		<div className="surround-head" style={ headStyle }>
        			<p className="surround-title">{ title }</p>
        		</div>
	        	<div className="surround-context">
        			{ this.props.children }
        		</div>
        	</div>
		);
	}
}

export default Surround;
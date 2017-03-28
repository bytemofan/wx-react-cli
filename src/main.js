import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { AppContainer } from 'react-hot-loader'; //HMR功能必须的组件

const isDev = !(process.env.NODE_ENV === 'development');

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	);
}

render(App);

if ( isDev ) {
	if( window.devToolsExtension ) {
		window.devToolsExtension.open();
	}
	if( module.hot ) {
		module.hot.accept('./components/App',() => { render(App) })
	}
}

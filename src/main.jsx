import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // HMR功能必须的组件

import App from './components/App';

const isDev = !(process.env.NODE_ENV === 'dev');

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app'),
	);
};

render(App);

if (isDev) {
	if (window.devToolsExtension) {
		window.devToolsExtension.open();
	}
	if (module.hot) {
		module.hot.accept('./components/App', () => { render(App); });
	}
}

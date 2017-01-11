import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { router } from './router';
import logger from 'js-logger';
import './localizer';

// Initialize logging
logger.useDefaults();

// render the main component
ReactDOM.render(
	<Provider store={store}>
		{router}
	</Provider>,
	document.getElementById('app')
);

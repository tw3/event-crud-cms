import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './store.js';
import App from './components/App.js';
import Home from './components/Home';
import ScheduledEventEdit from './components/ScheduledEventEdit';
import NotFound from './components/NotFound';

// build the router
const router = (
	<Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="event-edit(/:id)" component={ScheduledEventEdit} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
);

// export
export { router };

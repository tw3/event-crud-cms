import React from 'react';
import ScheduledEventList from './common/ScheduledEventList';

// Home page component
export default class Home extends React.Component {
	// render
	render() {
		return (
			<div className="page-home">
				<ScheduledEventList />
			</div>
		);
	}
}

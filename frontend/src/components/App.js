import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import Menu from './common/Menu';
import '../stylesheets/main.scss';

// App component
export class App extends React.Component {
	// pre-render logic
	componentWillMount() {
		// the first time we load the app, we need the events list
		this.props.dispatch({ type: 'EVENTS_FETCH_LIST' });
	}

	// render
	render() {
		// show the loading state while we wait for the app to load
		const { scheduledEvents, children } = this.props;
		const bIsFetching = (scheduledEvents === null);

		if (bIsFetching) {
			return (
				<ProgressBar active now={100} />
			);
		}

		// render
		return (
			<div className="container">
				<div>
					<Menu />
				</div>
				<div>
					{children}
				</div>
				<div className="footer">
					<img src="/media/logo.svg" alt="Events CRUD CMS" />
					<span>Events CRUD CMS</span>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	scheduledEvents: PropTypes.array,
	children: PropTypes.node,
};

// export the connected class
function mapStateToProps(state) {
	return {
		scheduledEvents: state.scheduledEvents,
	};
}

export default connect(mapStateToProps)(App);

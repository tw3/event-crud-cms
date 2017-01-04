import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Table, Pagination } from 'react-bootstrap';
import ScheduledEventListElement from './ScheduledEventListElement';
import ScheduledEventDeletePrompt from './ScheduledEventDeletePrompt';

// Event list component
export class ScheduledEventList extends React.Component {
	// constructor
	constructor(props) {
		super(props);

		// default ui local state
		this.state = {
			bDeleteShow: false,
			deleteEvent: {},
		};

		// bind <this> to the event method
		this.changePage = this.changePage.bind(this);
		this.showDelete = this.showDelete.bind(this);
		this.hideDelete = this.hideDelete.bind(this);
		this.scheduledEventDelete = this.scheduledEventDelete.bind(this);
	}

	// render
	render() {
		// pagination
		const { scheduledEvents, page } = this.props;
		const perPage = 10;
		const pages = Math.ceil(scheduledEvents.length / perPage);
		const startOffset = (page - 1) * perPage;
		let startCount = 0;

		// show the list of events
		// TODO create custom view rather than ugly table view
		return (
			<div>
				<Table bordered hover responsive striped>
					<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Start Date/Time</th>
						<th>End Date/Time</th>
						<th>Category</th>
						<th>Featured</th>
						<th>Delete</th>
					</tr>
					</thead>
					<tbody>
					{scheduledEvents.map((scheduledEvent, index) => {
						if (index >= startOffset && startCount < perPage) {
							startCount++;
							return (
								<ScheduledEventListElement
									key={index} scheduledEvent={scheduledEvent}
									showDelete={this.showDelete} />
							);
						}
					})}
					</tbody>
				</Table>

				<Pagination className="events-pagination pull-right" bsSize="medium" maxButtons={10}
										first last next prev boundaryLinks items={pages} activePage={page}
										onSelect={this.changePage} />

				<ScheduledEventDeletePrompt
					show={this.state.bDeleteShow} scheduledEvent={this.state.deleteEvent}
					hideDelete={this.hideDelete} scheduledEventDelete={this.scheduledEventDelete} />
			</div>
		);
	}

	// change the event lists' current page
	changePage(page) {
		this.props.dispatch(push('/?page=' + page));
	}

	// show the delete event prompt
	showDelete(scheduledEvent) {
		// change the local ui state
		this.setState({
			bDeleteShow: true,
			deleteEvent: scheduledEvent,
		});
	}

	// hide the delete event prompt
	hideDelete() {
		// change the local ui state
		this.setState({
			bDeleteShow: false,
			deleteEvent: {},
		});
	}

	// delete the event
	scheduledEventDelete() {
		// delete the event
		this.props.dispatch({
			type: 'EVENTS_DELETE',
			eventId: this.state.deleteEvent.id,
		});

		// hide the prompt
		this.hideDelete();
	}
}

// export the connected class
function mapStateToProps(state) {
	return {
		scheduledEvents: state.scheduledEvents,

		// https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
		// react-router-redux wants you to get the url data by passing the props through
		// a million components instead of reading it directly from the state, which is basically
		// why you store the url data in the state (to have access to it)
		page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
	};
}

export default connect(mapStateToProps)(ScheduledEventList);

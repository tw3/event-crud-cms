import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Field, SubmissionError, reduxForm } from 'redux-form';
import { PageHeader, Form } from 'react-bootstrap';
import FormField from './common/FormField';
import FormSubmit from './common/FormSubmit';
import { DateTimeFormatter } from './common/DateTimeField';
import validate from '../util/ScheduleEventEditValidate';
import 'react-widgets/lib/less/react-widgets.less';

// ScheduledEvent add/edit page component
export class ScheduledEventEdit extends React.Component {
	// constructor
	constructor(props) {
		super(props);

		// bind <this> to the event method
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// submit the form
	handleSubmit(values) {
		const { dispatch } = this.props;
		return new Promise((resolve, reject) => {
			// The DateTimePicker from react-widgets is really cool but it really bugs me that require
			// a Date object as input but then set a string value when the value is changed
			const scheduledEvent = { ...values };
			scheduledEvent.id = scheduledEvent.id || 0;
			dispatch({
				type: 'EVENTS_ADD_EDIT',
				scheduledEvent,

				callbackError: error => reject(new SubmissionError({ _error: error })),

				callbackSuccess: () => {
					dispatch(push('/'));
					resolve();
				},
			});
		});
	}

	// render
	render() {
		const { scheduledEvent, handleSubmit, error, invalid, submitting } = this.props;
		const bIsEdit = (scheduledEvent.id != null);
		let c1;
		let c2;

		if (bIsEdit) {
			c1 = (
				<Field
					component={FormField} name="created_at" label="Created" type="datetime"
					readonly
				/>
			);
			c2 = (
				<Field
					component={FormField} name="updated_at" label="Last Updated" type="datetime"
					readonly
				/>);
		}

		return (
			<div className="page-event-edit">
				<PageHeader>{bIsEdit ? 'Edit Event' : 'Add Event'}</PageHeader>
				<Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
					<Field
						component={FormField} name="title" label="Title"
						doValidate bAlwaysValidate={bIsEdit}
					/>
					<Field
						component={FormField} name="start_dt" label="Start Date/Time" type="datetime"
						normalize={value => DateTimeFormatter.normalize(value)}
						doValidate
					/>
					<Field
						component={FormField} name="end_dt" label="End Date/Time" type="datetime"
						normalize={value => DateTimeFormatter.normalize(value)}
						doValidate
					/>
					<Field
						component={FormField} name="category" label="Category"
						doValidate bAlwaysValidate={bIsEdit}
					/>
					<Field
						component={FormField} name="description" label="Description" componentClass="textarea"
						doValidate bAlwaysValidate={bIsEdit}
					/>
					<Field component={FormField} name="featured_bl" label="Featured" type="checkbox" />
					{c1}
					{c2}
					<FormSubmit
						error={error} invalid={invalid} submitting={submitting}
						buttonSaveLoading="Saving..." buttonSave="Save Event"
					/>
				</Form>
			</div>
		);
	}
}

ScheduledEventEdit.propTypes = {
	dispatch: PropTypes.func.isRequired,
	scheduledEvent: PropTypes.object,
	handleSubmit: PropTypes.func,
	error: PropTypes.string,  // redux-form general `_error` message
	invalid: PropTypes.bool,  // redux-form invalid prop
	submitting: PropTypes.bool,   // redux-form invalid submitting
};

// decorate the form component
const ScheduledEventEditForm = reduxForm({
	form: 'event-edit',
	validate,
})(ScheduledEventEdit);

// export the connected class
function mapStateToProps(state, ownProps) {
	let scheduledEvent = state.scheduledEvents.find(x => Number(x.id) === Number(ownProps.params.id));

	if (scheduledEvent == null) { // add page...need to setup initial dates
		// Start with a date/time at the next hour
		const startDate = new Date();
		startDate.setHours(startDate.getHours() + Math.round(startDate.getMinutes() / 60));
		startDate.setMinutes(0);
		const endDate = new Date(startDate.getTime());
		endDate.setHours(endDate.getHours() + 1); // an hour after the start date
		scheduledEvent = {
			title: '',
			start_dt: startDate,
			end_dt: endDate,
			category: '',
			description: '',
		};
	}

	return {
		scheduledEvent,
		initialValues: scheduledEvent,
	};
}

export default connect(mapStateToProps)(ScheduledEventEditForm);

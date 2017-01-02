import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { PageHeader, Form } from "react-bootstrap";
import FormField from "./common/FormField";
import FormSubmit from "./common/FormSubmit";

// ScheduledEvent add/edit page component
export class ScheduledEventEdit extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    // bind <this> to the event method
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // render
  render() {
    const {scheduledEvent, handleSubmit, error, invalid, submitting} = this.props;
    return (
      <div className="page-event-edit">
        <PageHeader>{'Event ' + (scheduledEvent.id ? 'edit' : 'add')}</PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.handleSubmit)}>
          <Field component={FormField} name="title" label="Title" doValidate={true}/>
          <Field component={FormField} name="start_dt" label="Start Date/Time"/>
					<Field component={FormField} name="end_dt" label="End Date/Time"/>
					<Field component={FormField} name="category" label="Category"/>
					<Field component={FormField} name="description" label="Description"/>
					<Field component={FormField} name="featured_bl" label="Featured"/>
          <FormSubmit
						error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="Saving..."
            buttonSave="Save Event"/>
					{ /* <FormSubmit buttonSave="Cancel"/> */ }
        </Form>
      </div>
    );
  }

  // submit the form
  handleSubmit(values) {
    const {dispatch} = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'EVENTS_ADD_EDIT',
        scheduledEvent: {
          id: values.id || 0,
          title: values.title,
					start_dt: values.start_dt,
					end_dt: values.end_dt,
					category: values.category,
					description: values.description,
					featured_bl: values.featured_bl
        },
        callbackError: (error) => {
          reject(new SubmissionError({_error: error}));
        },
        callbackSuccess: () => {
          dispatch(push('/'));
          resolve();
        }
      });
    });
  }
}

// decorate the form component
const ScheduledEventEditForm = reduxForm({
  form: 'event-edit',
  validate: function (values) { // TODO validate all form fields
    const errors = {};
    if (!values.title) {
      errors.title = 'Title is required';
    }
    return errors;
  },
})(ScheduledEventEdit);

// export the connected class
function mapStateToProps(state, own_props) {
  const scheduledEvent = state.scheduledEvents.find(x => Number(x.id) === Number(own_props.params.id)) || {};
  return {
    scheduledEvent: scheduledEvent,
    initialValues: scheduledEvent,
  };
}
export default connect(mapStateToProps)(ScheduledEventEditForm);

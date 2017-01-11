import React, { PropTypes } from 'react';
import { FormGroup, HelpBlock, Button } from 'react-bootstrap';

// Form submit component
const FormSubmit = (props) => {
	const { error, invalid, submitting } = props;
	let { buttonSaveLoading, buttonSave } = props;
	buttonSaveLoading = buttonSaveLoading || 'Saving...';
	buttonSave = buttonSave || 'Save';
	return (
		<div>
			{error && <FormGroup validationState="error">
				<HelpBlock>{error}</HelpBlock>
			</FormGroup>}

			<FormGroup className="submit">
				<Button type="submit" bsStyle="primary" disabled={invalid || submitting}>
					{submitting ? buttonSaveLoading : buttonSave}
				</Button>
			</FormGroup>
		</div>
	);
};

// prop checks
FormSubmit.propTypes = {
	error: PropTypes.string,  // redux-form general `_error` message
	invalid: PropTypes.bool,  // redux-form invalid prop
	submitting: PropTypes.bool,   // redux-form invalid submitting
	buttonSaveLoading: PropTypes.string, // save button loading text, default is "Saving..."
	buttonSave: PropTypes.string,    // save button text, default is "Save"
};

export default FormSubmit;

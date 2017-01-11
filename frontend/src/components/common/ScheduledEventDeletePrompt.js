import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

// Event delete component
const ScheduledEventDeletePrompt = (props) => {
	const { show, scheduledEvent, hideDelete, scheduledEventDelete } = props;
	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>
					Are you sure you want to delete <strong>{scheduledEvent.title}</strong>?
				</Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Button onClick={hideDelete}>No</Button>
				<Button bsStyle="primary" onClick={scheduledEventDelete}>Yes</Button>
			</Modal.Footer>
		</Modal>
	);
};

// prop checks
ScheduledEventDeletePrompt.propTypes = {
	show: PropTypes.bool.isRequired,
	scheduledEvent: PropTypes.object.isRequired,
	hideDelete: PropTypes.func.isRequired,
	scheduledEventDelete: PropTypes.func.isRequired,
};

export default ScheduledEventDeletePrompt;

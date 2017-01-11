import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import { DateTimeFormatter } from './DateTimeField';

// Event List Element component
const ScheduledEventListElement = (props) => {
	const { scheduledEvent, showDelete } = props;
	return (
		<tr>
			<td>{scheduledEvent.id}</td>
			<td><Link to={`event-edit/${scheduledEvent.id}`}>{scheduledEvent.title}</Link></td>
			<td>{DateTimeFormatter.format(scheduledEvent.start_dt)}</td>
			<td>{DateTimeFormatter.format(scheduledEvent.end_dt)}</td>
			<td>{scheduledEvent.category}</td>
			<td>{scheduledEvent.featured_bl ? 'true' : 'false'}</td>
			<td>
				<Button bsSize="xsmall" className="event-delete" onClick={() => showDelete(scheduledEvent)}>
					Delete <Glyphicon glyph="trash" />
				</Button>
			</td>
		</tr>
	);
};

// prop checks
ScheduledEventListElement.propTypes = {
	scheduledEvent: PropTypes.object.isRequired,
	showDelete: PropTypes.func.isRequired,
};

export default ScheduledEventListElement;

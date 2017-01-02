import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Button, Glyphicon } from "react-bootstrap";
import moment from "moment";

// Event List Element component
export default class ScheduledEventListElement extends React.Component {
  // render
  render() {
    const {scheduledEvent, showDelete} = this.props;
    return (
      <tr>
        <td>{scheduledEvent.id}</td>
        <td><Link to={'event-edit/' + scheduledEvent.id}>{scheduledEvent.title}</Link></td>
        <td>{moment(new Date(scheduledEvent.start_dt)).format("MM/DD/YY hh:mm:ssa")}</td>
				<td>{moment(new Date(scheduledEvent.end_dt)).format("MM/DD/YY hh:mm:ssa")}</td>
				<td>{scheduledEvent.category}</td>
				<td>{scheduledEvent.description}</td>
				<td>{scheduledEvent.featured_bl.toString()}</td>
        <td>
          <Button bsSize="xsmall" className="event-delete" onClick={() => showDelete(scheduledEvent)}>
            Delete <Glyphicon glyph="remove-circle" />
          </Button>
        </td>
      </tr>
    );
  }
}

// prop checks
ScheduledEventListElement.propTypes = {
  scheduledEvent: PropTypes.object.isRequired,
  showDelete: PropTypes.func.isRequired,
}

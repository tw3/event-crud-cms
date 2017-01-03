import React from 'react';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';

const dateTimeFormat = "MM/DD/YY hh:mma";

export class DateTimeFormatter {
	static format(val) {
		return Moment(val).format(dateTimeFormat)
	}
}

export class DateTimeField extends React.Component {
	render() {
		const {input, componentClass, type, readonly, placeholder, children} = this.props;
		if (readonly) {
			// Show date/time text
			return (
				<div>
					{DateTimeFormatter.format(input.value)}
				</div>
			);
		} else {
			// Construct params for DateTimePicker...set value as defaultValue and remove value property
			const newProps = {...input};
			newProps.defaultValue = newProps.value;
			delete newProps.value;
			//debugger;
			return (
				<DateTimePicker format={dateTimeFormat} {...newProps} />
			);
		}
	}
}

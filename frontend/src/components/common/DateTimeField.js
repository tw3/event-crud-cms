import React, { PropTypes } from 'react';
import { DateTimePicker } from 'react-widgets';
import moment from 'moment';

export const timeFormat = 'h:mm a';
export const dateTimeFormat = `M/D/YY ${timeFormat}`;

export class DateTimeFormatter {
	static format(val) {
		return moment(val).format(dateTimeFormat);
	}

	static formatUTC(utcVal) {
		return moment.utc(utcVal).format(dateTimeFormat);
	}

	static getUTC(val) {
		return +moment(val, dateTimeFormat).utc();
	}

	static normalize(date) {
		if (typeof date === 'string') {
			// need to convert to date object
			date = moment(date, dateTimeFormat).toDate();
		}

		return date;
	}
}

export const DateTimeField = (props) => {
	const { input } = props;
	if (props.readonly) {
		// Show date/time text
		return (
			<div>
				{DateTimeFormatter.format(input.value)}
			</div>
		);
	}

	// Construct params for DateTimePicker
	const newProps = { ...input };

	// Set value as defaultValue and remove value property
	newProps.defaultValue = newProps.value;
	delete newProps.value;

	// Send only the date object when the date changes
	newProps.onChange = newDate => input.onChange(newDate);

	return (
		<DateTimePicker format={dateTimeFormat} timeFormat={timeFormat} {...newProps} />
	);
};

DateTimeField.propTypes = {
	input: PropTypes.object.isRequired,
	readonly: PropTypes.bool,
};

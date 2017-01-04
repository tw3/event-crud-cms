import React from 'react';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';

export const timeFormat = "h:mm a";
export const dateTimeFormat = "M/D/YY " + timeFormat;

export class DateTimeFormatter {
	static format(val) {
		return Moment(val).format(dateTimeFormat)
	}
	static formatUTC(utc) {
		return Moment.utc(val).format(dateTimeFormat)
	}
	static getUTC(val) {
		return +Moment(val, dateTimeFormat).utc();
	}
	static normalize(date) {
		if (typeof date === "string") {
			// need to convert to date object
			date = Moment(date, dateTimeFormat).toDate()
		}
		return date;
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
			// Construct params for DateTimePicker
			const newProps = {...input};
			// Set value as defaultValue and remove value property
			newProps.defaultValue = newProps.value;
			delete newProps.value;
			// Send only the date object when the date changes
			newProps.onChange = (newDate, newDateStr) => {
				input.onChange(newDate);
			};
			return (
				<DateTimePicker format={dateTimeFormat} timeFormat={timeFormat} {...newProps} />
			);
		}
	}
}

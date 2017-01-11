import validate from 'validate.js';
import { DateTimeFormatter } from '../components/common/DateTimeField';

validate.extend(validate.validators.datetime, {
	parse: DateTimeFormatter.getUTC,
	format: DateTimeFormatter.formatUTC,
});

export default values => {
	const errors = validate(values, {
		title: {
			presence: true, // required
			length: { // must be between 5 and 20 characters long
				minimum: 5,
				maximum: 40,
			},
			format: {
				// only allow safe characters, must start with a letter
				pattern: /^[a-zA-Z\u00C0-\u02AF][a-zA-Z\u00C0-\u02AF0-9\.-_ "']+$/,
				message: 'must start with a letter and can only contain safe characters',
			},
		},
		start_dt: {
			presence: true, // required
			datetime: true,
		},
		end_dt: {
			presence: true, // required
			datetime: true,
		},
		category: {
			presence: true, // required
			length: { // must be between 5 and 20 characters long
				minimum: 5,
				maximum: 20,
			},
			format: {
				// only allow safe characters, must start with a letter
				pattern: /^[a-zA-Z\u00C0-\u02AF][a-zA-Z\u00C0-\u02AF0-9\.-_ "']+$/,
				message: 'must start with a letter and can only contain safe characters',
			},
		},
		description: {
			format: {
				pattern: /^[^><]*$/, // only allow safe characters, must start with a letter
				message: 'cannot contain angle brackets',
			},
		},
	});

	if (values.start_dt >= values.end_dt) {
		if (errors.start_dt == null) errors.start_dt = [];
		errors.start_dt.push('Start Date/Time must occur before the Start Date/Time');
		if (errors.end_dt == null) errors.end_dt = [];
		errors.end_dt.push('End Date/Time must occur after the Start Date/Time');
	}

	// only show one error at a time
	if (errors != null) {
		Object.keys(errors).forEach((key) => {
			const val = errors[key];
			if (Array.isArray(val)) errors[key] = val[0];
		});
	}

	return errors;
};

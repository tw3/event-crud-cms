import validate from "validate.js";
import { DateTimeFormatter } from "../components/common/DateTimeField";

validate.extend(validate.validators.datetime, {
	parse: DateTimeFormatter.getUTC,
	format: DateTimeFormatter.formatUTC
});

export default (values) => {
	const results = validate(values, {
		title: {
			presence: true, // required
			length: { // must be between 5 and 20 characters long
				minimum: 5,
				maximum: 40
			},
			format: {
				pattern: /^[a-zA-Z][a-zA-Z0-9\.-_ \"']+$/, // only allow safe characters, must start with a letter
				message: "must start with a letter and can only contain safe characters"
			}
		},
		start_dt: {
			presence: true, // required
			datetime: true
		},
		end_dt: {
			presence: true, // required
			datetime: true
		},
		category: {
			presence: true, // required
			length: { // must be between 5 and 20 characters long
				minimum: 5,
				maximum: 20
			},
			format: {
				pattern: /^[a-zA-Z][a-zA-Z0-9\.-_ \"']+$/, // only allow safe characters, must start with a letter
				message: "must start with a letter and can only contain safe characters"
			},
		},
		description: {
			format: {
				pattern: /^[^><]*$/, // only allow safe characters, must start with a letter
				message: "cannot contain angle brackets"
			}
		}
	});
	// only show one error at a time
	for (let key in results) {
		if (results.hasOwnProperty(key)) {
			const val = results[key];
			if (Array.isArray(val)) results[key] = val[0];
		}
	}
	return results;
};

import React, { PropTypes } from "react";
import { FormGroup, FormControl, Checkbox, HelpBlock, Row, Col } from "react-bootstrap";
import { DateTimeField } from "./DateTimeField";

// Form field component
export default class FormField extends React.Component {
	// render
	render() {
		const { input, className, doValidate, meta, bAlwaysValidate } = this.props;
		if (doValidate) {
			const bConsiderValidation = ((bAlwaysValidate && meta.error) || meta.touched);
			const validationState = bConsiderValidation ? (meta.error ? 'error' : 'success') : null;
			return (
				<div id={"ff-"+(input ? input.name : "foobar")}>
					<FormGroup className={className}
										 validationState={ validationState }>
						{this.content()}
						<FormControl.Feedback />
						<Row>
							<Col sm={3} />
							<Col sm={9}>
								<HelpBlock>
									{bConsiderValidation ? meta.error : null}
								</HelpBlock>
							</Col>
						</Row>
					</FormGroup>
				</div>
			);
		} else {
			return (
				<FormGroup className={className}>
					{this.content()}
				</FormGroup>
			);
		}
	}

	// the field content
	content() {
		const {theme, label} = this.props;
		if ('other_theme' === theme) {
			// layout for some other theme
		} else {
			// default theme: 2col
			return (
				<Row>
					<Col sm={3}>{label}</Col>
					<Col sm={9}>{this.field()}</Col>
				</Row>
			);
		}
	}

	// the field itself
	field() {
		const {input, componentClass, type, readonly, placeholder, children} = this.props;
		if (type === "checkbox") {
			return (
				<Checkbox {...input} >
					{children}
				</Checkbox>
			);
		} else if (type === "datetime") {
			return (
				<DateTimeField {...this.props} />
			);
		} else {
			return (
				<FormControl {...input} componentClass={componentClass} type={type} placeholder={placeholder}>
					{children}
				</FormControl>
			);
		}
	}
}

// prop checks
FormField.propTypes = {
	meta: PropTypes.object,
	input: PropTypes.object,
	theme: PropTypes.string,  // 2col (default), etc
	doValidate: PropTypes.bool, // true or false
	label: PropTypes.any,  // the field text or a react component if we have html inside (empty string by default)
	componentClass: PropTypes.string, // input (by default), textarea, select
	type: PropTypes.string,   // input type: text (by default), password
	readonly: PropTypes.bool, // render as normal text if true, otherwise render component
	placeholder: PropTypes.string,    // input placeholder (empty string by default)
	className: PropTypes.string,  // the class name (empty string by default),
	bAlwaysValidate: PropTypes.bool  // true to always show the validations status, false to show after touched
};

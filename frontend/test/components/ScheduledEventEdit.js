import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { ScheduledEventEdit } from '../../src/components/ScheduledEventEdit';

// unit tests for the ScheduledEventEdit component
describe('ScheduledEventEdit component', () => {
	describe('render()', () => {
		it('should render the add event form', () => {
			const props = {
				scheduledEvent: {},
				handleSubmit: () => {},
			};
			const wrapper = shallow(<ScheduledEventEdit {...props} />);
			assert.equal(wrapper.length, 1);
		});
	});
});

import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { ScheduledEventList } from '../../src/components/common/ScheduledEventList';

// unit tests for the ScheduledEventList component
describe('ScheduledEventList component', () => {
	describe('render()', () => {
		it('should render the progressbar', () => {
			const props = {
				scheduledEvents: [],
			};
			const wrapper = shallow(<ScheduledEventList {...props} />);
			assert.equal(wrapper.length, 1);
		});
	});
});

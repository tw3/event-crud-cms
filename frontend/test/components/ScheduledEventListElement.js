import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ScheduledEventListElement from '../../src/components/common/ScheduledEventListElement';

// unit tests for the ScheduledEventListElement component
describe('ScheduledEventListElement component', () => {
	describe('render()', () => {
		it('should render the component', () => {
			const props = {
				scheduledEvent: {},
				showDelete: () => {},
			};
			const wrapper = shallow(<ScheduledEventListElement {...props} />);
			assert.equal(wrapper.length, 1);
		});
	});
});

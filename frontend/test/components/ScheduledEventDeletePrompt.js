import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ScheduledEventDeletePrompt from '../../src/components/common/ScheduledEventDeletePrompt';

// unit tests for the ScheduledEventDeletePrompt component
describe('ScheduledEventDeletePrompt component', () => {
	describe('render()', () => {
		it('should render the component', () => {
			const props = {
				show: true,
				scheduledEvent: {},
				hideDelete: () => {},
				scheduledEventDelete: () => {},
			};
			const wrapper = shallow(<ScheduledEventDeletePrompt {...props} />);
			assert.equal(wrapper.length, 1);
		});
	});
});

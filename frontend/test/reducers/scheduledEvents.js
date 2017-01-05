import assert from 'assert';
import scheduledEvents from '../../src/reducers/scheduledEvents';

// unit tests for the events reducers
// mocha - http://mochajs.org/#getting-started
// assert - https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message

const someEvent1 = {
	id: 1,
	title: 'Some title',
	start_dt: new Date('January 5, 2017 11:00:00'),
	end_dt: new Date('January 5, 2017 12:0:00'),
	category: 'Some category',
	description: 'Some category',
	featured_bl: 'true',
	created_at: new Date('January 1, 2017 13:00:00'),
	updated_at: new Date('January 1, 2017 14:00:00'),
};

const otherEvent2 = {
	id: 2,
	title: 'Other title',
	start_dt: new Date('February 10, 2017 11:00:00'),
	end_dt: new Date('February 10, 2017 12:0:00'),
	category: 'Other category',
	description: 'Other category',
	featured_bl: 'false',
	created_at: new Date('February 1, 2017 13:00:00'),
	updated_at: new Date('February 1, 2017 14:00:00'),
};

function shallowClone(obj) {
	return Object.assign({}, obj);
}

describe('ScheduledEvents reducer', () => {
	describe('EVENTS_LIST_SAVE', () => {
		it('should return a list of events', () => {
			assert.deepEqual(
				scheduledEvents({}, {
					type: 'EVENTS_LIST_SAVE',
					scheduledEvents: [
						shallowClone(someEvent1),
					],
				}), [shallowClone(someEvent1)]
			);
		});
	});

	describe('EVENTS_ADD_SAVE', () => {
		it('should return a new event array element', () => {
			assert.deepEqual(
				scheduledEvents({}, {
					type: 'EVENTS_ADD_SAVE',
					scheduledEvents: [shallowClone(someEvent1), shallowClone(otherEvent2)],
				}), [shallowClone(someEvent1), shallowClone(otherEvent2)]
			);
		});
	});

	describe('EVENTS_EDIT_SAVE', () => {
		it('should return an edited event array element', () => {
			assert.deepEqual(
				scheduledEvents({}, {
					type: 'EVENTS_EDIT_SAVE',
					scheduledEvents: [shallowClone(someEvent1), shallowClone(otherEvent2)],
				}), [shallowClone(someEvent1), shallowClone(otherEvent2)]
			);
		});
	});

	describe('EVENTS_DELETE_SAVE', () => {
		it('should return the event array without the deleted element', () => {
			assert.deepEqual(
				scheduledEvents([shallowClone(someEvent1), shallowClone(otherEvent2)], {
					type: 'EVENTS_DELETE_SAVE',
					eventId: 2,
				}), [shallowClone(someEvent1)]
			);
		});
	});
});

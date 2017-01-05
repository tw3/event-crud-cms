import { call, put } from 'redux-saga/effects';
import assert from 'assert';
import { scheduledEventsFetchList, scheduledEventsAddEdit, scheduledEventsDelete }
	from '../../src/sagas/scheduledEvents';
import ApiScheduledEvents from '../../src/api/scheduledEvents';

// unit tests for the events saga
describe('ScheduledEvents saga', () => {
	describe('scheduledEventsFetchList()', () => {
		const generator = scheduledEventsFetchList();

		it('should return the ApiScheduledEvents.getList call', () => {
			assert.deepEqual(generator.next().value, call(ApiScheduledEvents.getList));
		});

		it('should return the EVENTS_LIST_SAVE action', () => {
			assert.deepEqual(generator.next().value, put({
				type: 'EVENTS_LIST_SAVE',
				scheduledEvents: undefined,
			}));
		});

		it('should be finished', () => {
			assert.equal(generator.next().done, true);
		});
	});

	describe('scheduledEventsAddEdit() - add', () => {
		const action = {
			scheduledEvent: {},
			callbackSuccess: () => {},
		};
		const generator = scheduledEventsAddEdit(action);

		it('should return the ApiScheduledEvents.addEdit call', () => {
			assert.deepEqual(generator.next().value,
				call(ApiScheduledEvents.addEdit, action.scheduledEvent));
		});

		it('should return the ApiScheduledEvents.getList call', () => {
			assert.deepEqual(generator.next().value,
				call(ApiScheduledEvents.getList));
		});

		it('should return the EVENTS_ADD_SAVE action', () => {
			assert.deepEqual(generator.next().value, put({
				type: 'EVENTS_ADD_SAVE',
				scheduledEvents: undefined,
			}));
		});

		it('should be finished', () => {
			assert.equal(generator.next().done, true);
		});
	});

	describe('scheduledEventsAddEdit() - edit', () => {
		const action = {
			scheduledEvent: { id: 1 },
			callbackSuccess: () => {},
		};
		const generator = scheduledEventsAddEdit(action);

		it('should return the ApiScheduledEvents.addEdit call', () => {
			assert.deepEqual(generator.next().value, call(ApiScheduledEvents.addEdit,
				action.scheduledEvent));
		});

		it('should return the ApiScheduledEvents.getList call', () => {
			assert.deepEqual(generator.next().value,
				call(ApiScheduledEvents.getList));
		});

		it('should return the EVENTS_EDIT_SAVE action', () => {
			assert.deepEqual(generator.next().value, put({
				type: 'EVENTS_EDIT_SAVE',
				scheduledEvents: undefined,
			}));
		});

		it('should be finished', () => {
			assert.equal(generator.next().done, true);
		});
	});

	describe('scheduledEventsDelete()', () => {
		const action = {
			eventId: 1,
		};
		const generator = scheduledEventsDelete(action);

		it('should return the ApiScheduledEvents.delete call', () => {
			assert.deepEqual(generator.next().value, call(ApiScheduledEvents.delete, action.eventId));
		});

		it('should return the EVENTS_DELETE_SAVE action', () => {
			assert.deepEqual(generator.next().value, put({
				type: 'EVENTS_DELETE_SAVE',
				eventId: action.eventId,
			}));
		});

		it('should be finished', () => {
			assert.equal(generator.next().done, true);
		});
	});
});

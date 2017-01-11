import { call, put } from 'redux-saga/effects';
import ApiScheduledEvents from '../api/scheduledEvents';

// fetch the event's list
export function* scheduledEventsFetchList() { /* param: action */
	// call the api to get the events list
	const scheduledEvents = yield call(ApiScheduledEvents.getList);

	// save the events in state
	yield put({
		type: 'EVENTS_LIST_SAVE',
		scheduledEvents,
	});
}

// add/edit an event
export function* scheduledEventsAddEdit(action) {
	// call the api to add/edit the event
	yield call(ApiScheduledEvents.addEdit, action.scheduledEvent); // returns a newScheduledEvent

	// return action.callbackError('Some error');   // show an error when the API fails

	// re-fetch the events list
	const scheduledEvents = yield call(ApiScheduledEvents.getList);

	// update the state by adding/editing the event
	yield put({
		type: action.scheduledEvent.id ? 'EVENTS_EDIT_SAVE' : 'EVENTS_ADD_SAVE',
		scheduledEvents,
	});

	// success
	action.callbackSuccess();
}

// delete an event
export function* scheduledEventsDelete(action) {
	// call the api to delete the event
	yield call(ApiScheduledEvents.delete, action.eventId);

	// update the state by removing the event
	yield put({
		type: 'EVENTS_DELETE_SAVE',
		eventId: action.eventId,
	});
}

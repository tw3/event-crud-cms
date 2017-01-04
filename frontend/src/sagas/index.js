import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { scheduledEventsFetchList, scheduledEventsAddEdit, scheduledEventsDelete }
	from './scheduledEvents';

// main saga generators
export function* sagas() {
	yield [
		fork(takeLatest, 'EVENTS_FETCH_LIST', scheduledEventsFetchList),
		fork(takeLatest, 'EVENTS_ADD_EDIT', scheduledEventsAddEdit),
		fork(takeLatest, 'EVENTS_DELETE', scheduledEventsDelete),
	];
}

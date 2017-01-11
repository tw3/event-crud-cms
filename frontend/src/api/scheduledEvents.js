import axios from 'axios';
import logger from 'js-logger';

// TODO: Read backend url from a config file
const apiUrlOrigin = (typeof window === 'undefined') ?
	'http://localhost:3000' : // needed to pass the tests
	[window.location.protocol, // 'http' or 'https'
		'//',
		window.location.hostname, // the server host, e.g. 'localhost'
		':3000', // the server port
	].join('');
const apiConfig = {
	getListUrl: () => `${apiUrlOrigin}/api/events`,
	getUpdateUrl: (eventId) => `${apiUrlOrigin}/api/events/${eventId}`,
	getAddUrl: () => `${apiUrlOrigin}/api/events/`,
	getDeleteUrl: (eventId) => `${apiUrlOrigin}/api/events/${eventId}`,
};

function convertServerScheduledEvent(serverScheduledEvent) {
	const scheduledEvent = serverScheduledEvent; // no need to clone
	// parse the date strings into date objects
	scheduledEvent.start_dt = new Date(scheduledEvent.start_dt);
	scheduledEvent.end_dt = new Date(scheduledEvent.end_dt);
	scheduledEvent.created_at = new Date(scheduledEvent.created_at);
	scheduledEvent.updated_at = new Date(scheduledEvent.updated_at);
	return scheduledEvent;
}

function convertServerScheduledEvents(serverScheduledEvents) {
	return serverScheduledEvents.map(serverScheduledEvent =>
		convertServerScheduledEvent(serverScheduledEvent)
	);
}

// API ScheduledEvents static class
export default class ApiScheduledEvents {
	// get a list of events
	static getList() {
		return new Promise(resolve => {
			axios.get(apiConfig.getListUrl())
				.then((response) => {
					logger.debug(response);
					resolve(convertServerScheduledEvents(response.data.data));
				})
				.catch((error) => { // TODO handle error scenario
					logger.debug(error);
					resolve();
				});
		});
	}

	// add/edit an event
	static addEdit(scheduledEvent) {
		return new Promise(resolve => {
			if (scheduledEvent.id) {
				// Update
				axios.put(apiConfig.getUpdateUrl(scheduledEvent.id), scheduledEvent)
					.then((response) => {
						logger.debug(response);
						resolve();
					})
					.catch((error) => { // TODO handle error scenario
						logger.debug(error);
						resolve();
					});
			} else {
				// Add
				axios.post(apiConfig.getAddUrl(), scheduledEvent)
					.then((response) => {
						logger.debug(response);
						resolve(convertServerScheduledEvent(response.data.data));
					})
					.catch((error) => { // TODO handle error scenario
						logger.debug(error);
						resolve();
					});
			}
		});
	}

	// delete an event
	static delete(eventId) {
		return new Promise(resolve => {
			axios.delete(apiConfig.getDeleteUrl(eventId))
				.then((response) => {
					logger.debug(response);
					resolve();
				})
				.catch((error) => { // TODO handle error scenario
					logger.debug(error);
					resolve();
				});
		});
	}
}

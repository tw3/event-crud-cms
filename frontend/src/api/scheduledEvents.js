import axios from 'axios';

// TODO: Read backend url from a config file
const apiUrlOrigin = (typeof window === 'undefined') ?
	'http://localhost:3000' :
	[window.location.protocol, '//', window.location.hostname, ':3000'].join(''); // e.g. http://localhost:3000
const apiConfig = {
	getListUrl: () => apiUrlOrigin + '/api/events',
	getUpdateUrl: (eventId) => apiUrlOrigin + '/api/events/' + eventId,
	getAddUrl: () => apiUrlOrigin + '/api/events/',
	getDeleteUrl: (eventId) => apiUrlOrigin + '/api/events/' + eventId,
};

function convertServerScheduledEvents(serverScheduledEvents) {
	return serverScheduledEvents.map(serverScheduledEvent =>
		convertServerScheduledEvent(serverScheduledEvent)
	);
}

function convertServerScheduledEvent(serverScheduledEvent) {
	const scheduledEvent = serverScheduledEvent; // no need to clone
	// parse the date strings into date objects
	scheduledEvent.start_dt = new Date(scheduledEvent.start_dt);
	scheduledEvent.end_dt = new Date(scheduledEvent.end_dt);
	scheduledEvent.created_at = new Date(scheduledEvent.created_at);
	scheduledEvent.updated_at = new Date(scheduledEvent.updated_at);
	return scheduledEvent;
}

// API ScheduledEvents static class
export default class ApiScheduledEvents {
	// get a list of events
	static getList() {
		return new Promise(resolve => {
			axios.get(apiConfig.getListUrl())
				.then(function (response) {
					console.log(response);
					resolve(convertServerScheduledEvents(response.data.data));
				})
				.catch(function (error) { // TODO handle error scenario
					console.log(error);
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
					.then(function (response) {
						console.log(response);
						resolve();
					})
					.catch(function (error) { // TODO handle error scenario
						console.log(error);
						resolve();
					});
			} else {
				// Add
				axios.post(apiConfig.getAddUrl(), scheduledEvent)
					.then(function (response) {
						console.log(response);
						resolve(convertServerScheduledEvent(response.data.data));
					})
					.catch(function (error) { // TODO handle error scenario
						console.log(error);
						resolve();
					});
			}
		});
	}

	// delete an event
	static delete(eventId) {
		return new Promise(resolve => {
			axios.delete(apiConfig.getDeleteUrl(eventId))
				.then(function (response) {
					console.log(response);
					resolve();
				})
				.catch(function (error) { // TODO handle error scenario
					console.log(error);
					resolve();
				});
		});
	}
}

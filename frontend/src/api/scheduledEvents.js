import axios from 'axios';

// TODO: Read backend url from a config file
const apiUrlOrigin = [location.protocol, '//', location.hostname, ':3000'].join(""); // e.g. http://localhost:3000
const apiConfig = {
	getListUrl: () => apiUrlOrigin+'/api/events',
	getUpdateUrl: (eventId) => apiUrlOrigin+'/api/events/'+eventId,
	getAddUrl: () => apiUrlOrigin+'/api/events/',
	getDeleteUrl: (eventId) => apiUrlOrigin+'/api/events/'+eventId
};

// API ScheduledEvents static class
export default class ApiScheduledEvents {
  // get a list of events
  static getList() {
    return new Promise(resolve => {
			axios.get(apiConfig.getListUrl())
				.then(function (response) {
					console.log(response);
					resolve(response.data.data);
				})
				.catch(function (error) { // TODO handle error scenario
					console.log(error);
					resolve(response.data.data);
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
					.catch(function (error) {
						console.log(error);
						resolve();
					});
			} else {
				// Add
				axios.post(apiConfig.getAddUrl(), scheduledEvent)
					.then(function (response) {
						console.log(response);
						resolve(response.data.data);
					})
					.catch(function (error) {
						console.log(error);
						resolve(response.data.data);
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
				.catch(function (error) {
					console.log(error);
					resolve();
				});
    });
  }
}

import axios from 'axios';

// API ScheduledEvents static class
export default class ApiScheduledEvents {
  // get a list of events
  static getList() {
    return new Promise(resolve => {
			/* FAKE DATA
      setTimeout(() => {
        // build some dummy events list
        let scheduledEvents = [];
        for (let i = 1; i <= 28; i++) {
          scheduledEvents.push({
						id: i,
						title: 'Event ' + i,
						start_dt: (new Date()).toString(),
						end_dt: (new Date()).toString(),
						category: 'Category ' + i,
						description: 'Description ' + i,
						featured_bl: (Math.random() > 0.8) ? "true" : "false"
          });
        }
        resolve(scheduledEvents);
      }, 1000);
      */

			axios.get('http://localhost:3000/api/events') // TODO: Make backend url dynamic
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
				axios.put(`http://localhost:3000/api/events/{scheduledEvent.id}`, scheduledEvent)
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
				axios.post('http://localhost:3000/api/events', scheduledEvent)
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
			axios.delete(`http://localhost:3000/api/events/{eventId}`)
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

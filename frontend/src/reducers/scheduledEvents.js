// events reducer
export default function scheduledEvents(state = {
	start_dt: new Date(),
	end_dt: new Date()
}, action = {}) {
	switch (action.type) {
		case 'EVENTS_LIST_SAVE':
			return action.scheduledEvents;

		case 'EVENTS_ADD_SAVE':
			return [...state, action.scheduledEvent]; // add new event to the end of the list

		case 'EVENTS_EDIT_SAVE':
			return state.map(scheduledEvent =>
				Number(scheduledEvent.id) === Number(action.scheduledEvent.id) ? {...action.scheduledEvent} : scheduledEvent
			);

		case 'EVENTS_DELETE_SAVE':
			return state.filter(scheduledEvent =>
				Number(scheduledEvent.id) !== Number(action.eventId)
			);

		// initial state
		default:
			return state;
	}
}

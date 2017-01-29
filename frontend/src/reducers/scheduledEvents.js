// events reducer
const initScheduledEvents = null;

export default function scheduledEvents(state = initScheduledEvents, action = {}) {
	switch (action.type) {
		case 'EVENTS_LIST_SAVE':
			return action.scheduledEvents;

		case 'EVENTS_ADD_SAVE': // simply return the new list of events
			return action.scheduledEvents;

		case 'EVENTS_EDIT_SAVE': // simply return the new list of events
			return action.scheduledEvents;

		case 'EVENTS_DELETE_SAVE': // remove the affected event from the state
			return state.filter(scheduledEvent =>
				Number(scheduledEvent.id) !== Number(action.eventId)
			);

		// initial state
		default:
			return state;
	}
}

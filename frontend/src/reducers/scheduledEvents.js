// events reducer
export default function scheduledEvents(state = {}, action = {}) {
  switch (action.type) {
    case 'EVENTS_LIST_SAVE':
      return action.scheduledEvents;

    case 'EVENTS_ADD_SAVE':
      const scheduledEvent = action.scheduledEvent;
      scheduledEvent.id = scheduledEvent.id || Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      return [...state, scheduledEvent];

    case 'EVENTS_EDIT_SAVE':
      return state.map(scheduledEvent =>
        Number(scheduledEvent.id) === Number(action.scheduledEvent.id) ? {...action.scheduledEvent} : scheduledEvent
      );
      break;

    case 'EVENTS_DELETE_SAVE':
      return state.filter(scheduledEvent =>
				Number(scheduledEvent.id) !== Number(action.eventId)
      );

    // initial state
    default:
      return state;
  }
}

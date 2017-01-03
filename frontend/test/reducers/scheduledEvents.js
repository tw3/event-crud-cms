import assert from "assert";
import scheduledEvents from "../../src/reducers/scheduledEvents";

// unit tests for the events reducers
// mocha - http://mochajs.org/#getting-started
// assert - https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message

const someEvent1 = {
	id: 1,
	title: 'Some title',
	start_dt: new Date("January 5, 2017 11:00:00"),
	end_dt: new Date("January 5, 2017 12:0:00"),
	category: 'Some category',
	description: 'Some category',
	featured_bl: 'true',
};

const otherEvent2 = {
	id: 2,
	title: 'Other title',
	start_dt: new Date("February 10, 2017 11:00:00"),
	end_dt: new Date("February 10, 2017 12:0:00"),
	category: 'Other category',
	description: 'Other category',
	featured_bl: 'false',
};

const changedEvent2 = {
	id: 2,
	title: 'Changed title',
	start_dt: new Date("March 15, 2017 11:00:00"),
	end_dt: new Date("March 15, 2017 12:0:00"),
	category: 'Changed category',
	description: 'Changed category',
	featured_bl: 'true'
};

function shallowClone(obj) {
	return Object.assign({}, obj);
}

describe('ScheduledEvents reducer', () => {
  describe('EVENTS_LIST_SAVE', () => {
    it('should return a list of events', () => {
      assert.deepEqual(
        scheduledEvents({}, {
          type: 'EVENTS_LIST_SAVE',
          scheduledEvents: [shallowClone(someEvent1)]
        }), [shallowClone(someEvent1)]
      );
    });
  });

  describe('EVENTS_ADD_SAVE', () => {
    it('should return a new event array element', () => {
      assert.deepEqual(
        scheduledEvents([shallowClone(someEvent1)], {
          type: 'EVENTS_ADD_SAVE',
          scheduledEvent: shallowClone(otherEvent2)
        }), [shallowClone(someEvent1), shallowClone(otherEvent2)]
      );
    });
  });

  describe('EVENTS_EDIT_SAVE', () => {
    it('should return an edited event array element', () => {
      assert.deepEqual(
        scheduledEvents([shallowClone(someEvent1), shallowClone(otherEvent2)], {
          type: 'EVENTS_EDIT_SAVE',
          scheduledEvent: shallowClone(changedEvent2)
        }), [shallowClone(someEvent1), shallowClone(changedEvent2)]
      );
    });
  });

  describe('EVENTS_DELETE_SAVE', () => {
    it('should return the event array without the deleted element', () => {
      assert.deepEqual(
        scheduledEvents([shallowClone(someEvent1), shallowClone(otherEvent2)], {
          type: 'EVENTS_DELETE_SAVE',
          eventId: 2
        }), [shallowClone(someEvent1)]
      );
    });
  });
});

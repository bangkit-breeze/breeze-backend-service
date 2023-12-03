import { create } from '../repositories/eventRepository';
import { Event } from '../schema';

const createEvent = async (newEvent: Event) => {
	const event = await create(newEvent);

	return event;
};

export { createEvent };

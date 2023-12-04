import {
	create,
	findAll,
	findAllByStatus,
	findById,
} from '../repositories/eventRepository';
import {
	addEventUserParticipation,
	isUserAlreadyParticipatedEvent,
	isUserAlreadyParticipatedFinishedEvent,
} from '../repositories/userEventRepository';
import { Event } from '../schema';

const createEvent = async (newEvent: Event) => {
	const event = await create(newEvent);

	return event;
};

const findEventById = async (userId: string, eventId: number) => {
	const event = await findById(eventId);
	const isParticipated = await isUserAlreadyParticipatedEvent(userId, eventId);
	if (isParticipated) {
		event.status = 'JOINED';
	}
	const isFinished = await isUserAlreadyParticipatedFinishedEvent(
		userId,
		eventId
	);
	if (isFinished) {
		event.status = 'FINISHED';
	}

	return event;
};

const joinEvent = async (userId: string, eventId: number) => {
	const isAlreadyJoin = await isUserAlreadyParticipatedEvent(userId, eventId);

	if (isAlreadyJoin) {
		throw Error('You have been joined this event');
	}

	const isSuccessJoin = await addEventUserParticipation(userId, eventId);

	if (!isSuccessJoin) {
		throw Error('Gagal bergabung ke event');
	}

	return isSuccessJoin;
};

const findAllEvent = async () => {
	const events = await findAll();

	return events;
};

const findAllEventByStatus = async (status: string) => {
	const events = await findAllByStatus(status);

	return events;
};

export {
	createEvent,
	findEventById,
	joinEvent,
	findAllEvent,
	findAllEventByStatus,
};

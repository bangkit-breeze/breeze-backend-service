import {
	create,
	findAll,
	findAllByStatus,
	findById,
	findUserEventParticipation,
} from '../repositories/eventRepository';
import {
	addEventUserParticipation,
	isUserAlreadyParticipatedEvent,
	isUserAlreadyParticipatedFinishedEvent,
	setEventToFinish,
} from '../repositories/userRepository';
import { Event } from '../schema';

const createEvent = async (newEvent: Event) => {
	const event = await create(newEvent);

	return event;
};

const findEventById = async (id: number) => {
	const event = await findById(id);

	return event;
};

const joinEvent = async (userId: string, eventId: number) => {
	const isAlreadyJoin = await isUserAlreadyParticipatedEvent(userId, eventId);

	if (isAlreadyJoin) {
		throw Error('Sudah bergabung ke event ini');
	}

	const isSuccessJoin = await addEventUserParticipation(userId, eventId);

	if (!isSuccessJoin) {
		throw Error('Gagal bergabung ke event');
	}

	return isSuccessJoin;
};

const uploadEvidence = async (
	userEventParticipationId: number,
	userId: string,
	eventId: number,
	description: string,
	imagePath: string
) => {
	const isEventFinished = await isUserAlreadyParticipatedFinishedEvent(
		userId,
		eventId
	);

	if (isEventFinished) {
		throw Error('Kamu telah menyelesaikan event ini');
	}

	const isSuccessJoin = await setEventToFinish(
		userEventParticipationId,
		userId,
		eventId,
		description,
		imagePath
	);

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

const getUserEventParticipation = async (userId: string, eventId: number) => {
	const userEventParticipation = findUserEventParticipation(userId, eventId);

	if (!userEventParticipation) {
		throw Error('Event partisipasi tidak ditemukan');
	}

	return userEventParticipation;
};

export {
	createEvent,
	findEventById,
	joinEvent,
	findAllEvent,
	findAllEventByStatus,
	uploadEvidence,
	getUserEventParticipation,
};

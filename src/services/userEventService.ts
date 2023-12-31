import {
	findById,
	findUserEventParticipation,
} from '../repositories/eventRepository';
import {
	findByStatus,
	isUserAlreadyParticipatedFinishedEvent,
	setEventToFinish,
} from '../repositories/userEventRepository';
import { addPoint } from '../repositories/userRepository';

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
		throw new Error('You have already finished this event');
	}

	const isSuccessFinish = await setEventToFinish(
		userEventParticipationId,
		userId,
		eventId,
		description,
		imagePath
	);
	const event = await findById(eventId);
	const eventPoint = event.reward_points;
	await addPoint(userId, eventPoint);

	if (!isSuccessFinish) {
		throw new Error('Fail to finish event');
	}

	return eventPoint;
};

const getUserEventParticipation = async (userId: string, eventId: number) => {
	const userEventParticipation = findUserEventParticipation(userId, eventId);

	if (!userEventParticipation) {
		throw new Error('Event partisipasi tidak ditemukan');
	}

	return userEventParticipation;
};

const findUserEventByStatus = async (userId: string, status: string) => {
	const userEvents = await findByStatus(userId, status.toUpperCase());

	const res = userEvents.map((item) => {
		return {
			...item.Event,
			status: item.status,
		};
	});

	return res;
};

export { uploadEvidence, getUserEventParticipation, findUserEventByStatus };

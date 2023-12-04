import { findUserEventParticipation } from '../repositories/eventRepository';
import {
	isUserAlreadyParticipatedFinishedEvent,
	setEventToFinish,
} from '../repositories/userEventRepository';

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

const getUserEventParticipation = async (userId: string, eventId: number) => {
	const userEventParticipation = findUserEventParticipation(userId, eventId);

	if (!userEventParticipation) {
		throw Error('Event partisipasi tidak ditemukan');
	}

	return userEventParticipation;
};

export { uploadEvidence, getUserEventParticipation };

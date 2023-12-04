import prisma from '../db';

const isUserAlreadyParticipatedEvent = async (
	userId: string,
	eventId: number
) => {
	const userParticipation = await prisma.userParticipation.findFirst({
		where: {
			User: {
				id: userId,
			},
			Event: {
				id: eventId,
			},
		},
	});

	return userParticipation;
};

const isUserAlreadyParticipatedFinishedEvent = async (
	userId: string,
	eventId: number
) => {
	const userParticipation = await prisma.userParticipation.findFirst({
		where: {
			User: {
				id: userId,
			},
			Event: {
				id: eventId,
			},
			stauts: 'FINISHED',
		},
	});

	return userParticipation;
};

const addEventUserParticipation = async (userId: string, eventId: number) => {
	const userParticipation = await prisma.userParticipation.create({
		data: {
			participant_id: userId,
			stauts: 'ACTIVE',
			description: '',
			proof_image_url: '',
			event_id: eventId,
		},
	});

	return userParticipation;
};

const setEventToFinish = async (
	userEventParticipationId: number,
	userId: string,
	eventId: number,
	description: string,
	imagePath: string
) => {
	const userParticipation = await prisma.userParticipation.update({
		where: {
			id: userEventParticipationId,
			participant_id: userId,
			event_id: eventId,
		},
		data: {
			description: description,
			proof_image_url: imagePath,
			stauts: 'FINISHED',
		},
	});

	return userParticipation;
};
export {
	addEventUserParticipation,
	setEventToFinish,
	isUserAlreadyParticipatedEvent,
	isUserAlreadyParticipatedFinishedEvent,
};

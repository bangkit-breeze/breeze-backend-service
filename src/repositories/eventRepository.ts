import prisma from '../db';
import { Event } from '../schema';

const create = async (event: Event) => {
	const newEvent = await prisma.event.create({
		data: {
			event_image_url: event.imagePath,
			name: event.name,
			start_at: event.startDate,
			end_at: event.endDate,
			reward_points: event.rewardPoints,
			location: event.location,
			status: event.status,
			description: event.description,
			creator_id: event.creatorId,
			location_lat: event.locationLat,
			location_lng: event.locationLng,
		},
	});

	return newEvent;
};

const findById = async (id: number) => {
	const event = await prisma.event.findUnique({
		where: {
			id: id,
		},
	});

	return event;
};

const findUserEventParticipation = async (userId: string, eventId: number) => {
	const userEventParticipation = await prisma.userParticipation.findFirst({
		where: {
			participant_id: userId,
			event_id: eventId,
		},
	});

	return userEventParticipation;
};

const findAllAvailable = async (userId: string) => {
	// user not joined/finished
	const events = await prisma.event.findMany({
		where: {
			UserParticipation: {
				none: {
					participant_id: userId,
				},
			},
		},
	});

	return events;
};

const findAllByStatus = async (status: string) => {
	const events = await prisma.event.findMany({
		where: {
			status: status,
		},
	});

	return events;
};

const findPopular = async () => {
	const events = await prisma.event.findMany({
		take: 5,
		orderBy: {
			UserParticipation: {
				_count: 'desc',
			},
		},
	});
	return events;
};

export {
	create,
	findById,
	findUserEventParticipation,
	findAllAvailable,
	findAllByStatus,
	findPopular,
};

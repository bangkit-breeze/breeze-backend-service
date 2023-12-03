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

export { create };

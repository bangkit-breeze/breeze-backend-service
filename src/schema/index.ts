import { z } from 'zod';

export const loginSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string(),
	}),
});

export const registerSchema = z.object({
	body: z
		.object({
			fullName: z.string().max(128),
			email: z.string().email(),
			password: z.string(),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Password tidak sama',
			path: ['confirmPassword'],
		}),
});

export const eventSchema = z.object({
	imagePath: z.string(),
	name: z.string().max(128),
	startDate: z.coerce.date(),
	endDate: z.coerce.date(),
	rewardPoints: z.number(),
	location: z.string(),
	status: z.string(),
	description: z.string(),
	creatorId: z.string(),
	locationLat: z.number(),
	locationLng: z.number(),
});

export type Event = z.infer<typeof eventSchema>;

export const eventRequestSchema = z.object({
	body: eventSchema,
});

export const userEventParticipationEvidence = z.object({
	description: z.string(),
	imagePath: z.string(),
});

export const userEventParticipationEvidenceRequestSchema = z.object({
	body: userEventParticipationEvidence,
	params: z.object({
		eventId: z.string(),
	}),
});

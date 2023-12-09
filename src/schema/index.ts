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

export const articleSchema = z.object({
	title: z.string(),
	content: z.string(),
	imageUrl: z.string(),
	contentUrl: z.string(),
});

export const listArticleSchema = z.array(articleSchema);

export type ArticleSchema = z.infer<typeof articleSchema>;
export type ListArticleSchema = z.infer<typeof listArticleSchema>;

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
});

export const userEventParticipationEvidenceRequestSchema = z.object({
	body: userEventParticipationEvidence,
	params: z.object({
		eventId: z.string(),
	}),
	file: z.any(),
});

export const trackingVehicleSchema = z.object({
	body: z.object({
		vehicleType: z.string(),
		distance: z.number(),
	}),
});

export const trackingFoodPredictRequestSchema = z.object({
	file: z.any(),
});

export const trackingFoodAddRequestSchema = z.object({
	body: z.object({
		foodName: z.string(),
		totalEmission: z.number(),
	}),
});

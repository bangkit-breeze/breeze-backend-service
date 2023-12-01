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

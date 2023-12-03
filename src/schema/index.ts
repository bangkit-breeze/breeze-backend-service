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

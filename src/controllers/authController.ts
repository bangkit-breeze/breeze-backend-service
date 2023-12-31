import { Router } from 'express';
import { login, register } from '../services/authService';
import { z } from 'zod';
import {
	createErrorResponse,
	createSuccessResponse,
	validate,
} from '../utils/helper';
import { loginSchema, registerSchema } from '../schema';

const router = Router();

router.post(
	'/register',
	validate(registerSchema),
	async (req: z.infer<typeof registerSchema>, res) => {
		const { fullName, email, password } = req.body;

		try {
			const user = await register(fullName, email, password);

			res.status(200).json(createSuccessResponse(user, 'Register success'));
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

router.post(
	'/login',
	validate(loginSchema),
	async (req: z.infer<typeof loginSchema>, res) => {
		const { email, password } = req.body;

		try {
			const token = await login(email, password);

			res.status(200).json(createSuccessResponse({ token }, 'Login success'));
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

export default router;

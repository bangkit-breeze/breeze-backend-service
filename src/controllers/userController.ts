import { Router } from 'express';
import { createErrorResponse, createSuccessResponse } from '../utils/helper';
import { useAuth } from '../utils/auth';
import { profile } from '../services/userService';

const router = Router();

router.get('/profile', async (req, res) => {
	try {
		const { userId } = useAuth(req);
		const user = await profile(userId);

		res.status(200).json(createSuccessResponse(user, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

export default router;

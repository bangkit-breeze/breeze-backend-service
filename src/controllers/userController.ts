import { Router } from 'express';
import { createErrorResponse, createSuccessResponse } from '../utils/helper';
import { useAuth } from '../utils/auth';
import { profile } from '../services/userService';
import { getStatistic } from '../services/statisticService';
import { getHistory } from '../services/historyService';

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

router.get('/statistic', async (req, res) => {
	try {
		const { userId } = useAuth(req);
		const statistic = await getStatistic(userId);

		res.status(200).json(createSuccessResponse(statistic, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

router.get('/history', async (req, res) => {
	try {
		const { userId } = useAuth(req);
		const history = await getHistory(userId);

		res.status(200).json(createSuccessResponse(history, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

export default router;

import { Router } from 'express';
import { createErrorResponse, createSuccessResponse } from '../utils/helper';
import { getAllArticles } from '../services/articleService';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const articles = await getAllArticles();
		res.status(200).json(createSuccessResponse(articles, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

export default router;

import { Router } from 'express';
import {
	createErrorResponse,
	createSuccessResponse,
	validate,
} from '../utils/helper';
import { eventRequestSchema } from '../schema';
import { z } from 'zod';
import { createEvent } from '../services/eventService';

const router = Router();

router.post(
	'/',
	validate(eventRequestSchema),
	async (req: z.infer<typeof eventRequestSchema>, res) => {
		const newEvent = req.body;

		try {
			const event = await createEvent(newEvent);

			res
				.status(201)
				.json(createSuccessResponse(event, 'Berhasil membuat event'));
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

export default router;

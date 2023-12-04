import { Router } from 'express';
import {
	createErrorResponse,
	createSuccessResponse,
	validate,
} from '../utils/helper';
import {
	eventRequestSchema,
	userEventParticipationEvidenceRequestSchema,
} from '../schema';
import { z } from 'zod';
import { createEvent, findAllEvent, joinEvent } from '../services/eventService';
import { useAuth } from '../utils/auth';
import {
	getUserEventParticipation,
	uploadEvidence,
} from '../services/userEventService';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const events = await findAllEvent();

		res.status(200).json(createSuccessResponse(events, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

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

router.post('/:eventId/join', async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const { userId } = useAuth(req);

		await joinEvent(userId, Number(eventId));

		res
			.status(200)
			.json(createSuccessResponse(null, 'Berhasil bergabung ke event'));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

router.post(
	'/:eventId/upload-evidence',
	validate(userEventParticipationEvidenceRequestSchema),
	async (
		req: z.infer<typeof userEventParticipationEvidenceRequestSchema>,
		res
	) => {
		try {
			const eventId = req.params.eventId;
			const { userId } = useAuth(req);
			const { description, imagePath } = req.body;

			const userEventParticipation = await getUserEventParticipation(
				userId,
				Number(eventId)
			);

			await uploadEvidence(
				Number(userEventParticipation.id),
				userId,
				Number(eventId),
				description,
				imagePath
			);
			// TODO:
			// add points
			res
				.status(200)
				.json(
					createSuccessResponse(null, 'Selamat! Anda mendapatkan 9999 poin')
				);
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

export default router;

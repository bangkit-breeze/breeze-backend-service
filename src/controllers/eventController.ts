import { Router } from 'express';
import {
	createErrorResponse,
	createSuccessResponse,
	uploadImage,
	validate,
} from '../utils/helper';
import {
	eventRequestSchema,
	userEventParticipationEvidenceRequestSchema,
} from '../schema';
import { z } from 'zod';
import {
	createEvent,
	findAllAvailableEvent,
	findEventById,
	findPopularEvents,
	joinEvent,
} from '../services/eventService';
import { useAuth } from '../utils/auth';
import {
	findUserEventByStatus,
	getUserEventParticipation,
	uploadEvidence,
} from '../services/userEventService';
import multer from 'multer';

const router = Router();

router.get('/popular', async (req, res) => {
	try {
		const events = await findPopularEvents();

		res.status(200).json(createSuccessResponse(events, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

router.get('/', async (req, res) => {
	const status = req.query.status;
	const { userId } = useAuth(req);

	try {
		let events = undefined;

		if (!status) {
			events = await findAllAvailableEvent(userId);
		} else {
			const { userId } = useAuth(req);
			events = await findUserEventByStatus(userId, status as string);
		}

		res.status(200).json(createSuccessResponse(events, ''));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const { userId } = useAuth(req);
		const events = await findEventById(userId, Number(id));

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
				.json(createSuccessResponse(event, 'Event created successfully'));
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
			.json(createSuccessResponse(null, 'Event successfully joined'));
	} catch (err) {
		res.status(400).json(createErrorResponse(err.message));
	}
});

router.use(multer().single('file'));
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
			const { description } = req.body;

			let imageUrl;

			const userEventParticipation = await getUserEventParticipation(
				userId,
				Number(eventId)
			);

			if (userEventParticipation.status === 'JOINED') {
				imageUrl = (await uploadImage(req.file, 'evidence')) as string;
			}

			const point = await uploadEvidence(
				Number(userEventParticipation.id),
				userId,
				Number(eventId),
				description,
				imageUrl
			);

			res
				.status(200)
				.json(createSuccessResponse(null, `Congrats! You got ${point} points`));
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

export default router;

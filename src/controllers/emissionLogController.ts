import { Router } from 'express';
import {
	createErrorResponse,
	createSuccessResponse,
	uploadImage,
	validate,
} from '../utils/helper';
import { useAuth } from '../utils/auth';
import { z } from 'zod';
import {
	trackingFoodAddRequestSchema,
	trackingFoodPredictRequestSchema,
	trackingVehicleSchema,
} from '../schema';
import {
	foodEmissionLog,
	vehicleEmissionLog,
} from '../services/emissionLogService';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const router = Router();

router.post(
	'/tracking/vehicle',
	validate(trackingVehicleSchema),
	async (req: z.infer<typeof trackingVehicleSchema>, res) => {
		const { userId } = useAuth(req);
		const { vehicleType, distance } = req.body;

		try {
			const emission = await vehicleEmissionLog(userId, vehicleType, distance);
			res
				.status(200)
				.json(createSuccessResponse(emission, 'Successfully logged emission'));
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

router.use(multer().single('file'));
router.post(
	'/tracking/food/predict',
	validate(trackingFoodPredictRequestSchema),
	async (req: z.infer<typeof trackingFoodPredictRequestSchema>, res) => {
		try {
			const imageUrl = (await uploadImage(req.file, 'predict_food')) as string;

			const formData = new FormData();
			const image = req.file;
			formData.append('image', image.buffer, image.originalname);

			const predictRequest = await axios({
				method: 'post',
				url: process.env.ML_SERVICE_URL,
				data: formData,
				headers: {
					'Content-Type': `multipart/form-data;  boundary=${formData.getBoundary()}`,
				},
			});

			const confidence = predictRequest.data.confidence;
			const foodName = predictRequest.data.food_name;
			const ingredients = predictRequest.data.ingredients;

			if (Number(confidence) < 0.6 && ingredients.length === 0) {
				return res.status(400).json(createErrorResponse('Fail to predict'));
			}

			res
				.status(200)
				.json(
					createSuccessResponse(
						{
							image_url: imageUrl,
							predict_result: {
								...predictRequest.data,
								food_name: Number(confidence) < 0.6 ? 'unknown' : foodName,
							},
						},
						''
					)
				);
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

router.post(
	'/tracking/food/add',
	validate(trackingFoodAddRequestSchema),
	async (req: z.infer<typeof trackingFoodAddRequestSchema>, res) => {
		const { userId } = useAuth(req);
		const { foodName, totalEmission } = req.body;

		try {
			const { isSuccessLogging, rewardExp } = await foodEmissionLog(
				userId,
				foodName,
				totalEmission
			);

			res
				.status(200)
				.json(
					createSuccessResponse(
						isSuccessLogging,
						`Food carbon has been added, you get +${rewardExp} exp`
					)
				);
		} catch (err) {
			res.status(400).json(createErrorResponse(err.message));
		}
	}
);

export default router;

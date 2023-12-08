import { Router } from "express";
import { createErrorResponse, createSuccessResponse, validate } from "../utils/helper";
import { useAuth } from "../utils/auth";
import { z } from "zod";
import { trackingVehicleSchema } from "../schema";
import { emissionLog } from "../services/emissionLogService";

const router = Router();

router.post('/tracking/vehicle', validate(trackingVehicleSchema), async (req: z.infer<typeof trackingVehicleSchema>, res) => {
  const { userId } = useAuth(req);
  const { vehicleType, distance } = req.body;

  try {
    const emission = await emissionLog(userId, vehicleType, distance);
    res.status(200).json(createSuccessResponse(emission, 'Successfully logged emission'));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
}
);


export default router;

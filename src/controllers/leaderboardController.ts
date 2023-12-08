import { Router } from 'express';
import { createErrorResponse, createSuccessResponse } from '../utils/helper';
import { useAuth } from '../utils/auth';
import { getLeaderboard } from '../services/leaderboardService';

const router = Router();

router.get('/:range', async (req, res) => {
  try {
    
    const range = req.params.range;
    const { userId } = useAuth(req);
    const leaderboard = await getLeaderboard(range);
    
    res.status(200).json(createSuccessResponse(leaderboard, ''));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
});

export default router;

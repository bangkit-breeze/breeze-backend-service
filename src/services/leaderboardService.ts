import { findLeaderboard } from '../repositories/leaderboardRepository';

const getLeaderboard = async (range) => {
  const leaderboard = await findLeaderboard(range);

  return leaderboard;
}

export { getLeaderboard };

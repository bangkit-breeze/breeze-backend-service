import { findLeaderboard } from '../repositories/leaderboardRepository';

const getLeaderboard = async (range, userId) => {
  const leaderboard = await findLeaderboard(range);
  const userRank = leaderboard.findIndex(item => item.user_id == userId);
  return {
    leaderboard,
    userRank
  };
}

export { getLeaderboard };

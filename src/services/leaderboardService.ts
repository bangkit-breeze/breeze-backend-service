import { findLeaderboard } from '../repositories/leaderboardRepository';

const getLeaderboard = async (range, userId) => {
  const leaderboard = await findLeaderboard(range);
  console.log("leaderboardnya", leaderboard);
  console.log("userIdnya", userId);
  const userRank = leaderboard.findIndex(item => item.user_id == userId);
  console.log("user ranknya", userRank);
  return {
    leaderboard,
    userRank
  };
}

export { getLeaderboard };

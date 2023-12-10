import prisma from "../db";
import moment from 'moment';

const findLeaderboard = async (range: string) => {
  if (range === 'weekly') {
    const currentDate = moment(); 
    const startDate = currentDate.clone().startOf('isoWeek').toDate();
    const endDate = currentDate.clone().endOf('isoWeek').toDate();

    // Fetch aggregated data
    const aggregatedData = await prisma.emissionLog.groupBy({
      by: ['user_id'],
      where: {
        created_at: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        reward_exp: true 
      },
      orderBy: [{
        _sum: {
          reward_exp: 'desc' 
        }
      }]
    });

    // Fetch user names separately
    const userIds = aggregatedData.map(item => item.user_id);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds }
      },
      select: {
        id: true,
        full_name: true,
        avatar_url: true
      }
    });

    // Combine the results
    const leaderboard = aggregatedData.map((item, index) => {
      const user = users.find(u => u.id === item.user_id);
      return {
        rank: index + 1,
        user_id: item.user_id,
        exp: item._sum.reward_exp,
        full_name: user ? user.full_name : 'Unknown',
        avatar_url: user ? user.avatar_url : ''
      };
    });

    return leaderboard;
  }  
  else {
    const aggregatedData = await prisma.emissionLog.groupBy({
      by: ['user_id'],
      _sum: {
        reward_exp: true 
      },
      orderBy: [{
        _sum: {
          reward_exp: 'desc' 
        }
      }]
    });

    // Fetch user names separately
    const userIds = aggregatedData.map(item => item.user_id);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds }
      },
      select: {
        id: true,
        full_name: true,
        avatar_url: true
      }
    });

    // Combine the results
    const leaderboard = aggregatedData.map((item, index) => {
      const user = users.find(u => u.id === item.user_id);
      return {
        rank: index + 1,
        user_id: item.user_id,
        exp: item._sum.reward_exp,
        full_name: user ? user.full_name : 'Unknown',
        avatar_url: user ? user.avatar_url : ''
      };
    });

    return leaderboard;
  }
};

export { findLeaderboard };

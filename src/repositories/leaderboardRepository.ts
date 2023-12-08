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
        total_emission: true 
      },
      orderBy: [{
        _sum: {
          total_emission: 'desc' 
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
        full_name: true
      }
    });

    // Combine the results
    const leaderboard = aggregatedData.map(item => {
      const user = users.find(u => u.id === item.user_id);
      return {
        user_id: item.user_id,
        points: item._sum.total_emission,
        full_name: user ? user.full_name : 'Unknown'
      };
    });

    return leaderboard;
  }  
  else {
    const aggregatedData = await prisma.emissionLog.groupBy({
      by: ['user_id'],
      _sum: {
        total_emission: true 
      },
      orderBy: [{
        _sum: {
          total_emission: 'desc' 
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
        full_name: true
      }
    });

    // Combine the results
    const leaderboard = aggregatedData.map(item => {
      const user = users.find(u => u.id === item.user_id);
      return {
        user_id: item.user_id,
        points: item._sum.total_emission,
        full_name: user ? user.full_name : 'Unknown'
      };
    });

    return leaderboard;
  }
};

export { findLeaderboard };

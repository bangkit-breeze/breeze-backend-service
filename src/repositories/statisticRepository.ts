import prisma from "../db";

const findUserStatistic = async (userId: string) => {
  const statistic = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      food_emission_count: true,
      food_footprint_sum: true,
      vehicle_emission_count: true,
      vehicle_footprint_sum: true,
    }
  });

  return statistic;
}

export { findUserStatistic };

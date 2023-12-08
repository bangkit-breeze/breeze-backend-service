import prisma from '../db';

const createEmissionLog = async (userId: string, totalEmission: number) => {
  const newEmissionLog = await prisma.emissionLog.create({
    data: {
      total_emission: totalEmission,
      category: "vehicle", 
      user_id: userId,
      reward_exp: 10,
    },
  });

  return newEmissionLog;
};

export { createEmissionLog };

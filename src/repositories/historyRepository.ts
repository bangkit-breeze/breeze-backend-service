import prisma from "../db";

const findUserHistory = async (userId: string) => {
  const history = await prisma.emissionLog.findMany({
    where: {
      user_id: userId,
    },
  });

  return history;
};

export { findUserHistory };

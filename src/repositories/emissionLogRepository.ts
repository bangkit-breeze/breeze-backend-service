import prisma from '../db';

const createEmissionLog = async (
	userId: string,
	name: string,
	totalEmission: number,
	category: 'VEHICLE' | 'FOOD',
	rewardExp: number
) => {
	const newEmissionLog = await prisma.emissionLog.create({
		data: {
			name: name,
			total_emission: totalEmission,
			category: category,
			user_id: userId,
			reward_exp: rewardExp,
		},
	});

	return newEmissionLog;
};

export { createEmissionLog };

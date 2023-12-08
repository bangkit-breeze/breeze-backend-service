import prisma from '../db';

const createUser = async (
	fullName: string,
	email: string,
	password: string
) => {
	const user = await prisma.user.create({
		data: {
			full_name: fullName,
			email: email,
			password: password,
		},
	});

	return user;
};

const findByEmail = async (email: string) => {
	const user = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});

	return user;
};

const findById = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	return user;
};

const addPoint = async (userId: string, point: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	const prevPoint = user.points;

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			points: prevPoint + point,
		},
	});

	return updatedUser;
};

const addExp = async (userId: string, exp: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	const prevExp = user.experiences;

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			experiences: prevExp + exp,
		},
	});

	return updatedUser;
}

const addVehicleEmissionCount = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	const prevCount = user.vehicle_emission_count;

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			vehicle_emission_count: prevCount + 1,
		},
	});

	return updatedUser;
}

const addVehicleFootprintSum = async (userId: string, footprint: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	const prevFootprint = user.vehicle_footprint_sum;

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			vehicle_footprint_sum: prevFootprint + footprint,
		},
	});

	return updatedUser;
}

export { createUser, findByEmail, findById, addPoint, addExp, addVehicleEmissionCount, addVehicleFootprintSum};

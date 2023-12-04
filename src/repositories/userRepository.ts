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
	const user = await prisma.user.findFirst({
		where: {
			id: id,
		},
	});

	return user;
};

export { createUser, findByEmail, findById };

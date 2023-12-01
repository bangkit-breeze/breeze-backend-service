import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { createUser, findByEmail } from '../repositories/userRepository';

const register = async (fullName: string, email: string, password: string) => {
	const isExistUser = await findByEmail(email);

	if (isExistUser) {
		throw Error('Email sudah digunakan');
	}

	const saltRounds = process.env.SALT_ROUNDS;
	const passwordHash = await hash(password, saltRounds);
	const user = await createUser(fullName, email, passwordHash);

	return user;
};

const login = async (email: string, password: string) => {
	const user = await findByEmail(email);
	const isPasswordCorrect =
		user === null ? false : await compare(password, user.password);

	if (!(user && isPasswordCorrect)) {
		throw Error('Email atau password salah');
	}

	const userTokenBody = {
		id: user.id,
		email: user.email,
		fullName: user.full_name,
	};

	const token = sign(userTokenBody, process.env.SECRET);

	return token;
};

export { register, login };
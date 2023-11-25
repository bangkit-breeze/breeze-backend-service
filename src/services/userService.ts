import { createUser } from '../repositories/userRepository';

const register = async (fullName: string, email: string, password: string) => {
	const user = await createUser(fullName, email, password);

	return user;
};

export { register };

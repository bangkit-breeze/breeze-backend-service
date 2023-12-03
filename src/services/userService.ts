import { findById } from '../repositories/userRepository';

const profile = async (id: string) => {
	const user = await findById(id);

	if (!user) {
		throw Error('User tidak ditemukan');
	}

	const { password: _password, ...userProfile } = user;
	
	return userProfile;
};

export { profile };

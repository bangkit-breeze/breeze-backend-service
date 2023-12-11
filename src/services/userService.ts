import { findById } from '../repositories/userRepository';

const profile = async (id: string) => {
	const { user, totalEvent } = await findById(id);

	if (!user) {
		throw new Error('User tidak ditemukan');
	}

	const { password: _password, ...userProfile } = user;

	return { ...userProfile, total_event: totalEvent._count };
};

export { profile };

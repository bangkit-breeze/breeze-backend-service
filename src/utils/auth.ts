import { JwtPayload, verify } from 'jsonwebtoken';

export const extractToken = (request) => {
	const authorization = request.get('authorization');

	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}

	return null;
};

export const useAuth = (req) => {
	const user = verify(extractToken(req), process.env.SECRET) as JwtPayload;

	return user;
};

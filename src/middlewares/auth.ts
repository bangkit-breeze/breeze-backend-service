import { verify } from 'jsonwebtoken';
import { createErrorResponse } from '../utils/helper';
import { extractToken } from '../utils/auth';

const authGuard = async (req, res, next) => {
	try {
		const decodedToken = verify(extractToken(req), process.env.SECRET);

		if (decodedToken) {
			next();
		}
	} catch (err) {
		return res.status(401).json(createErrorResponse('Unauthorized access'));
	}
};

export { authGuard };

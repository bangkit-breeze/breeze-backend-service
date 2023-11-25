import { Router } from 'express';
import { register } from '../services/userService';

const router = Router();

router.post('/register', async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		const user = await register(fullName, email, password);
		res.status(200).json(user);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

export default router;

import { Router } from 'express';
import { login, register } from '../services/userService';

const router = Router();

router.post('/register', async (req, res) => {
	const { fullName, email, password } = req.body;

	try {
		const user = await register(fullName, email, password);

		res.status(200).json(user);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const auth = await login(email, password);

		res.status(200).json(auth);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

export default router;

import express from 'express';
import 'dotenv/config';
import userController from './controllers/userController';

// @ts-expect-error: Unreachable code error
BigInt.prototype.toJSON = function () {
	return this.toString();
};

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/v1/user', userController);

app.get('/api/v1/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

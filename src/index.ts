import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import authController from './controllers/authController';
import userController from './controllers/userController';
import articleController from './controllers/articleController';
import { authGuard } from './middlewares/auth';
import eventController from './controllers/eventController';
import leaderboardController from './controllers/leaderboardController';

// @ts-expect-error: Unreachable code error
BigInt.prototype.toJSON = function () {
	return this.toString();
};

const app = express();

const PORT = process.env.PORT;

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan('[:date[web]] :method :url :status - :response-time ms :body'));

app.use('/api/v1', authController);
app.use(authGuard);
app.use('/api/v1/users', userController);
app.use('/api/v1/articles', articleController);
app.use('/api/v1/events', eventController);
app.use('/api/v1/leaderboard', leaderboardController);

app.get('/api/v1/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.listen(PORT || 3000, () => {
	console.log(`Server running on port ${PORT}`);
});

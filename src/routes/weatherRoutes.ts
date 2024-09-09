import { Router } from 'express';
import { getWeatherForTodo } from '../controllers/weatherController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/todos/:id/weather', authMiddleware, getWeatherForTodo);

export default router;

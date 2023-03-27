import { Router } from 'express';
import airQualityController from '../controllers/airQuality';

export const router = Router();

router.get('/air-quality', airQualityController.get);

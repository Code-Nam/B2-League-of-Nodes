import express from 'express';
import champion from './ChampionRouter.js';

const router = express.Router();

router.use('/champion', champion);

export default router;
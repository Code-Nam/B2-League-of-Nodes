import express from 'express';
import champion from './ChampionRouter.js';
import auth from './AuthRouter.js';

const router = express.Router();

router.use('/champion', champion);
router.use('/auth', auth);

export default router;
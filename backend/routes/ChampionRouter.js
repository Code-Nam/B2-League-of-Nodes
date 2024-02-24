import express from 'express';
import { createChampion, getChampion, getChampions, updateChampion, deleteChampion } from '../controllers/ChampionController.js';

const router = express.Router();

router.post('/', createChampion);
router.get('/', getChampions);
router.get('/:id', getChampion);
router.put('/:id', updateChampion);
router.delete('/:id', deleteChampion);

export default router;
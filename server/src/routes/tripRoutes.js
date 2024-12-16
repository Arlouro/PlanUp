import express from 'express';
import { createTrip, getTrips, deleteTrip } from '../controllers/tripController.js';

const router = express.Router();

router.get('/', getTrips);
router.post('/', createTrip);
router.delete('/:id', deleteTrip);

export default router;

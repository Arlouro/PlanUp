import express from 'express';
import { createTrip, getTrips, deleteTrip, updateTrip, deleteAllTrips } from '../controllers/tripController.js';
import { createActivity, getActivitiesByDay, updateActivity, deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

// Trips routes
router.get('/', getTrips);
router.post('/', createTrip);
router.delete('/:id', deleteTrip);
router.put('/:id', updateTrip);

//! Remove this route before final delivery
router.delete('/', deleteAllTrips);

// Activities routes
router.get('/:tripId/:dayId/', getActivitiesByDay);
router.post('/:tripId/:dayId/', createActivity);
router.put('/:tripId/:dayId/:activityId', updateActivity);
router.delete('/:tripId/:dayId/:activityId', deleteActivity);

export default router;

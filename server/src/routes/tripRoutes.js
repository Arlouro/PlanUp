import express from 'express';
import { createTrip, getTrips, deleteTrip, updateTrip, deleteAllTrips } from '../controllers/tripController.js';
import { createActivity, getActivitiesByDay, updateActivity, deleteActivity, voteActivity, updateActivityState, getActivitiesByState, deleteAllActivities } from '../controllers/activityController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Trips routes
router.get('/', isAuthenticated, getTrips);
router.post('/', isAuthenticated, createTrip);
router.delete('/:id', isAuthenticated, deleteTrip);
router.put('/:id', isAuthenticated, updateTrip);

// Activities routes
router.get('/:tripId/:dayId/', isAuthenticated, getActivitiesByDay);
router.post('/:tripId/:dayId/', isAuthenticated, createActivity);
router.put('/:tripId/:dayId/:activityId', isAuthenticated, updateActivity);
router.delete('/:tripId/:dayId/:activityId', isAuthenticated, deleteActivity);
router.put('/:tripId/:dayId/:activityId/vote', isAuthenticated, voteActivity);
router.get('/:tripId/:', isAuthenticated, getActivitiesByState);

export default router;

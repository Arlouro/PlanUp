const express = require('express');
const router = express.Router();
const { getTrips, createTrip } = require('../controllers/tripController');

router.get('/', getTrips);
router.post('/', createTrip);

module.exports = router;

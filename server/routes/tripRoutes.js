const express = require('express');
const { getTrips, createTrip } = require('../controllers/tripController');
const router = express.Router();

router.get('/', getTrips);
router.post('/', createTrip);

module.exports = router;

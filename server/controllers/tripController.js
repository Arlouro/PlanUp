const Trip = require('../models/Trip');

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTrip = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTrip = new Trip({ name, description, days: [] });
        await newTrip.save();
        res.json(newTrip);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

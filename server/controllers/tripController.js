const { getDB } = require('../config/db');

exports.getTrips = async (req, res) => {
    try {
        const db = getDB();
        const trips = await db.collection('trips').find().toArray(); // Query all trips
        res.json(trips);
    } catch (err) {
        console.error('Error fetching trips:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTrip = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const db = getDB();
        const newTrip = {
            name,
            description,
            days: [], // Initialize with no activities
            createdAt: new Date(),
        };
        const result = await db.collection('trips').insertOne(newTrip);
        res.status(201).json(result.ops[0]); // Return the created trip
    } catch (err) {
        console.error('Error creating trip:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

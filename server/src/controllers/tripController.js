import { getDB } from '../config/db.js';

export const getTrips = async (request, response) => {
    try {
        const db = getDB();
        const trips = await db.collection('trips').find().toArray(); // Query all trips
        response.json(trips);
    } catch (err) {
        console.error('Error fetching trips:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

export const createTrip = async (request, response) => {
    const { name, description } = request.body;

    if (!name) {
        return response.status(400).json({ message: 'Name is required' });
    }

    try {
        const db = getDB();
        const newTrip = {
            name,
            description,
            days: [],
            createdAt: new Date(),
        };
        const result = await db.collection('trips').insertOne(newTrip);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error('Error creating trip:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

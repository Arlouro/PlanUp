import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

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

    console.log("Request body received:", request.body);

    if (!name) {
        console.log("Validation error: Name is required");
        return response.status(400).json({ message: 'Name is required' });
    }

    try {
        const db = getDB();
        console.log("Connected to database");

        const newTrip = {
            name,
            description,
            days: [],
            createdAt: new Date(),
        };

        console.log("Inserting new trip:", newTrip);
        const result = await db.collection('trips').insertOne(newTrip);
        console.log("Insertion result:", result);

        response.status(201).json({ 
            id: result.insertedId,
            ...newTrip
        });
    } catch (err) {
        console.error("Error creating trip:", err.message);
        response.status(500).json({ message: 'Server error' });
    }
};

export const deleteTrip = async (request, response) => {
    const { id } = request.params;

    if (!ObjectId.isValid(id)) {
        return response.status(400).json({ message: 'Invalid trip ID' });
    }

    try {
        const db = getDB();
        console.log(`Deleting trip with ID: ${id}`);
        
        const result = await db.collection('trips').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return response.status(404).json({ message: 'Trip not found' });
        }

        response.status(200).json({ message: 'Trip deleted successfully' });
    } catch (err) {
        console.error('Error deleting trip:', err.message);
        response.status(500).json({ message: 'Server error' });
    }
};
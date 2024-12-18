import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Fetching -----------------<
export const getTrips = async (request, response) => {
    try {
        const db = getDB();
        const trips = await db.collection('trips').find().toArray();
        response.json(trips);
    } catch (err) {
        console.error('Error fetching trips:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

// Creation -----------------<
export const createTrip = async (request, response) => {
    console.log("Request body:", request.body);
    
    const { name, description, days, creator, participants } = request.body;

    if (!name) {
        return response.status(400).json({ message: 'Name is required' });
    }

    if (!days || !Array.isArray(days) || days.length === 0) {
        return response.status(400).json({ message: 'At least one day is required' });
    }

    const tripParticipants = (participants && Array.isArray(participants) && participants.length > 0) 
        ? participants 
        : [creator];

    console.log("Participants used:", tripParticipants);

    days.forEach((day, index) => {
        if (!day.date) {
            console.log(`Day at index ${index} is missing a date:`, day);
        }
    });

    try {
        const db = getDB();

        const tripDays = days.map((day, index) => {
            if (!day.date) {
                throw new Error(`Day at index ${index} is missing a date.`);
            }
            return {
                id: index + 1,
                date: day.date,
                activities: [],
            };
        });

        console.log("Mapped trip days:", tripDays);

        const newTrip = {
            name,
            description,
            participants: tripParticipants,
            creator,
            days: tripDays,
            createdAt: new Date(),
        };

        console.log("New trip object:", newTrip);

        const result = await db.collection('trips').insertOne(newTrip);

        const insertedTrip = { ...newTrip, _id: result.insertedId };

        response.status(201).json(insertedTrip);
        console.log('Trip created successfully:', insertedTrip);
    } catch (err) {
        console.error('Error creating trip:', err.message, err.stack);
        response.status(500).json({ message: 'Server error' });
    }
};



// Deletion -----------------<
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
            return response.status(404).json({ message: '🔎❌ Trip not found' });
        }

        response.status(200).json({ message: '🗑️ Trip deleted successfully' });
    } catch (err) {
        console.error('Error deleting trip:', err.message);
        response.status(500).json({ message: 'Server error' });
    }
};

// Update -----------------<
export const updateTrip = async (request, response) => {
    const { tripId } = request.params;
    const { name, description, days, participants } = request.body;

    if (!tripId || !name || !description) {
        return response.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        const db = getDB();

        const updatedTrip = {
            name,
            description,
            participants: participants || [],
            days: days || [],
            updatedAt: new Date(),
        };

        const result = await db.collection('trips').updateOne(
            { _id: new ObjectId(tripId) },
            { $set: updatedTrip }
        );

        if (result.matchedCount === 0) {
            return response.status(404).json({ message: 'Trip not found' });
        }

        response.status(200).json({ message: 'Trip updated successfully' });
    } catch (err) {
        console.error('Error updating trip:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

export const deleteAllTrips = async (request, response) => {
    try {
        const db = getDB();
        const result = await db.collection('trips').deleteMany({});
        response.json({ message: 'All trips deleted' });
    } catch (err) {
        console.error('Error deleting all trips:', err);
        response.status(500).json({ message: 'Server error' });
    }
}
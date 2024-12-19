import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Fetching -----------------<
export const getTrips = async (request, response) => {
    try {
        const db = getDB();
        const userId = request.user._id;
    
        const trips = await db
            .collection('trips')
            .find({ participants: userId })
            .toArray();
    
        response.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error.message);
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

// Update -----------------<
export const updateTrip = async (request, response) => {
    try {
        const { id } = request.params;
        const db = getDB();
        const userId = request.user._id;
    
        const trip = await db.collection('trips').findOne({ _id: new ObjectId(id) });
    
        if (!trip || trip.creator.toString() !== userId.toString()) {
            return response.status(403).json({ message: 'Forbidden: You can only update your own trips.' });
        }

        const updates = request.body;
        const result = await db
            .collection('trips')
            .updateOne({ _id: new ObjectId(id) }, { $set: updates });

        response.json({ message: 'Trip updated successfully.', result });
    } catch (error) {
        console.error('Error updating trip:', error.message);
        response.status(500).json({ message: 'Server error' });
    }
};  

// Deletion -----------------<
export const deleteTrip = async (request, response) => {
    try {
        const { id } = request.params;
        const db = getDB();
        const userId = request.user._id;

        const trip = await db.collection('trips').findOne({ _id: new ObjectId(id) });

        if (!trip || trip.creator.toString() !== userId.toString()) {
            return response.status(403).json({ message: 'Forbidden: You can only delete your own trips.' });
        }

        await db.collection('trips').deleteOne({ _id: new ObjectId(id) });
        response.json({ message: 'Trip deleted successfully.' });
    } catch (error) {
        console.error('Error deleting trip:', error.message);
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
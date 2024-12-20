import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';
import { eachDayOfInterval, parseISO } from 'date-fns';

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
    const { 
        name, 
        description, 
        destination,
        startDate, 
        endDate, 
        icon,
        participants 
    } = request.body;

    const creator = request.user._id;

    console.log("Incoming data:", request.body); // Log the incoming data
    console.log("Creator ID:", request.user); // Check if user is correctly attached


    if (!name || !startDate || !endDate || !destination) {
        return response.status(400).json({ 
            message: 'Name, destination, start date and end date are required' 
        });
    }

    try {
        const db = getDB();

        const days = eachDayOfInterval({
            start: parseISO(startDate),
            end: parseISO(endDate)
        }).map((date, index) => ({
            id: index + 1,
            date: date.toISOString().split('T')[0],
            activities: []
        }));

        const newTrip = {
            name,
            description,
            destination,
            icon,
            startDate,
            endDate,
            participants: participants || [creator],
            creator,
            days,
            createdAt: new Date()
        };

        const result = await db.collection('trips').insertOne(newTrip);
        const insertedTrip = { ...newTrip, _id: result.insertedId };

        await db.collection('users').updateOne(
            { _id: creator },
            { $push: { trips: result.insertedId } }
        );

        response.status(201).json(insertedTrip);
    } catch (err) {
        console.error('Error creating trip:', err);
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
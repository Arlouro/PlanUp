import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Fetching -----------------<
export const getActivitiesByDay = async (request, response) => {
    const { tripId, dayId } = request.params;

    if (!tripId || !dayId) {
        return response.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        const db = getDB();
        const activities = await db.collection('activities')
            .find({ tripId, dayId })
            .toArray();
        response.json(activities);
    } catch (err) {
        console.error('Error fetching activities:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

// Creation -----------------<
export const createActivity = async (request, response) => {
    const { tripId, dayId } = request.params;
    const { 
        description,
        time,
        price,
        isFree,
        location,
        duration 
    } = request.body;

    if (!tripId || !dayId || !description || !time || !location) {
        return response.status(400).json({ 
            message: 'Trip ID, day ID, description, time, and location are required' 
        });
    }

    try {
        const db = getDB();
        
        const newActivity = {
            activityId: new ObjectId(),
            tripId,
            dayId,
            description,
            time,
            price: isFree ? "0" : price,
            isFree,
            location,
            duration,
            state: 'pending',
            votes: { positive: 0, negative: 0 },
            createdAt: new Date()
        };

        const result = await db.collection('activities').insertOne(newActivity);
        newActivity._id = result.insertedId;

        const tripUpdateResult = await db.collection('trips').updateOne(
            { 
                _id: new ObjectId(tripId), 
                'days.id': parseInt(dayId) 
            },
            { 
                $push: { 'days.$.activities': newActivity }
            }
        );

        if (tripUpdateResult.modifiedCount === 0) {
            await db.collection('activities').deleteOne({ _id: newActivity._id });
            return response.status(404).json({ message: 'Trip or day not found' });
        }

        response.status(201).json({
            message: 'Activity created successfully',
            activity: newActivity
        });

    } catch (err) {
        console.error('Error creating activity:', err);
        response.status(500).json({ message: 'Server error' });
    }
};


// Deletion -----------------<
export const deleteActivity = async (request, response) => {
    const { activityId } = request.params;

    if (!activityId) {
        return response.status(400).json({ message: 'Activity ID is required' });
    }

    try {
        const db = getDB();

        const result = await db.collection('activities').deleteOne({ _id: new ObjectId(activityId) });

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: 'Activity not found' });
        }

        response.status(200).json({ message: 'Activity deleted successfully' });
    } catch (err) {
        console.error('Error deleting activity:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

// Update -----------------<
export const updateActivity = async (request, response) => {
    const { activityId } = request.params;
    const { location, time, description, votes } = request.body;

    if (!activityId) {
        return response.status(400).json({ message: 'Activity ID is required' });
    }

    try {
        const db = getDB();

        const updatedActivity = {
            location,
            time,
            description,
            votes: votes || { positive: 0, negative: 0 },
            updatedAt: new Date(),
        };

        const result = await db.collection('activities').updateOne(
            { _id: new ObjectId(activityId) },
            { $set: updatedActivity }
        );

        if (result.matchedCount === 0) {
            return response.status(404).json({ message: 'Activity not found' });
        }

        response.status(200).json({ message: 'Activity updated successfully' });
    } catch (err) {
        console.error('Error updating activity:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

// Vote -----------------<
export const voteActivity = async (request, response) => {
    const { activityId } = request.params;
    const { vote } = request.body;

    if (!activityId || !vote) {
        return response.status(400).json({ message: 'Activity ID and vote are required' });
    }

    try {
        const db = getDB();

        const activity = await db.collection('activities').findOne({ _id: new ObjectId(activityId) });

        if (!activity) {
            return response.status(404).json({ message: 'Activity not found' });
        }

        const updatedVotes = { ...activity.votes };
        updatedVotes[vote] += 1;

        const result = await db.collection('activities').updateOne(
            { _id: new ObjectId(activityId) },
            { $set: { votes: updatedVotes } }
        );

        if (result.matchedCount === 0) {
            return response.status(404).json({ message: 'Activity not found' });
        }

        response.status(200).json({ message: 'Vote registered successfully', votes: updatedVotes });
    } catch (err) {
        console.error('Error voting activity:', err);
        response.status(500).json({ message: 'Server error' });
    }
};

export const updateActivityState = async () => {
    try {
        const db = getDB();
        const activities = await db.collection('activities').find().toArray();

        activities.forEach(async (activity) => {
            if (activity.state === 'pending') {
                const totalVotes = activity.votes.positive + activity.votes.negative;

                const trip = await db.collection('trips').findOne({ _id: new ObjectId(activity.tripId) });
                const totalParticipants = trip.participants.length;

                const timeElapsed = (new Date() - new Date(activity.createdAt)) / (1000 * 60 * 60);
                const maxPendingTime = 24;

                if (totalVotes >= totalParticipants || timeElapsed >= maxPendingTime) {
                    const updatedState = activity.votes.positive > activity.votes.negative ? 'approved' : 'rejected';
                    
                    if (updatedState === 'rejected') {
                        await db.collection('activities').deleteOne({ _id: new ObjectId(activity._id) });
                        await db.collection('trips').updateOne(
                            { _id: new ObjectId(activity.tripId), 'days.id': parseInt(activity.dayId) },
                            { $pull: { 'days.$.activities': { _id: new ObjectId(activity._id) } } }
                        );
                    } else {
                        await db.collection('trips').updateOne(
                            { _id: new ObjectId(activity.tripId), 'days.id': parseInt(activity.dayId) },
                            { $set: { 'days.$.activities.$[activity].state': updatedState } },
                            { arrayFilters: [{ 'activity._id': new ObjectId(activity._id) }] }
                        );
                    }
                }
            }
        });
    } catch (err) {
        console.error('Error updating activity state:', err);
    }
};

export const getActivitiesByState = async (request, response) => {
    const { tripId, state } = request.params;

    if (!tripId || !state) {
        return response.status(400).json({ message: 'Trip ID and state are required' });
    }

    try {
        const db = getDB();
        const activities = await db.collection('activities')
            .find({ tripId, state })
            .toArray();
        response.json(activities);
    } catch (err) {
        console.error('Error fetching activities by state:', err);
        response.status(500).json({ message: 'Server error' });
    }
};


export const deleteAllActivities = async (request, response) => {
    try {
        const db = getDB();
        const result = await db.collection('activities').deleteMany({});
        response.status(200).json({ message: 'All activities deleted successfully' });
    } catch (err) {
        console.error('Error deleting all activities:', err);
        response.status(500).json({ message: 'Server error' });
    }
};
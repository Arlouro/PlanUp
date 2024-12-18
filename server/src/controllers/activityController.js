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
    const { location, time, description } = request.body;

    if (!tripId || !dayId || !location || !time || !description) {
        return response.status(400).json({ message: 'Required fields are missing' });
    }

    try {
        const db = getDB();

        const newActivity = {
            tripId,
            dayId,
            location,
            time,
            description,
            votes: { positive: 0, negative: 0 },
            createdAt: new Date(),
        };

        const result = await db.collection('activities').insertOne(newActivity);

        newActivity._id = result.insertedId;

        const tripUpdateResult = await db.collection('trips').updateOne(
            { _id: new ObjectId(tripId), 'days.id': parseInt(dayId) },
            { $push: { 'days.$.activities': newActivity } }
        );

        if (tripUpdateResult.modifiedCount === 0) {
            return response.status(404).json({ message: 'Trip or day not found' });
        }

        response.status(201).json({
            message: 'Activity created and trip updated successfully',
            activity: newActivity,
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
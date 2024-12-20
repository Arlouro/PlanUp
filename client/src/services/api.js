const API_URL = 'http://localhost:5000/api';
const GOOGLE_URL = 'http://localhost:5000/auth/google';

export const authAPI = {
  loginWithGoogle: () => {
    window.location.href = `${GOOGLE_URL}`;
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return response.ok;
  }
};

export const tripsAPI = {
  getAllTrips: async () => {
    const response = await fetch(`${API_URL}/trips`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch trips');
    return response.json();
  },

  createTrip: async (tripData) => {
    const response = await fetch(`${API_URL}/trips`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripData)
    });
    if (!response.ok) throw new Error('Failed to create trip');
    return response.json();
  },

  deleteTrip: async (tripId) => {
    const response = await fetch(`${API_URL}/trips/${tripId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete trip');
    return response.json();
  },

  updateTrip: async (tripId, updates) => {
    const response = await fetch(`${API_URL}/trips/${tripId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update trip');
    return response.json();
  }
};

export const activitiesAPI = {
  getActivitiesByDay: async (tripId, dayId) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/${dayId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  },

  createActivity: async (tripId, dayId, activityData) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/${dayId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activityData)
    });
    if (!response.ok) throw new Error('Failed to create activity');
    return response.json();
  },

  updateActivity: async (tripId, dayId, activityId, updates) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/${dayId}/${activityId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update activity');
    return response.json();
  },

  deleteActivity: async (tripId, dayId, activityId) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/${dayId}/${activityId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete activity');
    return response.json();
  },

  voteActivity: async (tripId, dayId, activityId, vote) => {
    const response = await fetch(`${API_URL}/trips/${tripId}/${dayId}/${activityId}/vote`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vote })
    });
    if (!response.ok) throw new Error('Failed to vote on activity');
    return response.json();
  }
};
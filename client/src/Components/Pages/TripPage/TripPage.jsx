import React, { useEffect, useState } from "react";
import "./TripPage.css";
import plane from "../../Assets/png/plane.png";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { tripsAPI, activitiesAPI } from "../../../services/api";
import AddActivityCard from "../AddActivityCard/AddActivityCard";

const TripPage = () => {
  const [planePosition, setPlanePosition] = useState(-2);
  const [trips, setTrips] = useState([]);
  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsData = await tripsAPI.getAllTrips();
        setTrips(tripsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load trips");
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = docHeight - windowHeight;
      const scrollPercentage = scrollTop / scrollableHeight;
      const newPlanePosition = scrollPercentage * 100;
      setPlanePosition(newPlanePosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchActivities = async (trip) => {
    try {
      const activitiesData = await Promise.all(
        trip.days.map((day) =>
          activitiesAPI.getActivitiesByDay(trip._id, day.id.toString())
        )
      );
      return activitiesData.flat();
    } catch (err) {
      throw new Error("Failed to load trip activities");
    }
  };

  const handleTripSelect = async (trip) => {
    try {
      setSelectedTrip(trip);
      const activitiesData = await fetchActivities(trip);
      setActivities(activitiesData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNext = () => {
    setCurrentTripIndex((prev) => (prev === trips.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentTripIndex((prev) => (prev === 0 ? trips.length - 1 : prev - 1));
  };

  const handleVote = async (tripId, dayId, activityId, vote) => {
    try {
      await activitiesAPI.voteActivity(tripId, dayId, activityId, vote === "👍" ? "positive" : "negative");
      if (selectedTrip) {
        const updatedActivities = await fetchActivities(selectedTrip);
        setActivities(updatedActivities);
      }
    } catch (err) {
      setError("Failed to submit vote");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="containerTP">
      <div className="coluna-aviao">
        <img src={cloud1} alt="cloud" className="cloud cloud1" />
        <img src={cloud1} alt="cloud" className="cloud cloud1-2" />
        <img src={cloud2} alt="cloud" className="cloud cloud2" />
        <img src={cloud2} alt="cloud" className="cloud cloud2-2" />
        <img src={cloud3} alt="cloud" className="cloud cloud3" />
        <img src={cloud3} alt="cloud" className="cloud cloud3-2" />
        <img
          src={plane}
          alt="plane"
          className="aviao"
          style={{ top: `${planePosition}vh` }}
        />
      </div>
      <div className="all-body">
        <div className="wrapper-box">
          <button className="btn" onClick={handlePrev}>
            <FaArrowLeft />
          </button>
          <div className="trips-carousel" id="trip-go">
            {trips.map((trip, index) => (
              <div
                key={trip._id}
                className={`trip-card ${
                  index === currentTripIndex ? "active" : ""
                }`}
                onClick={() => handleTripSelect(trip)}
              >
                <img
                  src={trip.icon}
                  alt={trip.destination}
                  className="trip-icon-image"
                />
                <h3>{trip.destination}</h3>
                <p>
                  {trip.startDate} - {trip.endDate}
                </p>
              </div>
            ))}
          </div>
          <button className="btn" onClick={handleNext}>
            <FaArrowRight />
          </button>
        </div>

        {selectedTrip && (
          <div className="trip-details" id="activity">
            <h2>Trip to {selectedTrip.destination}</h2>
            <p>Location: {selectedTrip.location}</p>
            <p>Start Date: {selectedTrip.startDate}</p>
            <p>End Date: {selectedTrip.endDate}</p>
            <p>Description: {selectedTrip.description}</p>

            <AddActivityCard
              trip={selectedTrip}
              onActivityAdded={async () => {
                const updatedActivities = await fetchActivities(selectedTrip);
                setActivities(updatedActivities);
              }}
            />

            <div className="activities-section">
              <h3>Activities</h3>
              {activities.length === 0 ? (
                <p>No Activities added yet</p>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity._id}
                    className={`activity-card ${
                      activity.state === "pending" ? "pending" : ""
                    }`}
                  >
                    <h4>{activity.name}</h4>
                    <p>Location: {activity.location}</p>
                    <p>Time: {activity.time}</p>
                    <p>Duration: {activity.duration}</p>
                    {activity.state === "pending" && (
                      <div className="vote-buttons">
                        <button
                          onClick={() =>
                            handleVote(
                              selectedTrip._id,
                              activity.dayId,
                              activity._id,
                              "👍"
                            )
                          }
                        >
                          👍 {activity.votes?.positive || 0}
                        </button>
                        <button
                          onClick={() =>
                            handleVote(
                              selectedTrip._id,
                              activity.dayId,
                              activity._id,
                              "👎"
                            )
                          }
                        >
                          👎 {activity.votes?.negative || 0}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;
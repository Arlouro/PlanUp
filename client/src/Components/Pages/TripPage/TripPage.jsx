import React, { useEffect, useState } from "react";
import "./TripPage.css";
import plane from "../../Assets/png/plane.png";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { tripsAPI, activitiesAPI } from "../../../services/api";
import AddActivityCard from "../../AddActivityCard/AddActivityCard";

const TripPage = () => {
  const [planePosition, setPlanePosition] = useState(-2);
  const [trips, setTrips] = useState([]);
  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: "", description: "" });
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

  const handleTripSelect = async (trip) => {
    try {
      const activitiesData = await Promise.all(
        trip.days.map((dayId) =>
          activitiesAPI.getActivitiesByDay(trip.id, dayId)
        )
      );
      setSelectedTrip(trip);
      setActivities(activitiesData.flat());
    } catch (err) {
      setError("Failed to load trip activities");
    }
  };

  const handleNext = () => {
    setCurrentTripIndex((prev) =>
      prev === trips.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentTripIndex((prev) =>
      prev === 0 ? trips.length - 1 : prev - 1
    );
  };

  const handleVote = async (tripId, dayId, activityId, vote) => {
    try {
      await activitiesAPI.voteActivity(tripId, dayId, activityId, vote);
      if (selectedTrip) {
        const updatedActivities = await Promise.all(
          selectedTrip.days.map((dayId) =>
            activitiesAPI.getActivitiesByDay(selectedTrip.id, dayId)
          )
        );
        setActivities(updatedActivities.flat());
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
          <div className="trips-carousel">
            {trips.map((trip, index) => (
              <div
                key={trip.id}
                className={`trip-card ${
                  index === currentTripIndex ? "active" : ""
                }`}
                onClick={() => handleTripSelect(trip)}
              >
                <img src={trip.thumbnail} alt={trip.destination} />
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
          <div className="trip-details">
            <h2>Trip to {selectedTrip.destination}</h2>
            <p>Location: {selectedTrip.location}</p>
            <p>Start Date: {selectedTrip.startDate}</p>
            <p>End Date: {selectedTrip.endDate}</p>
            <p>Description: {selectedTrip.description}</p>

            <AddActivityCard 
              trip={selectedTrip} 
              onActivityAdded={async (newActivity) => {
                const updatedActivities = await Promise.all(
                  selectedTrip.days.map((dayId) =>
                    activitiesAPI.getActivitiesByDay(selectedTrip.id, dayId)
                  )
                );
                setActivities(updatedActivities.flat());
              }}
            />

            <div className="activities-section">
              <h3>Activities</h3>
              {activities
                .filter(activity => activity.tripId === selectedTrip.id)
                .map((activity) => (
                  <div
                    key={activity.id}
                    className={`activity-card ${
                      activity.status === "pending" ? "pending" : ""
                    }`}
                  >
                    <h4>{activity.name}</h4>
                    <p>{activity.description}</p>
                    {activity.status === "pending" && (
                      <div className="vote-buttons">
                        <>
                          <button
                            onClick={() =>
                              handleVote(
                                selectedTrip.id,
                                activity.dayId,
                                activity.id,
                                "up"
                              )
                            }
                          >
                            👍 {activity.upvotes}
                          </button>
                          <button
                            onClick={() =>
                              handleVote(
                                selectedTrip.id,
                                activity.dayId,
                                activity.id,
                                "down"
                              )
                            }
                          >
                            👎 {activity.downvotes}
                          </button>
                        </>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;

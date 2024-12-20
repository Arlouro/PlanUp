import React, { useState } from "react";
import { activitiesAPI } from "../../../services/api";
import "./AddActivityCard.css";

const AddActivityCard = ({ trip, onActivityAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [activityData, setActivityData] = useState({
    name: "",
    time: "",
    hours: "",
    minutes: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDay) {
      setError("Day selection is required");
      return;
    }

    if (!activityData.name || !activityData.location) {
      setError("Name and location are required");
      return;
    }

    const formattedTime =
      activityData.hours && activityData.minutes
        ? `${activityData.hours.padStart(
            2,
            "0"
          )}:${activityData.minutes.padStart(2, "0")}`
        : "";

    try {
      setLoading(true);
      setError(null);

      const newActivity = {
        name: activityData.name,
        description: activityData.description,
        location: activityData.location,
        time: formattedTime,
        status: "pending",
      };
      
      const response = await activitiesAPI.createActivity(
        trip._id,
        selectedDay.id,
        newActivity
      );

      setActivityData({
        name: "",
        time: "",
        hours: "",
        minutes: "",
        location: "",
        description: "",
      });

      if (onActivityAdded) {
        onActivityAdded(response);
      }
    } catch (err) {
      setError(err.message || "Failed to create activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-activity-card">
      <div className="header">
        <h2>Add Activity</h2>
      </div>

      <div className="form">
        {error && <div className="error-message">{error}</div>}

        {trip && (
          <div className="form-group">
            <p>Select a day:</p>
            <div className="day-buttons">
              {trip.days.map((day, index) => (
                <button
                  key={index}
                  className={`day-button ${
                    selectedDay === day ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <input
            type="text"
            placeholder="Activity name"
            value={activityData.name}
            onChange={(e) =>
              setActivityData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="input"
          />
        </div>

        <div className="time-inputs">
          <input
            type="number"
            placeholder="H"
            min="0"
            max="23"
            value={activityData.hours}
            onChange={(e) =>
              setActivityData((prev) => ({ ...prev, hours: e.target.value }))
            }
            className="input"
          />
          <span>H</span>
          <input
            type="number"
            placeholder="M"
            min="0"
            max="59"
            value={activityData.minutes}
            onChange={(e) =>
              setActivityData((prev) => ({ ...prev, minutes: e.target.value }))
            }
            className="input"
          />
          <span>M</span>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={activityData.location}
            onChange={(e) =>
              setActivityData((prev) => ({ ...prev, location: e.target.value }))
            }
            className="input"
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Description"
            value={activityData.description}
            onChange={(e) =>
              setActivityData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityCard;

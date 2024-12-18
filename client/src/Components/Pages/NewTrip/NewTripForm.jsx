import React from "react";
import "./NewTrip.css";
import plane from "../../Assets/png/plane.png";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";
import mapa from "../../Assets/png/mapa.jpg";

const NewTripForm = () => {
  return (
    <div className="containerTP">
      <div className="coluna-aviao">
        <img src={cloud1} alt="cloud" className="cloud cloud1" />
        <img src={cloud1} alt="cloud" className="cloud cloud1-2" />
        <img src={cloud2} alt="cloud" className="cloud cloud2" />
        <img src={cloud2} alt="cloud" className="cloud cloud2-2" />
        <img src={cloud3} alt="cloud" className="cloud cloud3" />
        <img src={cloud3} alt="cloud" className="cloud cloud3-2" />
        <img src={plane} alt="plane" className="aviao" />
      </div>
      <div className="all-body">
        <form>
          <input type="text" id="trip-name" placeholder="Trip Name" required />
          <div className="input-create-box">
            <input type="text" placeholder="Add Description" />
          </div>
          <div className="input-create-box">
            <input type="text" placeholder="Add Destination" required />
          </div>
          <div className="input-create-box">
            <input type="date" placeholder="Start Date" required />
          </div>
          <div className="input-create-box">
            <input type="date" placeholder="End Date" required />
          </div>
          <button id="create-btn" type="submit">
            Create Trip
          </button>

          <form class="add-activity-container">
            <h2 class="title">Adding Activity</h2>
            <div class="add-sub-container">
              <div class="left-section">
                <input type="text" placeholder="activity name" required />
                <div className="hour-price-container">
                  <div className="hour-container">
                    <input type="text" placeholder="" name="hour" />:{" "}
                    <input type="text" placeholder="" name="minute" />H
                  </div>

                  <div className="price-container">
                    <input type="text" placeholder="price" />

                    <div className="price-checkbox">
                      <label for="free">Free</label>
                      <input type="checkbox" id="free" name="free" />
                    </div>
                  </div>
                </div>
                <input type="text" placeholder="location" required />
                <input type="text" placeholder="duration" />
              </div>
              <div class="right-section">
                <img src={mapa} alt="" className="mapa" />
              </div>
            </div>
            <button id="add-activity-btn" type="submit">
              Add Activity
            </button>
          </form>
        </form>
      </div>
    </div>
  );
};

export default NewTripForm;

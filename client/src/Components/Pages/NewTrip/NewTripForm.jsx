import React from "react";
import "./NewTrip.css";
import plane from "../../Assets/png/plane.png";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";

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
          <button id="create-btn" type="submit">Create Trip</button>
        </form>
      </div>
    </div>
  );
};

export default NewTripForm;

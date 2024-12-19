import React, { useState } from "react";
import "./NewTrip.css";
import plane from "../../Assets/png/plane.png";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";
import mapa from "../../Assets/png/mapa.jpg";
import usa from "../../Assets/png/USA.png";
import uk from "../../Assets/png/UK.png";
import france from "../../Assets/png/France.png";
import portugal from "../../Assets/png/Portugal.png";
import netherland from "../../Assets/png/Netherlands.png";
import more from "../../Assets/png/plus.png";

const NewTripForm = () => {
  const [selectedIcon, setSelectedIcon] = useState(more);
  const [isIconPickerOpen, setIconPickerOpen] = useState(false);

  const icons = [
    { id: 1, src: usa, alt: "USA" },
    { id: 2, src: uk, alt: "UK" },
    { id: 3, src: france, alt: "France" },
    { id: 4, src: portugal, alt: "Portugal" },
    { id: 5, src: netherland, alt: "Netherland" },
  ];

  const handleIconSelect = (iconSrc) => {
    setSelectedIcon(iconSrc);
    setIconPickerOpen(false);
  };

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
          <div className="name-icon">
            <div
              className="icon-picker"
              onClick={() => setIconPickerOpen(!isIconPickerOpen)}
            >
              <img
                src={selectedIcon}
                alt="Selected Icon"
                width="40"
                height="40"
              />
            </div>

            <input
              type="text"
              id="trip-name"
              placeholder="Trip Name"
              required
            />
          </div>
          {isIconPickerOpen && (
            <div className="icon-scroller">
              {icons.map((icon) => (
                <img
                  key={icon.id}
                  src={icon.src}
                  alt={icon.alt}
                  width="20"
                  height="20"
                  className="icon-option"
                  onClick={() => handleIconSelect(icon.src)}
                />
              ))}
            </div>
          )}
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
          <form className="add-activity-container">
            <h2 className="title">Adding Activity</h2>
            <div className="add-sub-container">
              <div className="left-section">
                <input type="text" placeholder="activity name" required />
                <div className="hour-price-container">
                  <div className="hour-container">
                    <input type="text" placeholder="" name="hour" />:{" "}
                    <input type="text" placeholder="" name="minute" />H
                  </div>

                  <div className="price-container">
                    <input type="text" placeholder="price" />

                    <div className="price-checkbox">
                      <label htmlFor="free">Free</label>
                      <input type="checkbox" id="free" name="free" />
                    </div>
                  </div>
                </div>
                <input type="text" placeholder="location" required />
                <input type="text" placeholder="duration" />
              </div>
              <div className="right-section">
                <img src={mapa} alt="" className="mapa" />
              </div>
            </div>
            <button id="add-activity-btn" type="submit">
              Add Activity
            </button>
          </form>
          <button id="create-btn" type="submit">
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTripForm;

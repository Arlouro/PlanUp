import React, { useEffect, useState } from "react";
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
import { tripsAPI } from "../../../services/api";

const NewTripForm = () => {
  const [selectedIcon, setSelectedIcon] = useState(more);
  const [isIconPickerOpen, setIconPickerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    destination: "",
    startDate: "",
    endDate: "",
    icon: null,
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [planePosition, setPlanePosition] = useState(-2);

  const icons = [
    { id: 1, src: usa, alt: "USA" },
    { id: 2, src: uk, alt: "UK" },
    { id: 3, src: france, alt: "France" },
    { id: 4, src: portugal, alt: "Portugal" },
    { id: 5, src: netherland, alt: "Netherland" },
  ];

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleIconSelect = (iconSrc) => {
    setSelectedIcon(iconSrc);
    setFormData({ ...formData, icon: iconSrc });
    setIconPickerOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.destination || !formData.startDate || !formData.endDate) {
        setPopupMessage("All required fields must be filled.");
        setPopupType("error");
        return;
      }

      await tripsAPI.createTrip(formData);
      setPopupMessage("Trip created successfully!");
      setPopupType("success");

      // Reset form
      setFormData({
        name: "",
        description: "",
        destination: "",
        startDate: "",
        endDate: "",
        icon: null,
      });
      setSelectedIcon(more);
    } catch (error) {
      setPopupMessage("Failed to create trip. Please try again.");
      setPopupType("error");
    }
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
        <img src={plane} alt="plane" className="aviao" style={{ top: `${planePosition}vh` }} />
      </div>
      <div className="all-body">
        <form onSubmit={handleSubmit}>
          <div className="name-icon">
            <div className="icon-picker" onClick={() => setIconPickerOpen(!isIconPickerOpen)}>
              <img src={selectedIcon} alt="Selected Icon" width="40" height="40" />
            </div>

            <input
              type="text"
              name="name"
              id="trip-name"
              placeholder="Trip Name"
              value={formData.name}
              onChange={handleInputChange}
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
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-create-box">
            <input
              type="text"
              name="destination"
              placeholder="Add Destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-create-box">
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-create-box">
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <button id="create-btn" type="submit">
            Create Trip
          </button>
        </form>
      </div>

      {popupMessage && (
        <div className={`popup ${popupType}`}>
          <p>{popupMessage}</p>
          <button onClick={() => setPopupMessage("")}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NewTripForm;

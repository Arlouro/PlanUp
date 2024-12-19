import React, { useEffect, useState } from "react";
import "./TripPage.css";
import plane from "../../Assets/png/plane.png";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const TripPage = () => {
 
  const [planePosition, setPlanePosition] = useState(-2);

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

 
  return (
    <div className="containerTP">
      <div className="coluna-aviao">
        <img src={cloud1} alt="cloud" className="cloud cloud1" />
        <img src={cloud1} alt="cloud" className="cloud cloud1-2" />
        <img src={cloud2} alt="cloud" className="cloud cloud2" />
        <img src={cloud2} alt="cloud" className="cloud cloud2-2" />
        <img src={cloud3} alt="cloud" className="cloud cloud3" />
        <img src={cloud3} alt="cloud" className="cloud cloud3-2" />
        <img src={plane} alt="plane" className="aviao" style={{ top: `${planePosition}vh` }}/>
      </div>
      <div className="all-body">
      <div className="wrapper-box">
        <button className="btn">
          <FaArrowLeft />
        </button>
        <button className="btn">
          <FaArrowRight />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TripPage;

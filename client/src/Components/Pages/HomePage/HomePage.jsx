import React from "react";
import "./HomePage.css";
import logo from "../../Assets/svg/Logo.svg";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";

const HomePage = () => {
  return (
    <div className="containerHP">
      <nav className="navbarHP">
      <img src={logo} alt="logo" className="logotype"/>
        <ul>
          <li>
            <a className="su" href="/signup">Sign Up</a>
          </li>
          <li>
            <a className="log" href="/login">Login</a>
          </li>
        </ul>
      </nav>

      <h1 className="appNameHP">PlanUp</h1>

      <div className="clouds">
          <img src={cloud1} alt="cloud" className="cloud cloud1" />
          <img src={cloud1} alt="cloud" className="cloud cloud1-2" />
          <img src={cloud2} alt="cloud" className="cloud cloud2" />
          <img src={cloud2} alt="cloud" className="cloud cloud2-2" />
          <img src={cloud3} alt="cloud" className="cloud cloud3" />
          <img src={cloud3} alt="cloud" className="cloud cloud3-2" />
        </div>

    </div>
  );
};

export default HomePage;

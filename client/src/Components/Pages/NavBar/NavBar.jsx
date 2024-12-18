import React from "react";
import "./NavBar.css";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">PlanUp</div>
        <nav className="nav-links">
          <div className="nav-links-top">
            <a href="/mytrip">MyTrips</a>
            <a href="/newtrip">NewTrip</a>
            <a href="/notifications">Notifications</a>
          </div>
          <div className="nav-links-bottom">
          <a href="#trip">Trip</a>
          <a href="#activity">Activity</a>
          <a href="#vote">Vote</a>
          </div>
        </nav>
        <div className="usersection">
          <span className="username">Maria Rosa</span>
          <IoPerson className="usericon" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

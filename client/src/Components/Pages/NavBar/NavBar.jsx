import React from "react";
import "./NavBar.css";
import { IoPerson } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let username = "Maria Rosa"; //modificar
  let avatarUrl = `https://ui-avatars.com/api/?name=${username}&background=fff&color=random&size=55&rounded=true`;
  
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
          {location.pathname === "/mytrip" && (
            <div className="nav-links-bottom">
              <a href="#trip">Trip</a>
              <a href="#activity">Activity</a>
              <a href="#vote">Vote</a>
            </div>
          )}
        </nav>
        <div className="usersection">
          <span className="username">Maria Rosa</span>
          <img src={avatarUrl} alt={username} className="usericon" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

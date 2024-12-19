import React from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let username = "Maria Rosa"; // Replace with dynamic username if needed
  let avatarUrl = `https://ui-avatars.com/api/?name=${username}&background=fff&color=000&size=55&rounded=true`;

  const handleSignOut = () => {
    // Replace with actual sign-out logic (e.g., clearing tokens, API calls)
    window.location.href = "/login";
  };

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
          <span className="username">{username}</span>
          <details className="dropdown">
            <summary role="button" className="usericon-wrapper">
              <img src={avatarUrl} alt={username} className="usericon" />
            </summary>
            <ul>
              <li>
                <a href="/profile">View Profile</a>
              </li>
              <li>
                <button onClick={handleSignOut} className="signout-button">
                  Sign Out
                </button>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

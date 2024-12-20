import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import { authAPI } from "../../../services/api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      const success = await authAPI.logout();
      if (success) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (!user) {
    return null;
  }

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
              <a href="#trip-go">Trip</a>
              <a href="#activity">Activity</a>
              <a href="#vote">Vote</a>
            </div>
          )}
        </nav>
        <div className="usersection">
          <span className="username">{user.name}</span>
          <details className="dropdown">
            <summary role="button" className="usericon-wrapper">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=fff&color=000&size=55&rounded=true`}
                alt={user.name} 
                className="usericon" 
              />
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
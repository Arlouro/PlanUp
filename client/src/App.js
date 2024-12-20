import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Pages/NavBar/NavBar';
import LoginForm from './Components/Pages/LoginSignUpForm/LoginForm';
import SignUpForm from './Components/Pages/LoginSignUpForm/SignUpForm';
import HomePage from './Components/Pages/HomePage/HomePage';
import TripPage from './Components/Pages/TripPage/TripPage';
import NewTripForm from './Components/Pages/NewTrip/NewTripForm';
import Notification from './Components/Pages/Notifications/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/mytrip" element={ <><Navbar /> <TripPage /></>} />
        <Route path="/newtrip" element={ <><Navbar /> <NewTripForm /></>} />
        <Route path="/notifications" element={ <><Navbar /> <Notification /></>} />
      </Routes>
    </Router>
  );
}

export default App;

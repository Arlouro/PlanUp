import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignUpForm.css";
import cloud1 from "../../Assets/png/cloud1.png";
import cloud2 from "../../Assets/png/cloud2.png";
import cloud3 from "../../Assets/png/cloud3.png";
import plane from "../../Assets/png/plane.png";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/mytrip");
  };

  return (
    <div className="container">
      <h1 className="appName">PlanUp</h1>

      <div className="wrapper">
        <div className="clouds">
          <img src={cloud1} alt="cloud" className="cloud cloud1" />
          <img src={cloud1} alt="cloud" className="cloud cloud1-2" />
          <img src={cloud2} alt="cloud" className="cloud cloud2" />
          <img src={cloud2} alt="cloud" className="cloud cloud2-2" />
          <img src={cloud3} alt="cloud" className="cloud cloud3" />
          <img src={cloud3} alt="cloud" className="cloud cloud3-2" />
        </div>

        <div className="plane">
          <img src={plane} alt="plane" />
        </div>

        <form onSubmit={handleLogin} className="mega-form">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <div className="remember">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a> {/*MODIFICAR */}
          </div>

          <button type="submit">Login</button>
          <button
            type="button"
            className="google-button"
            aria-label="Login with Google"
          >
            <FaGoogle className="google-icon" />
          </button>
          
          <div className="signup">
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

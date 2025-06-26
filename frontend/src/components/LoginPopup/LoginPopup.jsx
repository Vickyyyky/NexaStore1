import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currState === "Sign Up") {
        const regRes = await axios.post(`http://localhost:4000/api/user/register`, data);
        console.log(regRes.status)
        if (regRes.status === 201 ) {
          alert("Account created successfully! Now login to continue.");
          setCurrState("Login"); // switch to login form
        } else {
          alert(regRes.data.message || "Something went wrong.");
        }
      } else {
        const loginRes = await axios.post(`${url}/api/user/login`, data);
        if (loginRes.data.success) {
          setToken(loginRes.data.token);
          localStorage.setItem("token", loginRes.data.token);
          setShowLogin(false);
          alert("Login successful!");
          navigate("/");
        } else {
          alert(loginRes.data.message);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-popup ${darkMode ? "dark-mode" : ""}`}>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
            className="close-icon"
          />
          <button
            type="button"
            className="toggle-mode"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required /> <p>I agree to terms</p>
        </div>

        {currState === "Login" ? (
          <p>
            No account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Sign up</span>
          </p>
        ) : (
          <p>
            Have account?{" "}
            <span onClick={() => setCurrState("Login")}>Login</span>
          </p>
        )}

        <GoogleLogin
          onSuccess={(cred) => console.log("Google success", cred)}
          onError={() => console.log("Google failed")}
        />
      </form>
    </div>
  );
};

export default LoginPopup;

import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordagain] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      setPasswordError("Passwords do not match");
      return;
    }
    const user = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/add-user",
        user
      );
      navigate("/login");
    } catch (err) {}
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">
              {" "}
              Register with your email and password
            </h3>
            <span className="loginDesc"></span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                className="loginInput"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                placeholder="Email"
                required
                className="loginInput"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                placeholder="Password"
                required
                type="password"
                className="loginInput"
                minLength="6"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                placeholder="Password Again"
                required
                type="password"
                className="loginInput"
                onChange={(e) => {
                  setPasswordagain(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && <p className="error">{passwordError}</p>}
              <button className="loginButton" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 
      <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-confirm">Confirm Password:</label>
          <input
            type="password"
            id="password-confirm"
            name="password-confirm"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
 */}
    </>
  );
}

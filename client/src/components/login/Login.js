import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
   try{
    const res = await axios.post(
      "http://localhost:5000/api/auth/login-user",
      user
    )
    // console.log(res)
    navigate("/adduser");
   }catch(err){
    console.log(err.response.data)
   }
 
    
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Already Registered? </h3>
          <span className="loginDesc" style={{ marginLeft: "80px" }}>
            If not, Register first
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="loginButton" type="submit">
              Log in
            </button>

            <span className="loginForgot">Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import FireworksBg from "../assets/fireworks2.jpg";
import "../styles/Login.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleInputChange(event) {
    setPhoneNumber(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPhoneNumber("");
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${FireworksBg})` }}>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label>Enter your phone number to continue</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder=""
          />
        </form>
      </div>
    </div>
  );
}

export default Login;

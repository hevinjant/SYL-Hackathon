import React, { useState } from "react";
import FireworksBg from "../assets/fireworks2.jpg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import database from "../Firebase";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const init_goal = {
  january: null,
  february: null,
  march: null,
  april: null,
  may: null,
  june: null,
  july: null,
  august: null,
  september: null,
  october: null,
  november: null,
  december: null,
};

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  function handleInputChange(event) {
    setPhoneNumber(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addUserToDatabase();
    localStorage.setItem("userPhoneNumber", phoneNumber);
    setPhoneNumber("");
    navigate("/home");
  }

  async function addUserToDatabase() {
    const docRef = doc(database, "users", phoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("user exists.");
    } else {
      await setDoc(doc(database, "users", phoneNumber), init_goal);
    }
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

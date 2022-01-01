import React, { useState, useEffect } from "react";
import Stake from "../components/Stake";
import FireworksBg from "../assets/fireworks2.jpg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import database from "../Firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const [amount, setAmount] = useState("");
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");
  const navigate = useNavigate();

  function handleAmount(amount) {
    setAmount(amount);
  }

  function login() {
    updateUserBalance();
    setAmount("");
  }

  async function updateUserBalance() {
    const docRef = doc(database, "users", userPhoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(
        doc(database, "users", userPhoneNumber),
        {
          balance: parseInt(amount),
        },
        { merge: true }
      );
      navigate("/home");
    }
  }

  return (
    <div className="welcome" style={{ backgroundImage: `url(${FireworksBg})` }}>
      <div
        className="welcome-container"
        id={parseInt(amount) > 0 ? "show" : "hide"}
      >
        <p className="intro">
          Welcome to NewYearNewToken! <br />
          Let's get your new year resolutions done!
        </p>
        <Stake amount={amount} handleAmount={handleAmount} />
        <button className="login-button" onClick={login}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Welcome;

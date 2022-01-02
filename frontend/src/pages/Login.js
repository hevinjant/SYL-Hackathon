import React, { useState, useEffect } from "react";
import FireworksBg from "../assets/fireworks2.jpg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import database from "../Firebase";
import { useNavigate } from "react-router-dom";
import { getBalance, NYNTAbi, NYNTAddress } from "../Web3";
import Web3 from "web3";
import "../styles/Login.css";

const init_goal = {
  goals: {
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
  },
};

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function _getBalance() {
      if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const defaultUser = (await web3.eth.getAccounts())[0];
        console.log("USER:", defaultUser);
        const balance = await web3.eth.getBalance(defaultUser);
        console.log("ETH BALANCE:", balance);
        const NYNTContract = new web3.eth.Contract(NYNTAbi, NYNTAddress);
        // await NYNTContract.methods
        //   .mint(defaultUser, balance * 0.05 * 100)
        //   .send();
        const NYNTBalance = await NYNTContract.methods
          .balanceOf(defaultUser)
          .call();
        console.log("NYNT Balance:", NYNTBalance);
      }
    }
    _getBalance();
  }, []);

  function handleInputChange(event) {
    setPhoneNumber(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function login() {
    addUserToDatabase();
    localStorage.setItem("userPhoneNumber", phoneNumber);
    setPhoneNumber("");
  }

  async function addUserToDatabase() {
    const docRef = doc(database, "users", phoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("user exists.");
      navigate("/home");
    } else {
      await setDoc(doc(database, "users", phoneNumber), init_goal);
      navigate("/welcome");
    }
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${FireworksBg})` }}>
      <div className="login-container">
        <h1>NewYearNewToken!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </form>
        <button className="continue-button" onClick={login}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Login;

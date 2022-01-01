import React, { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import database from "../Firebase";
import "../styles/Balance.css";

function Balance() {
  const [balance, setBalance] = useState(0);
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");

  useEffect(() => {
    fetchBalance();
  });

  function handleClick() {}

  async function fetchBalance() {
    const docRef = doc(database, "users", userPhoneNumber);
    const docSnap = await getDoc(docRef);
    const balance = docSnap.data().balance;
    setBalance(balance);
  }
  return (
    <div className="balance">
      <div className="balance-container">
        <p>
          You have <strong>{balance}</strong> NYNT
        </p>
        <button onClick={handleClick}>Stake</button>
      </div>
    </div>
  );
}

export default Balance;

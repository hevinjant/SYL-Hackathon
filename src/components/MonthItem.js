import React from "react";
import Form from "./Form";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import database from "../Firebase";
import "../styles/MonthItem.css";

function MonthItem({ monthName, monthImg, monthGoal }) {
  const [submit, setSubmit] = useState(false);
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");
  useEffect(() => {
    if (monthGoal != null) {
      setSubmit(true);
    }
  }, [monthGoal]);

  const handleSubmit = (goal) => {
    insertGoalToDatabase(goal);
  };

  async function insertGoalToDatabase(goal) {
    const docRef = doc(database, "users", userPhoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDoc(
        doc(database, "users", userPhoneNumber),
        { [monthName.toLowerCase()]: goal },
        { merge: true }
      );
    }
  }

  return (
    <div className="month-item">
      <div className="month-item-container">
        <img src={monthImg} alt=""></img>
        <p className="header">{monthName}</p>
        {!submit ? (
          <div className="goal-enter">
            <Form formLabel={monthName} handleFormSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="goal-display">
            <p>{monthGoal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthItem;

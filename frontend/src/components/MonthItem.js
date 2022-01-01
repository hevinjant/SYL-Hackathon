import React from "react";
import Form from "./Form";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import database from "../Firebase";
import "../styles/MonthItem.css";

function MonthItem({ monthName, monthImg, monthGoal }) {
  const [submit, setSubmit] = useState(false);
  const [completed, setCompleted] = useState(false);
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");

  useEffect(() => {
    if (monthGoal.goal != null) {
      setSubmit(true);
    }
    if (monthGoal.completed === true) {
      setCompleted(true);
    }
  }, [monthGoal]);

  const handleSubmit = (goal) => {
    insertGoalToDatabase(goal);
  };

  async function insertGoalToDatabase(goal) {
    const docRef = doc(database, "users", userPhoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let goals = docSnap.data().goals;
      goals[monthName.toLowerCase()] = { goal: goal, completed: false };
      setDoc(
        doc(database, "users", userPhoneNumber),
        { goals: goals },
        { merge: true }
      );
    }
  }

  function handleClick() {
    setGoalToCompleted();
  }

  async function setGoalToCompleted() {
    const docRef = doc(database, "users", userPhoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let goals = docSnap.data().goals;
      goals[monthName.toLowerCase()] = { completed: true };
      setDoc(
        doc(database, "users", userPhoneNumber),
        { goals: goals },
        { merge: true }
      );
    }
  }

  return (
    <div className="month-item">
      <div
        className="month-item-container"
        id={completed ? "completed" : "not-completed"}
      >
        <img src={monthImg} alt=""></img>
        <p className="header">{monthName}</p>
        {!submit ? (
          <div className="goal-enter">
            <Form formLabel={monthName} handleFormSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="goal-display">
            <p>{monthGoal.goal}</p>
            <button
              className="complete"
              id={completed ? "completed" : "not-completed"}
              onClick={handleClick}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthItem;

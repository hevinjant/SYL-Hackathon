import React, { useState, useEffect } from "react";

import "../styles/Stake.css";

function Stake({ amount, handleAmount }) {
  const handleChange = (event) => {
    handleAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="stake">
      <div className="stake-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={amount}
            onChange={handleChange}
            placeholder="Enter the amount to stake"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Stake;

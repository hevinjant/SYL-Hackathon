import React, { useState } from "react";
import "../styles/Stake.css";

function Stake() {
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAmount("");
  };

  return (
    <div className="stake">
      <div className="stake-container">
        <form onSubmit={handleSubmit}>
          <label>Enter the amount</label>
          <input
            type="text"
            value={amount}
            onChange={handleChange}
            placeholder="Enter your amount"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Stake;

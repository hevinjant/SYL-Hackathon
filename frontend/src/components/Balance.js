import React from "react";
import "../styles/Balance.css";

function Balance({ balance }) {
  function handleClick() {}
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

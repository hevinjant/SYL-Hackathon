import React from "react";
import SideNav from "../components/SideNav";
import Balance from "../components/Balance";
import "../styles/Status.css";

function Status() {
  return (
    <div className="status">
      <SideNav />
      <div className="status-container">
        <Balance />
      </div>
    </div>
  );
}

export default Status;

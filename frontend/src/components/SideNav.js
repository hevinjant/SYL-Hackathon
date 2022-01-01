import React from "react";
import { Link } from "react-router-dom";
import "../styles/SideNav.css";

function SideNav() {
  return (
    <div className="side-nav">
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}

export default SideNav;

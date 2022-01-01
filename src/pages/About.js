import React from "react";
import SideNav from "../components/SideNav";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <SideNav />
      <div className="about-container">
        <p className="header">Welcome to NewYearNewToken!</p>
        <p className="body">
          We all know that it is very hard to achieve our new year resolutions
          for various reasons! <br />
          Either we forget about it, too lazy to do it, or it is just because
          the resolution is too big to complete.
          <br /> With NewYearNewToken, we help you to split up your one big new
          year resolution into smaller resolutions that you can achieve each
          month. And as the name suggests, you can get tokens by completing your
          new year resolutions!
        </p>
        <p className="header">How does it work?</p>
        <p className="body">
          Stake NYNT token as much as you want and set your goal for each month
          in the next year. <br /> You can get 5% bonus token for every goal
          that you complete.
        </p>
        <p className="header">Development</p>
        <p className="body">
          Front-end: React JavaScript <br />
          Database: Firebase Firestore <br />
          Using Solidity to create and deploy the NYNT token and smart contract.{" "}
          <br />
          Connected to MetaMask cryto wallet & gateway through Web3-React.
        </p>
      </div>
    </div>
  );
}

export default About;

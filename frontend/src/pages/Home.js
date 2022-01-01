import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import MonthItem from "../components/MonthItem";
import Balance from "../components/Balance";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import database from "../Firebase";
import "../styles/Home.css";
import JanImg from "../assets/january.jpg";
import FebImg from "../assets/february.jpg";
import MarImg from "../assets/march.jpg";
import AprImg from "../assets/april.jpg";
import MayImg from "../assets/may.jpg";
import JunImg from "../assets/june.jpg";
import JulImg from "../assets/july.jpg";
import AugImg from "../assets/august.jpg";
import SepImg from "../assets/september.jpg";
import OctImg from "../assets/october.jpg";
import NovImg from "../assets/november.jpg";
import DecImg from "../assets/december.jpg";

const months = [
  {
    name: "January",
    img: JanImg,
  },
  {
    name: "February",
    img: FebImg,
  },
  {
    name: "March",
    img: MarImg,
  },
  {
    name: "April",
    img: AprImg,
  },
  {
    name: "May",
    img: MayImg,
  },
  {
    name: "June",
    img: JunImg,
  },
  {
    name: "July",
    img: JulImg,
  },
  {
    name: "August",
    img: AugImg,
  },
  {
    name: "September",
    img: SepImg,
  },
  {
    name: "October",
    img: OctImg,
  },
  {
    name: "November",
    img: NovImg,
  },
  {
    name: "December",
    img: DecImg,
  },
];

function Home() {
  const [goals, setGoals] = useState({});
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");

  useEffect(() => {
    fetchGoals(database).then((goals) => {
      setGoals(goals);
    });

    const unsubscribe = onSnapshot(
      doc(database, "users", userPhoneNumber),
      (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log("listened:", doc.data());
        setGoals(doc.data().goals);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  async function fetchGoals(database) {
    try {
      const docRef = doc(database, "users", userPhoneNumber);
      const docSnap = await getDoc(docRef);
      let snapshots;
      if (docSnap.exists()) {
        snapshots = docSnap.data();
        console.log("docSnap", docSnap.data());
      } else {
        snapshots = {};
      }
      return snapshots.goals;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="home">
      <div className="home-left">
        <SideNav />
      </div>
      <div className="home-middle">
        <Balance />
      </div>
      <div className="home-right">
        <div className="home-right-container">
          {months.map((month, key) => {
            const monthName = month.name.toLowerCase();
            var monthGoal;
            console.log("GOALS", goals);
            if (goals == null || Object.keys(goals).length === 0) {
              monthGoal = {};
            } else {
              monthGoal = goals[monthName];
              if (monthGoal == null) {
                monthGoal = {};
              }
            }
            return (
              <MonthItem
                key={key}
                monthName={month.name}
                monthImg={month.img}
                monthGoal={monthGoal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;

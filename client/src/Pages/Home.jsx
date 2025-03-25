import React,{useState} from "react";
import {Services, Welcome,Transaction } from "../components";
// import { Transaction } from "ethers";

const Home = () => {
//   const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Welcome />
    </div>
    <Services />
    <Transaction />
  </div>
  );
};

export default Home;

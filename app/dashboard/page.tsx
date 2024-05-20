import React from "react";
import Signoutbtn from "./Components/Signoutbtn";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl max-[500px]:text-2xl">Dashboard</h1>
      <Signoutbtn />
    </div>
  );
};

export default Dashboard;

import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

const Analytics = () => {
  return (
    <div className="mx-auto flex w-[80%] flex-col justify-center px-10">
      <h1 className="mb-8 border-b pt-2 pb-5 text-center text-2xl font-bold text-[#3E4154]">Analytics</h1>
      <BarChart />
      {/* <LineChart /> */}
      {/* <PieChart /> */}
    </div>
  );
};

export default Analytics;

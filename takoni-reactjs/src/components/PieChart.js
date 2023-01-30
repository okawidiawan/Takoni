import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { UserData } from "../Data";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#86efac"],
      },
    ],
  });

  return <Pie data={userData} />;
};

export default PieChart;

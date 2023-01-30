import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { UserData } from "../Data";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.age),
    datasets: [
      {
        label: "User Take Survey by Age",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgb(75, 192, 192)"],
        borderWidth: 1,
      },
    ],
  });

  return <Bar data={userData} />;
};

export default BarChart;

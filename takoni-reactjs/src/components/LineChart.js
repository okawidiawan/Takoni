import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { UserData } from "../Data";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.age),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#86efac"],
      },
    ],
  });

  return <Line data={userData} />;
};

export default LineChart;

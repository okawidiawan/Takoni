import React, { useEffect, useState } from "react";
import axios from "axios";
import Surveys from "../components/Surveys";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [surveys, setSurvey] = useState([]);

  const getUser = () => {
    axios
      .get(`http://192.168.100.14:8080/api/researcher`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSurvey = () => {
    axios
      .get(`http://192.168.100.14:8080/api/survey`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setSurvey(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
    getSurvey();
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-center text-3xl">Welcome, {user.name}</h1>
      <div className="mx-auto mt-5 flex h-[500px] w-4/5 rounded-md bg-white p-4 shadow-md">
        <div className="h-full w-56 rounded-md border"></div>
        {/* <div className=""></div> */}
        <Surveys surveys={surveys} />
      </div>
    </div>
  );
};

export default Dashboard;

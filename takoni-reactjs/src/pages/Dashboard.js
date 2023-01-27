import React, { useEffect, useState } from "react";
import axios from "axios";
import Surveys from "../components/Surveys";
import { Link } from "react-router-dom";

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
      <div className="mx-auto mt-5 flex h-[500px] w-4/5 rounded-md bg-white p-4 shadow-md">
        <div className="h-full w-56 rounded-md border shadow-md">
          <div className="flex h-full flex-col justify-between ">
            <h1 className="border-b p-4 text-xl">
              Welcome, <br />
              <span className="font-bold">{user.name}</span>
            </h1>
            <div className="flex flex-col p-4">
              <Link to="" className="mb-5 text-left font-semibold">
                Survey List
              </Link>
              <Link to="" className="mb-5 text-left font-semibold">
                Survey Report
              </Link>
              <Link to="" className="mb-5 text-left font-semibold">
                Add New Survey
              </Link>
            </div>
            <div className="mx-auto flex w-full flex-col p-4">
              <Link to="" className=" rounded-md bg-gray-500 px-10 py-2 text-center font-semibold text-white">
                Log Out
              </Link>
            </div>
          </div>
        </div>
        <Surveys surveys={surveys} />
      </div>
    </div>
  );
};

export default Dashboard;

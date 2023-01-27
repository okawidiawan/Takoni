import React, { useEffect, useState } from "react";
import axios from "axios";
import Surveys from "../components/Surveys";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = ({ setIsLogin }) => {
  const [user, setUser] = useState([]);
  const [surveys, setSurvey] = useState([]);
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem("Authorization");
    setIsLogin(false);
    navigate("/");
  };

  const checkLogin = () => {
    if (localStorage.getItem("Authorization")) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getUser();
    getSurvey();
    checkLogin();
  }, []);

  return (
    <div className="mt-20">
      <div className="mx-auto mt-5 flex w-[1200px] items-start rounded-md bg-white p-4 shadow-md">
        <div className="mt-[52px] h-[500px] w-[230px] rounded-md border shadow-md">
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
              <button className=" rounded-md bg-gray-500 px-10 py-2 text-center font-semibold text-white" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
        <Surveys surveys={surveys} setSurvey={setSurvey} />
      </div>
    </div>
  );
};

export default Dashboard;

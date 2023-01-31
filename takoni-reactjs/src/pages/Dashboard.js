import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ClipboardDocumentListIcon, DocumentPlusIcon, PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/outline";

const Dashboard = ({ setIsLogin, user, getUser, getSurvey }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState();

  const logout = () => {
    localStorage.removeItem("Authorization");
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    getUser();
    getSurvey();
  }, []);

  return (
    <div className="mt-20 ">
      <div className="mx-auto mb-1 flex w-full items-center justify-between rounded-md px-4 py-2 ">
        <h1 className="mr-10 text-base font-semibold text-[#3E4154]">
          Welcome, <span className="block text-xl font-semibold tracking-wider text-emerald-400">{user.name}</span>
        </h1>
        <button className=" rounded-full border bg-white p-2 shadow-md" onClick={logout}>
          <PowerIcon className="h-6 w-6 text-[#3E4154]" />
        </button>
      </div>

      <div className="relative mx-auto mt-2 flex h-[600px] w-full items-start overflow-y-scroll rounded-md bg-white p-4 shadow-md scrollbar-hide">
        <Outlet />
      </div>

      <div className="navigation mx-auto mt-5 w-fit rounded-md ">
        <ul className="flex justify-center p-4">
          <NavLink
            to="/dashboard/surveys"
            className={({ isActive }) =>
              isActive
                ? "relative z-50 mx-5 rounded-md border bg-white p-2 text-black/50 shadow-md before:absolute before:-top-2 before:-right-2 before:-z-50 before:h-10 before:w-10 before:rounded-md before:bg-emerald-300/40"
                : "mx-5 rounded-md border bg-white p-2 text-black/50 shadow-md"
            }
          >
            <ClipboardDocumentListIcon className="h-8 w-8 " />
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              isActive
                ? "relative z-50 mx-5 rounded-md border bg-white p-2 text-black/50 shadow-md before:absolute before:-top-2 before:-right-2 before:-z-50 before:h-10 before:w-10 before:rounded-md before:bg-emerald-300/40"
                : "mx-5 rounded-md border bg-white p-2 text-black/50 shadow-md"
            }
          >
            <PresentationChartBarIcon className="h-8 w-8 " />
          </NavLink>

          <NavLink
            to="/dashboard/addnewsurvey"
            className={({ isActive }) =>
              isActive
                ? "relative z-50 mx-5 rounded-md border bg-white p-2 text-black/50 shadow-md before:absolute before:-top-2 before:-right-2 before:-z-50 before:h-10 before:w-10 before:rounded-md before:bg-emerald-300/40"
                : "mx-5 rounded-md border bg-white p-2 text-black/50 shadow-md"
            }
          >
            <DocumentPlusIcon className="h-8 w-8 " />
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

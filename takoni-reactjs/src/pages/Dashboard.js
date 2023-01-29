import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ClipboardDocumentListIcon, DocumentPlusIcon, PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/outline";

const Dashboard = ({ setIsLogin, user }) => {
  const navigate = useNavigate();

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
    checkLogin();
  }, []);

  return (
    <div className="mt-20">
      <div className="mx-auto mb-1 flex w-4/5 items-center justify-between rounded-md px-4 py-2 ">
        <h1 className="mr-10 text-base font-semibold text-[#3E4154]">
          Welcome, <span className="block text-xl font-semibold tracking-wide text-emerald-400">{user.name}</span>
        </h1>
        <button className=" rounded-full border bg-white p-2 shadow-md" onClick={logout}>
          <PowerIcon className="h-6 w-6 text-[#3E4154]" />
        </button>
      </div>

      <div className="mx-auto mt-2 flex h-[600px] w-4/5 items-start overflow-y-scroll rounded-md bg-white p-4 shadow-md scrollbar-hide">
        <Outlet />
      </div>

      <div className="navigation mx-auto mt-5 w-fit rounded-md ">
        <ul className="flex justify-center p-4">
          <NavLink to="/dashboard/surveys" className=" mx-5 flex flex-col items-center rounded-md border bg-white p-2 shadow-md">
            <ClipboardDocumentListIcon className="h-8 w-8 text-black/50" />
          </NavLink>

          <NavLink to="/dashboard/analytics" className="mx-5 rounded-md border bg-white p-2 shadow-md">
            <PresentationChartBarIcon className="h-8 w-8 text-black/50" />
          </NavLink>

          <NavLink to="/dashboard/addsurvey" className="mx-5 rounded-md border bg-white p-2 shadow-md">
            <DocumentPlusIcon className="h-8 w-8 text-black/50" />
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

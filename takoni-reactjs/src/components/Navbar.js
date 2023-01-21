import React from "react";
import logo from "../img/Logo-Lower-Green.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-10 flex items-center justify-between rounded-md bg-white px-8 py-4 shadow-md">
      <div className="logo">
        <Link to="/">
          <img className="w-24" src={logo} alt="" />
        </Link>
      </div>
      <div className="menu">
        <ul className="flex  w-96 justify-between">
          <li>
            <Link
              to="/"
              className="relative font-medium transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-0 after:rounded-xl after:bg-emerald-400 after:transition-all after:duration-500 after:hover:w-full"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative font-medium transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-0 after:rounded-xl after:bg-emerald-400 after:transition-all after:duration-500 after:hover:w-full"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="relative font-medium transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-0 after:rounded-xl after:bg-emerald-400 after:transition-all after:duration-500 after:hover:w-full"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/login" className="rounded-md bg-[#3E4154] py-2 px-8 font-bold text-white shadow-md shadow-[#3E4154]/60 transition duration-300 hover:bg-[#3E4154]/90">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import logo from "../img/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-10 flex items-center justify-between rounded-md bg-white px-8 py-4 shadow-md">
      <div className="logo">
        <img className="w-24" src={logo} alt="" />
      </div>
      <div className="menu">
        <ul className="flex  w-96 justify-between">
          <li>
            <Link to="" className="font-medium transition duration-300 hover:text-black/10">
              Home
            </Link>
          </li>
          <li>
            <Link to="" className="font-medium transition duration-300 hover:text-black/10">
              About
            </Link>
          </li>
          <li>
            <Link to="" className="font-medium transition duration-300 hover:text-black/10">
              Features
            </Link>
          </li>
          <li>
            <Link to="/login" className="rounded-md bg-black py-2 px-8 font-bold text-white transition duration-300 hover:bg-black/70">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import logo from "../img/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-10 flex items-center justify-between rounded-md bg-white p-5 shadow-md">
      <div className="logo">
        <img className="w-24" src={logo} alt="" />
      </div>
      <div className="menu">
        <ul className="flex  w-96 justify-between">
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

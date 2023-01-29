import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="mt-20 flex">
      <div className="mx-auto flex w-full flex-col">
        <h1 className="mb-2 text-center text-4xl font-bold leading-relaxed tracking-wide">
          A simple way <br /> to research your target market.
        </h1>
        <p className="text-center text-lg text-black/20">
          Easy way to research, <br /> find your target market right now!
        </p>
        <Link to="/login" className="mx-auto mt-7 w-[150px] rounded-md bg-emerald-400 py-2 text-center font-bold text-white shadow-lg shadow-emerald-400/40 transition duration-300 hover:bg-emerald-300">
          Try it Out
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

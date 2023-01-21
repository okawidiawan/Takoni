import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="mx-auto mt-20 flex justify-center ">
      <div className="order-2 flex w-[290px] flex-col justify-center rounded-r-md bg-[#3E4154] p-10 shadow-md">
        <h1 className="mb-3 text-2xl font-bold text-white">
          Join <span className="">Takoni</span> for Free
        </h1>
        <div className=" relative -mt-2 mb-4 h-1 w-20 rounded-xl bg-emerald-400 after:absolute after:-right-3 after:h-full after:w-2 after:rounded-xl after:bg-emerald-400 "></div>
        <p className="mb-10 text-sm text-white/90">
          <span className="font-bold">Register</span> and discover your target market.
        </p>
      </div>
      <form action="" className="order-1 h-auto  w-[400px] rounded-l-md bg-white py-10 shadow-md">
        <div className="mx-auto mb-5 flex w-[250px] flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Name
          </label>
          <input type="text" name="name" id="name" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter your name " />
        </div>

        <div className="mx-auto mb-5 flex w-[250px] flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Username
          </label>
          <input type="text" name="username" id="username" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter your username " />
        </div>

        <div className="mx-auto mb-5 flex w-[250px] flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input type="password" name="password" id="password" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter your password" />
        </div>

        <div className="mx-auto mb-5 flex w-[250px] flex-col">
          <label htmlFor="phone" className="mb-1 font-medium">
            Phone Number
          </label>
          <input type="text" name="phone" id="phone" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter your phone number " />
        </div>

        <div className="mx-auto mt-8 flex w-[250px] flex-col justify-between ">
          <button className=" w-[250px] rounded-md bg-[#3E4154] py-2 text-center font-bold text-white shadow-md shadow-[#3E4154]/80 transition duration-300 hover:bg-[#3E4154]/90">Register</button>
          <p className="mt-8 text-center text-sm text-[#3E4154]">
            Or you already have an account, just
            <Link to="/login" className="ml-1  font-bold ">
              login
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

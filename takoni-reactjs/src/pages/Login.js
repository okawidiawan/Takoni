import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mx-auto mt-20 flex justify-center">
      <div className="flex w-[290px] flex-col justify-center rounded-l-md bg-[#3E4154] p-10 shadow-md">
        <h1 className="mb-3 text-2xl font-bold text-white">
          Welcome back to
          <br />
          <span className="">Takoni</span>
        </h1>
        <div className=" relative -mt-2 mb-4 h-1 w-20 rounded-xl bg-emerald-400 after:absolute after:-right-3 after:h-full after:w-2 after:rounded-xl after:bg-emerald-400 "></div>
        <p className="text-sm text-white/90">
          <span className="font-bold">Login</span> to continue to your account.
        </p>
      </div>
      <form action="" className="h-auto w-[400px]  rounded-r-md bg-white py-10 shadow-md">
        <div className="mx-auto mb-5 flex w-[250px] flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Username
          </label>
          <input type="text" name="username" id="username" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter your username " />
        </div>
        <div className="mx-auto flex w-[250px] flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input type="password" name="password" id="password" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter your password" />
        </div>

        <div className="mx-auto mt-10 flex w-[250px] justify-between ">
          <Link to="/register" className=" w-[120px]  rounded-md border py-2 text-center font-semibold">
            Register
          </Link>
          <button className=" w-[120px] rounded-md bg-[#3E4154] py-2 text-center font-bold text-white shadow-md shadow-[#3E4154]/60 transition duration-300 hover:bg-[#3E4154]/90">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

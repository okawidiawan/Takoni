import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-20">
      <form action="" className="mx-auto h-auto w-[400px] rounded-md  bg-white py-10 shadow-md">
        <div className="mx-auto mb-5 flex w-[250px] flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Username
          </label>
          <input type="text" name="username" id="username" className="h-7 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 shadow-md" />
        </div>
        <div className="mx-auto flex w-[250px] flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input type="password" name="password" id="password" className="h-7 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 shadow-md" />
        </div>
        <div className="mx-auto mt-10 flex w-[250px] justify-between ">
          <Link to="" className=" w-[120px]  rounded-md border py-2 text-center">
            Register
          </Link>
          <Link to="" className=" w-[120px]  rounded-md bg-black py-2 text-center text-white">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";

const Survey = ({ survey, index }) => {
  return (
    <Link to={`/dashboard/survey/${survey.id}`}>
      <div className="mx-3 mb-5 w-[276px] rounded-md border bg-white p-4 text-[#3E4154] shadow-md transition duration-300 hover:scale-105">
        <h1 className="relative z-50 mb-3 border-b pb-2 text-2xl font-bold before:absolute before:-z-10 before:h-6 before:w-6 before:rounded-full before:bg-emerald-400/30">{index}</h1>
        <div>
          <h1 className="block h-[60px] text-lg font-bold line-clamp-2">{survey.title}</h1>
          <h2 className="-mt-1 mb-5 text-[13px] font-semibold text-black/10 line-clamp-1">{survey.subTitle}</h2>
          <p className="h-[35px] text-xs text-slate-400 line-clamp-2">{survey.description}</p>
          <div className="my-5 flex flex-col">
            <p className="mr-3 text-sm font-bold">Target Respondent</p>
            <p className={`text-xs `}>
              {survey.totalResponse} / <span className=""> {survey.numOfRespondent} </span>Respondent
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-between ">
          <p
            className={`
            text-sm line-clamp-1 ${survey.status === "Waiting" ? "text-gray-400" : "text-emerald-500"} ${survey.status === "Closed" ? "text-red-400" : ""}
            `}
          >
            <span className="font-semibold text-[#3E4154]">Status : </span>
            {survey.status === "Published" ? "On Progress" : survey.status}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Survey;

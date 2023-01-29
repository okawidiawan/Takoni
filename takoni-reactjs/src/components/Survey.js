import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import { TrashIcon } from "@heroicons/react/24/outline";

const Survey = ({ survey, setSurvey, surveys, index }) => {
  // const deleteSurvey = (idInput) => {
  //   axios
  //     .delete(`http://192.168.100.14:8080/api/delete/survey/${idInput}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `${localStorage.getItem("Authorization")}`,
  //       },
  //     })
  //     .then(() => {
  //       setSurvey(surveys.filter((item) => item.id !== idInput));
  //       console.log("Deleted");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {}, [surveys]);

  return (
    <Link to={`/dashboard/survey/${survey.id}`}>
      <div className="mx-3 mb-5 w-[276px] rounded-md border bg-white p-4 text-[#3E4154] shadow-md transition duration-300 hover:scale-105">
        <h1 className="mb-3 border-b pb-2 text-2xl font-bold">{index}</h1>
        <div>
          <h1 className="block text-lg font-bold">{survey.title}</h1>
          <h2 className="mb-2 text-xs font-semibold text-black/10">{survey.subTitle}</h2>
          <p className="text-sm line-clamp-1">{survey.description}</p>
        </div>
        <div className="mt-5 flex ">
          {/* <button className="mr-2 rounded-md border p-1 shadow-md" onClick={() => deleteSurvey(survey.id)}>
            <TrashIcon className="h-5 w-5 text-black/50" />
          </button> */}
          {/* <button className="mr-2 rounded-md border p-1 shadow-md">
          <PencilSquareIcon className="h-5 w-5 text-black/50" />
        </button> */}
        </div>
      </div>
    </Link>
  );
};

export default Survey;

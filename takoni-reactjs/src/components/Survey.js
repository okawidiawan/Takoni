import React from "react";
import { Link } from "react-router-dom";

const Survey = ({ survey }) => {
  return (
    <div className="mb-5 w-full rounded-md border p-4 shadow-md">
      <Link to={`/survey/${survey.id}`} className="text-xl font-bold">
        {survey.title}
      </Link>
      <h2 className="text-lg">{survey.subTitle}</h2>
      <p className="">{survey.description}</p>
    </div>
  );
};

export default Survey;

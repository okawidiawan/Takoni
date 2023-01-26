import React from "react";
import { Link } from "react-router-dom";

const Survey = ({ survey }) => {
  return (
    <div className="mb-5">
      <Link to="">
        <h1 className="text-xl font-bold">{survey.title}</h1>
        <h2 className="text-lg">{survey.subTitle}</h2>
        <p className="">{survey.description}</p>
      </Link>
    </div>
  );
};

export default Survey;

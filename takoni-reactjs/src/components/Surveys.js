import React from "react";
import { useParams } from "react-router-dom";
import Survey from "./Survey";

const Surveys = ({ surveys }) => {
  return (
    <div className="pl-4">
      <h1 className="mb-5 text-2xl font-bold">Surveys</h1>
      {surveys.map((survey) => (
        <Survey key={survey.id} survey={survey} />
      ))}
    </div>
  );
};

export default Surveys;

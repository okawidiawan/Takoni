import React from "react";
import { useParams } from "react-router-dom";
import Survey from "./Survey";

const Surveys = ({ surveys, setSurvey, deleteSurvey }) => {
  let number = 1;
  return (
    <div className="flex w-[916px] flex-col justify-center pl-4">
      <h1 className="mb-5 text-center text-2xl font-bold ">Surveys</h1>
      <div className="flex w-full flex-wrap ">
        {surveys.map((survey) => (
          <Survey key={survey.id} survey={survey} surveys={surveys} setSurvey={setSurvey} number={number++} deleteSurvey={deleteSurvey} />
        ))}
      </div>
    </div>
  );
};

export default Surveys;

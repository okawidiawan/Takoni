import React from "react";
import Survey from "./Survey";

const Surveys = ({ surveys, setSurvey, deleteSurvey }) => {
  return (
    <div className="mx-auto flex  flex-col justify-center">
      <h1 className="mb-8 border-b pt-2 pb-5 text-center text-2xl font-bold text-[#3E4154]">Survey List</h1>

      <div className="flex flex-wrap justify-center">
        {surveys.map((survey, index) => (
          <Survey key={survey.id} survey={survey} surveys={surveys} setSurvey={setSurvey} deleteSurvey={deleteSurvey} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default Surveys;

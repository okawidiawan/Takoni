import React from "react";
import AddNewSurvey from "./AddNewSurvey";
import AddSurveyQuestion from "./AddSurveyQuestion";

const AddForm = () => {
  return (
    <div className="mx-auto flex  flex-col justify-center">
      <h1 className="border-b pt-2 pb-5 text-center text-2xl font-bold text-[#3E4154]">Add Form</h1>
      {/* <AddNewSurvey /> */}
      <AddSurveyQuestion />
    </div>
  );
};

export default AddForm;

import React from "react";

const AddSurveyQuestion = () => {
  return (
    <form action="" className="order-1 h-auto  w-[400px] rounded-l-md bg-white py-10 ">
      <div className="mx-auto mb-5 flex w-[250px] flex-col">
        <label htmlFor="questionText" className="mb-1 font-medium">
          Question
        </label>
        <input type="text" name="questionText" id="questionText" className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300" placeholder="enter project title" />
      </div>
    </form>
  );
};

export default AddSurveyQuestion;

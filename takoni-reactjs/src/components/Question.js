import React from "react";

const Question = ({ question }) => {
  console.log(question);
  return (
    <div className="mb-2">
      <h1>{question.questionText}</h1>
    </div>
  );
};

export default Question;

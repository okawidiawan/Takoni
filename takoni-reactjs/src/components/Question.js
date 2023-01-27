import React from "react";

const Question = ({ question }) => {
  return (
    <div className="mb-2">
      <h1>{question.questionText}</h1>
    </div>
  );
};

export default Question;

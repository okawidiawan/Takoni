import React from "react";

const Question = ({ question, index }) => {
  return (
    <div className="mb-2">
      <h1>
        {index + 1}. {question.questionText}
      </h1>
    </div>
  );
};

export default Question;

import React from "react";
import { PencilSquareIcon, XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Question = ({ question, index, questions, setQuestions }) => {
  // console.log(questions);
  console.log(question.survey.status);

  const deleteQuestion = (idInput) => {
    axios
      .delete(`http://192.168.100.14:8080/api/delete/survey/question/${idInput}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(() => {
        setQuestions(questions.filter((item) => item.id !== idInput));
        console.log("Deleted Question");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(question.id);
  };

  const editQuestionButton = () => {
    console.log(question.id);
  };

  return (
    <div className="mb-3 flex items-center justify-between rounded-md border p-3 shadow-sm">
      <h1 className="text-sm">
        <span className="font-semibold">{index + 1}.</span> {question.questionText}
      </h1>

      <button className={`ml-5 h-fit  text-black/40 ${question.survey.status === "Waiting" ? "" : "hidden"}`} onClick={() => deleteQuestion(question.id)}>
        <XCircleIcon className="w-5 " />
      </button>
    </div>
  );
};

export default Question;

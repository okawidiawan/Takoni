import React from "react";
import { XCircleIcon, ListBulletIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Question = ({ question, index, questions, setQuestions }) => {
  const surveyId = question.survey.id;

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

  const seeQuestionDetails = () => {
    // console.log(question.id);
  };

  return (
    <div className="mb-3 flex items-center justify-between rounded-md border p-3 shadow-sm">
      <h1 className="text-sm">
        <span className="font-semibold">{index + 1}.</span> {question.questionText}
      </h1>

      <button className={`ml-5 h-fit  text-black/40 ${question.survey.status === "Waiting" ? "" : "hidden"}`} onClick={() => deleteQuestion(question.id)}>
        <XCircleIcon className="w-5 " />
      </button>

      <Link to={`/dashboard/survey/${surveyId}/${question.id}`} className={`h-fit  text-black/40 ${question.survey.status === "Waiting" ? "hidden" : ""} `} onClick={() => seeQuestionDetails()}>
        <MagnifyingGlassCircleIcon className="w-5 " />
      </Link>
    </div>
  );
};

export default Question;

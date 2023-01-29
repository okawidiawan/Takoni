import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";
import moment from "moment";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

const SurveyDetails = ({ surveys, setSurvey }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [survey, setSurveyS] = useState({});
  const [questions, setQuestions] = useState([]);

  let date = moment(survey.surveyDate).format("LLL");

  const getSurveyById = () => {
    axios
      .get(`http://localhost:8080/api/survey/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setSurveyS(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQuestionBySurveyId = () => {
    axios
      .get(`http://localhost:8080/api/question/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSurvey = (idInput) => {
    axios
      .delete(`http://192.168.100.14:8080/api/delete/survey/${idInput}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(() => {
        setSurvey(surveys.filter((item) => item.id !== idInput));
        navigate("/dashboard");

        console.log("Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSurveyById();
    getQuestionBySurveyId();
  }, [surveys]);

  return (
    <div className="flex w-full flex-col text-[#3E4154]">
      <div className="relative mb-8 flex items-center justify-center border-b pt-2 pb-5">
        <NavLink to="/dashboard" className="absolute left-5">
          <ArrowLeftIcon className="h-8 w-8 text-[#3E4154]" />
        </NavLink>

        <h1 className="text-center text-2xl font-bold text-[#3E4154]">Survey Details</h1>

        <button className="absolute right-5" onClick={() => deleteSurvey(survey.id)}>
          <TrashIcon className="h-8 w-8 text-[#3E4154]" />
        </button>
      </div>
      <div className="mx-auto flex w-4/5 justify-center ">
        <div className="mr-20">
          <h1 className=" text-xl font-bold">{survey.title}</h1>
          <p className="mb-5 text-sm font-medium text-black/10">{survey.subTitle}</p>
          <h1 className="font-semibold">Description</h1>
          <p className="mb-5 text-xs  font-semibold text-black/10">{survey.description}</p>
          <h1 className="font-semibold">Date</h1>
          <p className="mb-5 text-xs  font-semibold text-black/10">{date}</p>
          <h1 className="font-semibold">Status</h1>
          <p className={`mb-5 text-xs  font-semibold ${survey.status === "Waiting" ? "text-red-300" : "text-emerald-500"}`}>{survey.status}</p>
          <button className={`rounded-md bg-emerald-400 px-4 py-1 font-semibold text-white ${survey.status === "Waiting" ? "" : "hidden"}`}>Publish</button>
        </div>
        <div>
          <h1 className="mb-2 text-xl font-semibold">Question</h1>

          {questions.map((question, index) => (
            <Question key={question.id} question={question} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;

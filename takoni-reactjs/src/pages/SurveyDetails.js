import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";

const SurveyDetails = () => {
  const { id } = useParams();

  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState([]);

  const getSurveyById = () => {
    axios
      .get(`http://localhost:8080/api/survey/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setSurvey(data);
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

  useEffect(() => {
    getSurveyById();
    getQuestionBySurveyId();
  }, []);

  // console.log(survey);
  console.log(questions);

  return (
    <div className="mt-20">
      <div className="mx-auto mt-5 flex h-[500px] w-4/5 flex-col rounded-md bg-white p-4 shadow-md">
        <h1 className="mb-5 text-xl font-bold">{survey.title}</h1>
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default SurveyDetails;

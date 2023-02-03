import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

const QuestionDetails = () => {
  const { id } = useParams();

  const toGoBack = useNavigate();

  const [questionDetail, setQuestionDetail] = useState([]);

  //   console.log(id);

  const { answerText } = questionDetail;
  //   console.log(questionDetail);
  //   console.log(answerText);

  const getQuestionDetails = () => {
    axios
      .get(`http://localhost:8080/api/survey/question/answer/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setQuestionDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestionDetails();
  }, []);

  return (
    <div className="flex w-full flex-col text-[#3E4154]">
      <div className="relative mb-8 flex items-center justify-center border-b pt-2 pb-5">
        {/* <Link to={toGoBack} className="absolute left-5"> */}
        <button className="absolute left-5" onClick={() => toGoBack(-1)}>
          <ArrowLeftIcon className="h-8 w-8 text-[#3E4154]" />
        </button>
        {/* </Link> */}

        <h1 className="text-center text-2xl font-bold text-[#3E4154]">Question Details</h1>
      </div>

      <div className="px-5">
        <h1 className="mb-2 text-xl font-semibold">Question Response Answer</h1>
        {questionDetail.map((question, index) => (
          <div key={question.id} className="mb-5">
            <h1 className="text-sm font-semibold">
              <span className="font-bold">{index + 1}.</span> {question.user.name}
            </h1>
            {/* <h1 className="text-sm">Respondent Name</h1> */}
            <p className="text-xs">Gender : {question.user.gender}.</p>
            <p className="text-xs">Age : {question.user.age}.</p>
            <p className="text-xs">SES : {question.user.ses}.</p>
            <p className="text-xs font-semibold">Answer : {question.answerText}.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetails;

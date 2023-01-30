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
  const [inputQuestion, setInputQuestion] = useState({});

  let date = moment(survey.surveyDate).format("LLL");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Authorization")}`,
    },
  };

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

  const updateSurveyStatus = () => {
    axios
      .put(
        `http://192.168.100.14:8080/api/update/surveystatus`,
        { id: survey.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then(() => {
        // changeStatus(survey.id, "Published")
        setSurvey((state) => {
          return { ...state, status: state.status };
        });
        console.log("Success update");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addQuestion = (input) => {
    axios
      .post(
        `http://192.168.100.14:8080/api/add/survey/question`,
        {
          ...input,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setQuestions([...questions, input]);
        console.log("Success Add New Survey!");
        console.log(questions);
        console.log(input);
      })
      .catch((error) => {
        console.log("Gagal");
        console.log(error);
      });
  };

  const onCHangeHandler = (e) => {
    let { name, value } = e.target;
    setInputQuestion((state) => {
      return { ...state, survey: { id: survey.id }, [name]: value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addQuestion(inputQuestion);
    Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
  };

  useEffect(() => {
    getSurveyById();
    getQuestionBySurveyId();
  }, []);

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
          <button className={`rounded-md bg-emerald-300 px-4 py-1 font-semibold text-white shadow-md shadow-emerald-300/50 ${survey.status === "Waiting" ? "" : "hidden"}`} onClick={updateSurveyStatus}>
            Publish
          </button>
        </div>
        <div>
          <h1 className="mb-2 text-xl font-semibold">Question</h1>

          {questions.map((question, index) => (
            <Question key={question.id} question={question} index={index} />
          ))}
          <form action="" className={`h-auto ${survey.status === "Waiting" ? "" : "hidden"}`} onSubmit={onSubmitHandler}>
            <div className="mx-auto mb-5 flex w-[250px] flex-col">
              <input
                type="text"
                name="questionText"
                id="questionText"
                className="h-8 w-[250px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300"
                placeholder="enter your question"
                onChange={onCHangeHandler}
              />
            </div>
            <button className="rounded-md bg-emerald-300 px-4 py-1 font-semibold text-white shadow-md shadow-emerald-300/50" onClick={addQuestion}>
              Add Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;

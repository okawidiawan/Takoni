import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";
import moment from "moment";
import { ArrowLeftIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import QuestionDetails from "../components/QuestionDetails";
import Swal from "sweetalert2";

const SurveyDetails = ({ surveys, setSurvey, getSurvey }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [surveyById, setSurveyById] = useState({});
  const [questions, setQuestions] = useState([]);
  const [inputQuestion, setInputQuestion] = useState([]);
  const [responseAnswer, setResponseAnswer] = useState([]);

  let date = moment(surveyById.surveyDate).format("LLL");

  const arrSurvey = responseAnswer;

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
        setSurveyById(data);
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
        { id: surveyById.id },
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
        Swal.fire("Your Survey is Published");
        getSurveyById();
        getSurvey();
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
        // console.log(response);
        // setQuestions([...questions, input]);
        setQuestions((state) => {
          return [...state, input];
        });
        getQuestionBySurveyId();
        Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
        // console.log("Success Add New Survey!");
        // console.log(questions);
        // console.log(input);
      })
      .catch((error) => {
        // console.log("Gagal");
        // console.log(error);
      });
  };

  const getSurveyResponse = () => {
    axios
      .get(`http://localhost:8080/api/survey/answer/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setResponseAnswer(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(id);

  const onCHangeHandler = (e) => {
    let { name, value } = e.target;
    setInputQuestion((state) => {
      return { ...state, survey: { id: surveyById.id }, [name]: value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addQuestion(inputQuestion);
    Array.from(document.querySelectorAll("textarea")).forEach((textarea) => (textarea.value = ""));
  };

  const confirmationDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fafafa",
      cancelButtonColor: "#71717a",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        deleteSurvey(surveyById.id);
      }
    });
  };

  useEffect(() => {
    getSurveyById();
    getQuestionBySurveyId();
    getSurveyResponse();
  }, [surveys]);

  // let target = surveyById.numOfRespondent;
  // let currentRespondent = responseAnswer.length;

  // let progress = Math.round((currentRespondent / target) * 100).toString();

  // console.log(calculateProgress(responseAnswer));

  return (
    <div className="flex w-full flex-col text-[#3E4154]">
      <div className="relative mb-8 flex items-center justify-center border-b pt-2 pb-5">
        <NavLink to="/dashboard/surveys" className="absolute left-5">
          <ArrowLeftIcon className="h-8 w-8 text-[#3E4154]" />
        </NavLink>

        <h1 className="text-center text-2xl font-bold text-[#3E4154]">Survey Details</h1>

        <button className="absolute right-5 before:absolute before:-top-1 before:-right-1 before:h-7 before:w-7 before:rounded-full before:bg-emerald-300/40" onClick={confirmationDelete}>
          <TrashIcon className="h-8 w-8 text-[#3E4154]" />
        </button>
      </div>
      <div className="mx-auto flex w-full justify-center">
        <div className="mr-20 w-[370px]">
          <h1 className=" text-xl font-bold">{surveyById.title}</h1>
          <p className="mb-5 text-sm font-medium text-slate-400">{surveyById.subTitle}</p>
          <h1 className="font-semibold">Description</h1>
          <p className="mb-5 text-xs  font-medium text-slate-400">{surveyById.description}</p>
          <h1 className="font-semibold">Target Respondent</h1>
          <p className="mb-5 text-xs  font-medium text-slate-400">{surveyById.numOfRespondent} Respondent</p>
          <h1 className="font-semibold">Date</h1>
          <p className="mb-5 text-xs  font-medium text-slate-400">{date}</p>
          <h1 className="font-semibold">Status</h1>
          <p className={`mb-5 w-fit rounded-md border-2 px-3 py-1 text-sm font-semibold ${surveyById.status === "Waiting" ? "border-slate-500/20 bg-slate-400 text-white" : "border-emerald-600/30 bg-emerald-500 text-white"}`}>
            {surveyById.status}
          </p>
          <button
            className={`h-[34px] w-[200px] rounded-md bg-emerald-400 text-[14px] font-semibold text-white shadow-md shadow-emerald-300/30 transition duration-300 hover:bg-emerald-500 ${surveyById.status === "Waiting" ? "" : "hidden"}`}
            onClick={updateSurveyStatus}
          >
            Publish
          </button>

          {/* <div className={`${surveyById.status === "Published" ? "" : "hidden"}`}>
            <div className="flex w-[300px] items-center justify-between">
              <h1 className="font-semibold">Progress</h1>
              <p className="text-xs">
                {currentRespondent} / {target}
              </p>
            </div>
            <div className="relative z-50 mt-2 h-6 w-[300px] overflow-hidden rounded-md border border-black/10 bg-slate-200 text-center text-[13px] font-bold shadow-sm">
              {progress}%<div className={`absolute top-0 left-0 -z-10 flex h-full items-center justify-center rounded-l-md bg-emerald-300 w=[${progress}]%`}></div>
            </div>
          </div> */}
        </div>
        <div className="w-[700px]">
          <h1 className="mb-2 text-xl font-semibold">Question</h1>

          {questions.map((question, index) => (
            <Question key={question.id} question={question} index={index} questions={questions} setQuestions={setQuestions} />
          ))}

          <form action="" className={`mt-5 h-auto ${surveyById.status === "Waiting" ? "" : "hidden"}`} onSubmit={onSubmitHandler}>
            <div className="mb-5 flex w-fit flex-col">
              <textarea
                type="text"
                name="questionText"
                id="questionText"
                className="h-[100px] w-[500px] resize-none rounded-md border border-black/10 bg-[#f4f7ff] p-2 text-sm shadow-sm placeholder:text-slate-300"
                placeholder="enter your question"
                onChange={onCHangeHandler}
              />
              <button className="mt-3 w-fit rounded-md bg-[#3E4154] py-2 px-6 text-[12px] font-semibold text-white shadow-md shadow-[#3E4154]/50 " onClick={addQuestion}>
                {/* <PlusIcon className="h-5 w-12" /> */}
                Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;

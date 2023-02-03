import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddNewSurvey = ({ setSurvey, surveys, getSurvey }) => {
  const [inputNewSurvey, setInputNewSurvey] = useState([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Authorization")}`,
    },
  };

  const addNewSurvey = (input) => {
    axios
      .post(
        `http://192.168.100.14:8080/api/add/survey`,
        {
          title: input.title,
          subTitle: input.subTitle,
          description: input.description,
          numOfRespondent: input.numOfRespondent,
        },
        config
      )
      .then((response) => {
        setSurvey((state) => {
          return [...state, input];
        });
        Swal.fire("Survey Added!");
        navigate("/dashboard/surveys");

        getSurvey();
      })
      .catch((error) => {
        // console.log("Gagal");
        console.log(error);
      });
  };

  const onCHangeHandler = (e) => {
    let { name, value } = e.target;
    // console.log(`${name} : ${value}`);
    setInputNewSurvey((state) => {
      return { ...state, [name]: value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addNewSurvey(inputNewSurvey);
    Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
  };

  useEffect(() => {
    // getSurvey();
  }, [surveys]);

  return (
    <div className="mx-auto flex  flex-col justify-center">
      <h1 className="border-b pt-2 pb-5 text-center text-2xl font-bold text-[#3E4154]">Add New Survey</h1>
      <div className="mx-auto flex justify-center ">
        <form action="" className="order-1 h-auto  w-[800px] rounded-l-md bg-white py-10 " onSubmit={onSubmitHandler}>
          <div className="mx-auto mb-5 flex w-[500px] flex-col">
            <label htmlFor="title" className="mb-1 font-medium">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="h-8 w-[500px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300"
              placeholder="enter project title"
              onChange={onCHangeHandler}
              // value={inputSurvey.title}
            />
          </div>

          <div className="mx-auto mb-5 flex w-[500px] flex-col">
            <label htmlFor="subTitle" className="mb-1 font-medium">
              Sub Title
            </label>
            <input
              type="text"
              name="subTitle"
              id="subTitle"
              className="h-8 w-[500px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300"
              placeholder="enter project subtitle "
              onChange={onCHangeHandler}
              // value={inputSurvey.subTitle}
              required
            />
          </div>

          <div className="mx-auto mb-5 flex w-[500px] flex-col">
            <label htmlFor="description" className="mb-1 font-medium">
              Project Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              className=" h-[100px] w-[500px] resize-none rounded-md border border-black/10 bg-[#f4f7ff] p-2 text-sm shadow-md placeholder:text-slate-300"
              placeholder="enter project description"
              onChange={onCHangeHandler}
              // value={inputSurvey.description}
              required
            />
          </div>

          <div className="mx-auto mb-5 flex w-[500px] flex-col">
            <label htmlFor="numOfRespondent" className="mb-1 font-medium">
              Target of Respondent
            </label>
            <input
              type="text"
              name="numOfRespondent"
              id="numOfRespondent"
              className="h-8 w-[500px] rounded-md border border-black/10 bg-[#f4f7ff] pl-2 text-sm shadow-md placeholder:text-slate-300"
              placeholder="enter project target respondent"
              onChange={onCHangeHandler}
              // value={inputSurvey.numOfRespondent}
              required
            />
          </div>

          <div className="mx-auto mt-8 flex w-[250px] flex-col justify-between ">
            <button className=" w-[250px] rounded-md bg-[#3E4154] py-2 text-center font-bold text-white shadow-md shadow-[#3E4154]/80 transition duration-300 hover:bg-[#3E4154]/90">Add New Survey</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewSurvey;

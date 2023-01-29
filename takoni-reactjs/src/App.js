import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Surveys from "./components/SurveyList";
import About from "./pages/About";
import AddNewSurvey from "./pages/AddNewSurvey";
import Analytics from "./pages/Analytics";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import PrivateRoute from "./pages/PrivateRoute";
import Register from "./pages/Register";
import SurveyDetails from "./pages/SurveyDetails";

function App() {
  const [isLogin, setIsLogin] = useState();
  const [surveys, setSurvey] = useState([]);
  const [user, setUser] = useState([]);

  const getUser = () => {
    axios
      .get(`http://192.168.100.14:8080/api/researcher`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSurvey = () => {
    axios
      .get(`http://192.168.100.14:8080/api/survey`, {
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

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      setIsLogin(true);
      getUser();
      getSurvey();
    }
  }, []);

  return (
    <div className="App mx-auto w-4/5">
      <Navbar isLogin={isLogin} />

      <Routes>
        <Route path="/" element={isLogin ? <Dashboard /> : <LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard setIsLogin={setIsLogin} user={user} />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <Surveys surveys={surveys} setSurvey={setSurvey} />
              </PrivateRoute>
            }
          />
          <Route path="analytics" element={<Analytics />} />
          <Route path="addnewsurvey" element={<AddNewSurvey setSurvey={setSurvey} surveys={surveys} />} />
          <Route path="survey/:id" element={<SurveyDetails surveys={surveys} setSurvey={setSurvey} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

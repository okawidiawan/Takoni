// import { useSelector } from "react-redux";
// import { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";

function App() {
  // const testRedux = useSelector((state) => state.text);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      setIsLogin(true);
    }
  }, [localStorage.getItem("Authorization")]);

  return (
    <div className="App mx-auto w-4/5">
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

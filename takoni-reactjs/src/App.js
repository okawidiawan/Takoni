// import { useSelector } from "react-redux";
// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
// import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";

function App() {
  // const testRedux = useSelector((state) => state.text);
  return (
    <div className="App mx-auto w-4/5">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

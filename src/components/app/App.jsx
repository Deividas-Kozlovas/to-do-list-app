import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import ResetPassword from "../../pages/password-reset/ResetPassword";
import Home from "../../pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

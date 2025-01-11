import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import ResetPassword from "../../pages/password-reset/ResetPassword";
import Home from "../../pages/home/Home";
import CreateProject from "../../pages/create-project/CreateProject";
import { ProjectProvider } from "../../context/ProjectContext";

function App() {
  return (
    <ProjectProvider>
      <Router>
        <header className="home-screen__header">
          <h1 className="home-screen__header-title">To Do List APP</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
}

export default App;

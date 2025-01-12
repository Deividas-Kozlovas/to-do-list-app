import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "../../context/ProjectContext";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import ResetPassword from "../../pages/password-reset/ResetPassword";
import Home from "../../pages/home/Home";
import CreateProject from "../../pages/project-create/CreateProject";
import EditProject from "../../pages/project-edit/EditProject";

import "./App.scss";

function App() {
  return (
    <ProjectProvider>
      <Router>
        <header className="App-header">
          <h1 className="App-header-title">To Do List APP</h1>
        </header>
        <div className="App-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/edit-project/:projectId" element={<EditProject />} />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;

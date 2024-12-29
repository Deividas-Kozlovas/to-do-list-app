import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import ResetPassword from '../../pages/password-reset/ResetPassword';
import Home from "../../pages/home/Home";
import CreateProject from '../../pages/project-create/CreateProject';
import ViewProject from '../../pages/project-view/ViewProject';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<ViewProject />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
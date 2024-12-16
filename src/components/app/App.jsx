// import "./App.scss"; ???
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
<<<<<<< Updated upstream
import "./App.scss";
=======
//
// import "./App.scss"; ???
>>>>>>> Stashed changes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

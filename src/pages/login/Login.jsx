import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.scss";
import { auth, login } from "../../services/AuthServices";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      login(formData.email, formData.password);
    } catch (err) {
      let errorMessage = "Įvyko klaida: ";
      if (err.message.includes("auth/too-many-requests")) {
        errorMessage = "Per daug prašymų, prašome palaukti.";
      } else if (err.message.includes("auth/invalid-credential")) {
        errorMessage = "Neteisingi prisijungimo duomenys.";
      } else {
        errorMessage += err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="user-screen">
      <form onSubmit={handleLogin} className="user-screen__form">
        <h2 className="user-screen__form-title">Prisijungimas</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="user-screen__form-input"
          placeholder="El. paštas adresas"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="user-screen__form-input"
          placeholder="Slaptažodis"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className="user-screen__form-button"
          disabled={isLoading}
        >
          {isLoading ? "Prisijungiama..." : "Prisijungti"}
        </button>
        {error && <p className="user-screen__form-error">{error}</p>}
        <div className="user-screen__form-link">
          <Link to="/reset-password" className="user-screen__form-link-link">
            Pamirštote slaptažodį?
          </Link>
        </div>
        <div className="user-screen__form-link">
          <Link to="/register" className="user-screen__form-link-link">
            Neturite paskyros? Užsiregistruokite
          </Link>
        </div>
        <div className="user-screen__form-link">
          <Link to="/" className="user-screen__form-link-link">
            Grižti į pagrindinį puslapį
          </Link>
        </div>
        {isLoading && (
          <div className="user-screen__loader-container">
            <div className="user-screen__loader"></div>
            <span className="user-screen__loader-container-text">
              Palaukite...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

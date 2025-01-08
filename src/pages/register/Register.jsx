import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/AuthServices";
import ReCAPTCHA from "react-google-recaptcha";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const result = await register(
        formData.email,
        formData.password,
        formData.name
      );
      if (!result.success) {
        throw new Error(result.error);
      }
      navigate("/");
    } catch (err) {
      let errorMessage = "Įvyko klaida: ";
      if (err.message.includes("auth/email-already-in-use")) {
        errorMessage = "Šis el. pašto adresas jau naudojamas.";
      } else if (err.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'Slaptažodį turi sudaryti bent 6 simboliai.';
      } else {
        errorMessage += err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (value) => {
    if (value) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  return (
    <div className="user-screen">
      <header className="user-screen__header">
        <h1 className="user-screen__header-title">To Do List APP</h1>
      </header>
      <form onSubmit={handleRegister} className="user-screen__form">
        <h2 className="user-screen__form-title">Registracija</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="user-screen__form-input"
          placeholder="Vardas"
          required
          disabled={isLoading}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="user-screen__form-input"
          placeholder="El. paštas"
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
          disabled={isLoading || !isCaptchaVerified}
        >
          {isLoading ? "Registruojama..." : "Registruotis"}
        </button>
        {error && <p className="user-screen__form-error">{error}</p>}
        <ReCAPTCHA className="grecaptcha-badge"
          sitekey="6LcIwrEqAAAAAOZnRmmCYLDR80SonOYOc58ETdiv" 
          onChange={onChange}
        />
        <div className="user-screen__form-link">
          <Link to="/login" className="user-screen__form-link-link">
            Jau turite paskyrą? Prisijunkite
          </Link>
        </div>
        <div className="user-screen__form-link">
          <Link to="/" className="user-screen__form-link-link">
            Grižti į pagridinį puslapį
          </Link>
        </div>
        {isLoading && (
          <div className="user-screen__loader-container">
            <div className="user-screen__loader"></div>
            <span className="user-screen__loader-container-text">
              Kraunama...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;

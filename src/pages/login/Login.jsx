import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/AuthServices";
import ReCAPTCHA from "react-google-recaptcha";
import "./login.scss";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Login = () => {
  const [formData, setFormData] = useState({
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

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      navigate("/");
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

  const onChange = (value) => {
    if (value) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  return (
    <div className="login__wrapper">
      <form onSubmit={handleLogin} className="login__form">
        <h2 className="login__form-title">Prisijungimas</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="El. paštas adresas"
          required
          disabled={isLoading}
          className="login__form-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Slaptažodis"
          required
          disabled={isLoading}
          className="login__form-input"
        />
        <button
          type="submit"
          disabled={isLoading || !isCaptchaVerified}
          className="login__form-button"
        >
          {isLoading ? "Prisijungiama..." : "Prisijungti"}
        </button>
        {error && <p className="login__form-error">{error}</p>}
        <ReCAPTCHA
          className="grecaptcha-badge"
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onChange}
        />
        <div>
          <Link to="/reset-password" className="login__form-link">
            Pamirštote slaptažodį?
          </Link>
        </div>
        <div>
          <Link to="/register" className="login__form-link">
            Neturite paskyros? Užsiregistruokite
          </Link>
        </div>
        {isLoading && (
          <div className="login__form-loading">
            <div className="login__form-loading-spinner"></div>
            <span className="login__form-loading-text">
              Palaukite...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

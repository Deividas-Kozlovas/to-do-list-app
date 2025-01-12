import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/AuthServices";
import "./register.scss";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Įvyko klaida: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register__wrapper">
      <form onSubmit={handleRegister} className="register__form">
        <h2 className="register__form-title">Registracija</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="register__form-input"
          placeholder="Vardas"
          required
          disabled={isLoading}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="register__form-input"
          placeholder="El. paštas"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="register__form-input"
          placeholder="Slaptažodis"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className="register__form-button"
          disabled={isLoading}
        >
          {isLoading ? "Registruojama..." : "Registruotis"}
        </button>
        {error && <p className="register__form-error">{error}</p>}
        <div>
          <Link to="/login" className="register__form-link">
            Jau turite paskyrą? Prisijunkite
          </Link>
        </div>
        <div>
          <Link to="/" className="register__form-link">
            Grižti į pagridinį puslapį
          </Link>
        </div>
        {isLoading && (
          <div className="register__form-loading">
            <div className="register__form-loading-spinner"></div>
            <span className="register__form-loading-text">
              Kraunama...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;

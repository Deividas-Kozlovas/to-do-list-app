import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/AuthServices";
import ReCAPTCHA from "react-google-recaptcha";
import "./ResetPassword.scss";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      let errorMessage = "Įvyko klaida: ";
      if (err.message.includes("auth/invalid-email")) {
        errorMessage = "Neteisingas el. pašto adresas.";
      } else if (err.message.includes("auth/user-not-found")) {
        errorMessage = "Vartotojo su šiuo el. pašto adresu nėra.";
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
    <div className="reset-password__wrapper">
      <form onSubmit={handleResetPassword} className="reset-password__form">
        <h2 className="reset-password__form-title">Atkurti slaptažodį</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="El. pašto adresas"
          required
          className="reset-password__form-input"
          disabled={isLoading || success}
        />
        <button
          type="submit"
          className="reset-password__form-button"
          disabled={isLoading || success}
        >
          {isLoading
            ? "Siunčiama..."
            : success
            ? "Nurodymai išsiųsti!"
            : "Atkurti slaptažodį"}
        </button>
        {error && <p className="reset-password__form-error">{error}</p>}
        {/* <ReCAPTCHA
          className="grecaptcha-badge"
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onChange}
        /> */}
        {success && (
          <p className="reset-password__form-success">
            Patikrinkite savo el. paštą, kur rasite instrukcijas, kaip atkurti
            slaptažodį.
          </p>
        )}
        <div>
          <Link to="/login" className="reset-password__form-link">
            Grižti prie prisijungimo
          </Link>
        </div>
        {isLoading && (
          <div className="reset-password__form-loading">
            <div className="reset-password__form-loading-spinner"></div>
            <span className="reset-password__form-loading-text">
              Siunčiama...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;

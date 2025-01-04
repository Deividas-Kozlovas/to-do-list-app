// ResetPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/password-reset/resetPassword.scss';
import { resetPasswordUser } from '../../actions/authActions';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const result = await resetPasswordUser(email);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='user-screen'>
      <header className="user-screen__header">
        <h1 className="user-screen__header-title">To Do List APP</h1>
      </header>
      <form onSubmit={handleResetPassword} className="user-screen__form">
        <h2 className='user-screen__form-title'>Atkurti slaptažodį</h2>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="user-screen__form-input"
          placeholder="El. pašto adresas" 
          required 
          disabled={isLoading || success}
        />
        <button type="submit" className="user-screen__form-button" disabled={isLoading || success}>
          {isLoading ? 'Siunčiama...' : success ? 'Nurodymai išsiųsti!' : 'Atkurti slaptažodį'}
        </button>
        {error && <p className="user-screen__form-error">{error}</p>}
        {success && (
          <p className="user-screen__form-success">
            Patikrinkite savo el. paštą, kur rasite instrukcijas, kaip atkurti slaptažodį.
          </p>
        )}
        <div className="user-screen__form-link">
          <Link to="/login" className="user-screen__form-link-link">Grižti prie prisijungimo</Link>
        </div>
        {isLoading && 
          <div className="user-screen__loader-container">
            <div className="user-screen__loader"></div>
            <span className="user-screen__loader-container-text">Siunčiama...</span>
          </div>
        }
      </form>
    </div>
  );
};

export default ResetPassword;
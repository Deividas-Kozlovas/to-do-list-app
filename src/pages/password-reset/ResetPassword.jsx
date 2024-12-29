import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/user/User.scss';
import { resetPasswordUser } from '../../actions/AuthActions';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      setError(result.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='user-screen'>
      <header className="header">
        <h1>To Do App</h1>
      </header>
        <form onSubmit={handleResetPassword} className="user-form">
          <h2>Atkurti slaptažodį</h2>
          <div className="form-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="El. pašto adresas" 
              required 
              disabled={isLoading || success}
            />
          </div>
          <button type="submit" disabled={isLoading || success}>
            {isLoading ? 'Siunčiama...' : success ? 'Nurodymai išsiųsti!' : 'Atkurti slaptažodį'}
          </button>
          {error && <p className="error">{error}</p>}
          {success && (
            <p className="success">
              Patikrinkite savo el. paštą, kur rasite instrukcijas, kaip atkurti slaptažodį.
            </p>
          )}
          <div className="user-link">
            <Link to="/login">Grižti prie prisijungimo</Link>
          </div>
          {isLoading && <div className="loader-container">
            <div className="loader"></div>
            <span className="loader-text">Palaukite...</span>
          </div>}
        </form>
      </div>
  );
};

export default ResetPassword;
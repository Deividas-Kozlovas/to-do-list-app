// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/login/login.scss';
import { loginUser } from '../../actions/AuthActions';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await loginUser(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        let errorMessage = 'Įvyko klaida: ';
        if (result.error.includes('auth/too-many-requests')) {
          errorMessage = 'Per daug prašymų, prašome palaukti.';
        } else if (result.error.includes('auth/invalid-credential')) {
          errorMessage = 'Neteisingi prisijungimo duomenys.';
        } else {
          errorMessage += result.error;
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='user-screen'>
      <header className="header">
        <h1>To Do List APP</h1>
      </header>
      <form onSubmit={handleLogin} className="user-form">
        <h2>Prisijungimas</h2>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="El. paštas adresas" 
          required 
          disabled={isLoading}
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Slaptažodis" 
          required 
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Prisijungiama...' : 'Prisijungti'}
        </button>
        {error && <p className="error">{error}</p>}
        <div className="user-link">
          <Link to="/reset-password">Pamirštote slaptažodį?</Link>
        </div>
        <div className="user-link">
          <Link to="/register">Neturite paskyros? Užsiregistruokite</Link>
        </div>
        <div className="user-link">
          <Link to="/">Grižti į pagridinį puslapį</Link>
        </div>
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
            <span className="loader-text">Palaukite...</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
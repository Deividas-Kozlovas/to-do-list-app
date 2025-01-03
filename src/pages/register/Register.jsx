// Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/register/register.scss';
import { registerUser } from '../../actions/AuthActions';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await registerUser(formData.email, formData.password, formData.name);
      if (result.success) {
        navigate('/');
      } else {
        let errorMessage = 'Įvyko klaida: ';
        if (result.error.includes('auth/email-already-in-use')) {
          errorMessage = 'Šis el. paštas jau naudojamas.';
        } else if (result.error.includes('Password should be at least 6 characters')) {
          errorMessage = 'Slaptažodį turi sudaryti bent 6 simboliai.';
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
      <form onSubmit={handleRegister} className="user-form">
        <h2>Registracija</h2>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Vardas" 
          required 
          disabled={isLoading}
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="El. paštas" 
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
          {isLoading ? 'Registruojama...' : 'Registruotis'}
        </button>
        {error && <p className="error">{error}</p>}
        <div className="user-link">
          <Link to="/login">Jau turite paskyrą? Prisijunkite</Link>
        </div>
        <div className="user-link">
          <Link to="/">Grižti į pagridinį puslapį</Link>
        </div>
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
            <span className="loader-text">Kraunama...</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
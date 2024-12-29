import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/user/User.scss';
import { registerUser } from '../../actions/AuthActions';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await registerUser(email, password, name);
      if (result.success) {
        navigate('/login');
      } if (result.error.includes('auth/email-already-in-use')) {
        setError('Šis el. paštas jau naudojamas.');
      } else {
        setError('Įvyko klaida: ' + result.error);
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
        <h1>To Do App</h1>
      </header>
    <form onSubmit={handleRegister} className="user-form">
      <h2>Registracija</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Vardas" 
        required 
        disabled={isLoading}
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="El. paštas" 
        required 
        disabled={isLoading}
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
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
        <Link to="/">Atgal</Link>
      </div>
      {isLoading && <div className="loader-container">
        <div className="loader"></div>
        <span className="loader-text">Kraunama...</span>
      </div>}
    </form>
    </div>
  );
};

export default Register;
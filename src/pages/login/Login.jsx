import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/user/User.scss';
import { loginUser } from '../../actions/AuthActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        navigate('/');
      } else {
        if (result.error.includes('auth/too-many-requests')) {
          setError('Per daug prašymų, prašome palaukti.');
        } else if (result.error.includes('auth/invalid-credential')) {
          setError('Neteisingi prisijungimo duomenys.');
        } else {
          setError('Įvyko klaida: ' + result.error);
        }
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
      <form onSubmit={handleLogin} className="user-form">
        <h2>Prisijungimas</h2>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="El. paštas adresas" 
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
          {isLoading ? 'Prisijungiama...' : 'Prisijungti'}
        </button>
        {error && <p className="error">{error}</p>}
        <div className="user-link">
          <Link to="/register">Neturite paskyros? Užsiregistruokite</Link>
        </div>
        <div className="user-link">
          <Link to="/">Atgal</Link>
        </div>
        {isLoading && <div className="loader-container">
          <div className="loader"></div>
          <span className="loader-text">Palaukite...</span>
        </div>}
      </form>
    </div>
  );
};

export default Login;
// 
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../../styles/user-login/Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sėkmingai prisijungta, galite nukreipti naudotoją į pagrindinį puslapį arba parodyti sėkmės pranešimą
      alert('Prisijungta sėkmingai!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Prisijungimas</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="El. paštas" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Slaptažodis" 
        required 
      />
      <button type="submit">Prisijungti</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
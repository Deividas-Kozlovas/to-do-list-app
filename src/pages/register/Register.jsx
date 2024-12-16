import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../../styles/user-register/Register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Sėkmingai užregistruota, galite nukreipti naudotoją į kitą puslapį arba parodyti sėkmės pranešimą
      alert('Registracija sėkminga!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      <h2>Registracija</h2>
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
      <button type="submit">Registruotis</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Register;
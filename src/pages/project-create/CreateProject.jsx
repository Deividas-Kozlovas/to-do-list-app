import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/CRUDServices';
import { useAuth } from '../../context/AuthContext';
import '../../styles/project/Project.scss';

const CreateProject = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProject = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    const projectData = {
      Pavadinimas: name,
      Aprašymas: description,
      PradžiosData: startDate,
      PabaigosData: endDate,
    };

    try {
      const result = await createProject(projectData, currentUser.uid, name, description, startDate, endDate);
      if (result.success) {
        navigate('/');
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
    <div className="create-project-screen">
      <h1>Sukurti naują projektą</h1>
      <form onSubmit={handleCreateProject} className="create-project-form">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Projekto pavadinimas" 
          required 
          disabled={isLoading}
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Projekto aprašymas (nebūtina)" 
          disabled={isLoading}
        />
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          placeholder="Pradžios data" 
          required 
          disabled={isLoading}
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          placeholder="Pabaigos data" 
          required 
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Kuriama...' : 'Sukurti projektą'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
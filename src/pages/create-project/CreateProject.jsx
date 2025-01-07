import React, { useEffect, useState } from "react";
import { auth } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const CreateProject = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    e.preventDefault();
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await createProject(projectData, user.uid);
      if (result.success) {
        navigate("/");
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
          name="name"
          value={projectData.name}
          onChange={handleChange}
          placeholder="Projekto pavadinimas"
          required
          disabled={loading || isLoading}
        />
        <input
          type="text"
          name="description"
          value={projectData.description}
          onChange={handleChange}
          placeholder="Projekto aprašymas (nebūtina)"
          disabled={loading || isLoading}
        />
        <input
          type="date"
          name="startDate"
          value={projectData.startDate}
          onChange={handleChange}
          placeholder="Pradžios data"
          required
          disabled={loading || isLoading}
        />
        <input
          type="date"
          name="endDate"
          value={projectData.endDate}
          onChange={handleChange}
          placeholder="Pabaigos data"
          required
          disabled={loading || isLoading}
        />
        <button type="submit" disabled={loading || isLoading}>
          {isLoading ? "Kuriama..." : "Sukurti projektą"}
        </button>
        {error && <p className="error-message">Klaida: {error}</p>}
      </form>
    </div>
  );
};

export default CreateProject;

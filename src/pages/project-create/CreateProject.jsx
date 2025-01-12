import React, { useEffect, useState } from "react";
import { auth } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { createProject as createProjectService } from "../../services/ProjectServices";
import { useProjectContext } from "../../context/ProjectContext";
import "./createProject.scss";

const CreateProject = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {
    createProject,
    setLoading,
    setError,
    loading: globalLoading,
    error: globalError,
  } = useProjectContext();

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    status: false
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const result = await createProjectService({ ...projectData, userName: user.displayName, status: false });

      if (result.success) {
        createProject({ ...projectData, id: result.project.id, userName: user.displayName, status: false });
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project__wrapper">
      <form onSubmit={handleCreateProject} className="create-project__form">
        <h1 className="create-project__form-title">Sukurti naują projektą</h1>
        <label htmlFor="name" className="create-project__form-label">Pavadinimas:</label>
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          placeholder="Projekto pavadinimas"
          required
          className="create-project__form-input"
          disabled={globalLoading}
        />
        <label htmlFor="description" className="create-project__form-label">Aprašymas:</label>
        <input
          type="text"
          name="description"
          value={projectData.description}
          onChange={handleChange}
          placeholder="Projekto aprašas (nebūtina)"
          className="create-project__form-input"
          disabled={globalLoading}
        />
        <label htmlFor="startDate" className="create-project__form-label">Pradžios data:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={projectData.startDate}
          onChange={handleChange}
          required
          className="create-project__form-input"
          disabled={globalLoading}
          min={today}
        />
        <label htmlFor="endDate" className="create-project__form-label">Pabaigos data:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={projectData.endDate}
          onChange={handleChange}
          required
          className="create-project__form-input"
          disabled={globalLoading}
          min={today}
        />
        <label htmlFor="priority" className="create-project__form-label">Prioritetas:</label>
        <select
          id="priority"
          name="priority"
          value={projectData.priority}
          onChange={handleChange}
          required
          className="create-project__form-select"
        >
          <option value="" disabled selected>-----Prioritetas-----</option>
          <option value="Žemas">Žemas</option>
          <option value="Vidutinis">Vidutinis</option>
          <option value="Aukštas">Aukštas</option>
        </select>
        
        <button type="submit" className="create-project__form-button" disabled={globalLoading}>
          {globalLoading ? "Kuriama..." : "Sukurti projektą"}
        </button>

        {globalError && <p className="create-project__form-error-message">Klaida: {globalError}</p>}
        {globalLoading && (
          <div className="create-project__form-loading">
            <div className="create-project__form-loading-spinner"></div>
            <span className="create-project__form-loading-text">
              Kuriama...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProject;

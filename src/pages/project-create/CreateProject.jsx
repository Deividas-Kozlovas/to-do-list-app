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
  });

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
      const result = await createProjectService({ ...projectData, userName: user.displayName });

      if (result.success) {
        createProject({ ...projectData, id: result.project.id, userName: user.displayName });
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
        <input
          type="text"
          name="description"
          value={projectData.description}
          onChange={handleChange}
          placeholder="Projekto aprašymas (nebūtina)"
          className="create-project__form-input"
          disabled={globalLoading}
        />
        <input
          type="date"
          name="startDate"
          value={projectData.startDate}
          onChange={handleChange}
          placeholder="Pradžios data"
          required
          className="create-project__form-input"
          disabled={globalLoading}
        />
        <input
          type="date"
          name="endDate"
          value={projectData.endDate}
          onChange={handleChange}
          placeholder="Pabaigos data"
          required
          className="create-project__form-input"
          disabled={globalLoading}
        />
        <button type="submit" className="create-project__form-button" disabled={globalLoading}>
          {globalLoading ? "Kuriama..." : "Sukurti projektą"}
        </button>
  
        {globalError && <p className="create-project__form-error-message">Klaida: {globalError}</p>}
        {globalLoading && (
            <div className="reset-password__form-loading">
              <div className="reset-password__form-loading-spinner"></div>
              <span className="reset-password__form-loading-text">
                Kuriama...
              </span>
            </div>
          )}
      </form>
    </div>
  );
};

export default CreateProject;

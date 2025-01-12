import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../services/AuthServices";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUserProjects, updateProject as updateProjectService } from "../../services/ProjectServices";
import { useProjectContext } from "../../context/ProjectContext";
import "./editProject.scss";

const EditProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [user, loading] = useAuthState(auth);
  const {
    projects,
    setLoading,
    setError,
    setProjects,
    loading: globalLoading,
    error: globalError,
  } = useProjectContext();

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");

    const fetchProject = async () => {
      const result = await fetchUserProjects(user.displayName);
      if (result.success) {
        const project = result.projects.find(p => p.id === projectId);
        if (project) {
          setProjectData({
            name: project.name,
            description: project.description || "",
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            priority: project.priority || "",
          });
        } else {
          setError("Projektas nerastas.");
        }
      } else {
        setError(result.error);
      }
    };

    fetchProject();
  }, [loading, user, projectId, navigate, setError]);

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const result = await updateProjectService(projectId, projectData);
      if (result.success) {
        setProjects(projects.map(project => 
          project.id === projectId ? { ...project, ...projectData } : project
        ));
        setLoading(false);
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
    <div className="edit-project__wrapper">
      <form onSubmit={handleUpdateProject} className="edit-project__form">
        <h1 className="edit-project__form-title">Redaguoti projektą</h1>
        <label htmlFor="name" className="edit-project__form-label">Pavadinimas:</label>
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          required
          className="edit-project__form-input"
          disabled={globalLoading}
        />
        <label htmlFor="description" className="edit-project__form-label">Aprašas:</label>
        <input
          type="text"
          name="description"
          value={projectData.description}
          onChange={handleChange}
          className="edit-project__form-input"
          disabled={globalLoading}
        />
        <label htmlFor="startDate" className="edit-project__form-label">Pradžios data:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={projectData.startDate}
          onChange={handleChange}
          className="edit-project__form-input"
          disabled={globalLoading}
          min={today}
        />
        <label htmlFor="endDate" className="edit-project__form-label">Pabaigos data:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={projectData.endDate}
          onChange={handleChange}
          className="edit-project__form-input"
          disabled={globalLoading}
          min={today}
        />
        <label htmlFor="priority" className="edit-project__form-label">Prioritetas:</label>
        <select
          id="priority"
          name="priority"
          value={projectData.priority}
          onChange={handleChange}
          className="edit-project__form-select"
          disabled={globalLoading}
        >
          <option value="" disabled>-----Prioritetas-----</option>
          <option value="Žemas">Žemas</option>
          <option value="Vidutinis">Vidutinis</option>
          <option value="Aukštas">Aukštas</option>
        </select>
        
        <button type="submit" className="edit-project__form-button" disabled={globalLoading}>
          {globalLoading ? "Atnaujinama..." : "Atnaujinti projektą"}
        </button>

        {globalError && <p className="edit-project__form-error-message">Klaida: {globalError}</p>}
        {globalLoading && (
          <div className="edit-project__form-loading">
            <div className="edit-project__form-loading-spinner"></div>
            <span className="edit-project__form-loading-text">
              Atnaujinama...
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProject;

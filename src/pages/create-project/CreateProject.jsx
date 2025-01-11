import React, { useEffect, useState } from "react";
import { auth } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { createProject as createProjectService } from "../../services/ProjectServices";
import { useProjectContext } from "../../context/ProjectContext";

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
    e.preventDefault();
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
      const result = await createProjectService(projectData, user.uid);

      if (result.success) {
        createProject({ ...projectData, id: result.project.id });
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
          disabled={globalLoading}
        />
        <input
          type="text"
          name="description"
          value={projectData.description}
          onChange={handleChange}
          placeholder="Projekto aprašymas (nebūtina)"
          disabled={globalLoading}
        />
        <input
          type="date"
          name="startDate"
          value={projectData.startDate}
          onChange={handleChange}
          placeholder="Pradžios data"
          required
          disabled={globalLoading}
        />
        <input
          type="date"
          name="endDate"
          value={projectData.endDate}
          onChange={handleChange}
          placeholder="Pabaigos data"
          required
          disabled={globalLoading}
        />
        <button type="submit" disabled={globalLoading}>
          {globalLoading ? "Kuriama..." : "Sukurti projektą"}
        </button>

        {globalError && <p className="error-message">Klaida: {globalError}</p>}
      </form>
    </div>
  );
};

export default CreateProject;

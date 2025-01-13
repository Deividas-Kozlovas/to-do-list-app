import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../../services/AuthServices";
import { useAuthState } from "react-firebase-hooks/auth";
import { useProjectContext } from "../../context/ProjectContext";
import Modal from "../../components/model/Modal";
import ProjectTable from "../../components/projectTable/ProjectTable";
import ProjectFilter from "../../components/projectFilter/ProjectFilter";
import {
  deleteProjectService,
  updateProjectService,
} from "../../services/ProjectServices";
import userAvatar from "../../assets/images/user-avatar.png";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [user, authLoading, error] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [filter, setFilter] = useState({
    name: "",
    priority: "",
    status: "",
  });

  const {
    projects = [],
    setProjects,
    loading: projectLoading,
    error: projectError,
    setLoading,
    setError,
    updateProjectStatus,
    deleteProject,
  } = useProjectContext();

  const filteredProjects = projects.filter((project) => {
    const { name, priority, status } = filter;

    const matchesName =
      project.name &&
      project.name.toLowerCase().includes((name || "").toLowerCase());

    const matchesPriority = priority
      ? project.priority.toLowerCase() === priority.toLowerCase()
      : true;

    const matchesStatus =
      status === ""
        ? project.status === false
        : status === "true"
        ? project.status === true
        : status === "false"
        ? project.status === false
        : true;

    return matchesName && matchesPriority && matchesStatus;
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (logoutError) {
      console.error("Logout failed:", logoutError.message);
      alert("Atsijungimas nepavyko. Bandykite dar tiesiogiai.");
    }
  };

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setLoading(true);
    setError(null);

    try {
      deleteProject(projectToDelete);

      const result = await deleteProjectService(projectToDelete);

      if (result.success) {
        setShowModal(false);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleToggleStatus = async (project) => {
    const newStatus = !project.status;
    setLoading(true);
    setError(null);

    try {
      const updatedProjectData = {
        status: newStatus,
      };

      const result = await updateProjectService(project.id, updatedProjectData);
      if (result.success) {
        updateProjectStatus(project.id, newStatus);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="home">
      <main className="home__main">
        <section className="home__user-section">
          <div className="home__user-section-avatar">
            <img
              src={userAvatar}
              alt="Vartotojo avataras"
              width="50"
              height="50"
            />
          </div>
          <div className="home__user-section-info">
            <p>
              Sveiki atvykę,{" "}
              {user.displayName ? `${user.displayName}!` : "Vartotojau!"}
            </p>
            <button onClick={handleLogout}>Atsijungti</button>
          </div>
        </section>

        <section className="home__projects">
          <h2 className="home__projects-title">Projektų sąrašas</h2>
          <div className="home__projects-add-button">
            <Link to="/create-project">
              <button>Pridėti projektą</button>
            </Link>
          </div>

          <ProjectFilter filter={filter} onFilterChange={handleFilterChange} />

          <ProjectTable
            filteredProjects={filteredProjects}
            handleDeleteClick={handleDeleteClick}
            handleToggleStatus={handleToggleStatus}
            projectLoading={projectLoading}
            projectError={projectError}
          />
        </section>
      </main>

      {showModal && (
        <Modal
          message="Ar tikrai norite istrinti uzduoti?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {error && <p className="home__error">Klaida: {error}</p>}
    </div>
  );
};

export default Home;

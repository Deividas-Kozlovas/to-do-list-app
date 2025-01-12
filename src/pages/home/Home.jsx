import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../../services/AuthServices";
import { useAuthState } from "react-firebase-hooks/auth";
import { useProjectContext } from "../../context/ProjectContext";
import { fetchUserProjects, deleteProject } from "../../services/ProjectServices";
import userAvatar from "../../assets/images/user-avatar.png";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [user, authLoading, error] = useAuthState(auth);
  const {
    projects,
    setProjects,
    loading: projectLoading,
    error: projectError,
    setLoading,
    setError,
  } = useProjectContext();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (logoutError) {
      console.error("Logout failed:", logoutError.message);
      alert("Atsijungimas nepavyko. Bandykite dar tiesiogiai.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteProject(projectId);
      if (result.success) {
        setProjects(projects.filter((project) => project.id !== projectId));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) navigate("/login");

    if (user && user.displayName) {
      const getProjects = async () => {
        const result = await fetchUserProjects(user.displayName);
        if (result.success) {
          setProjects(result.projects);
        } else {
          console.error("Failed to fetch projects", result.error);
        }
      };

      getProjects();
    }
  }, [authLoading, user, navigate, setProjects]);

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
              Sveiki atvykę, {user.displayName ? `${user.displayName}!` : "Vartotojau!"}
            </p>
            <button onClick={handleLogout}>
              Atsijungti
            </button>
          </div>
          <div className="home__actions">
            
          </div>
        </section>
        <section className="home__projects">
          <h2 className="home__projects-title">Projektų sąrašas</h2>
          <div className="home__projects-add-button">
            <Link to="/create-project">
              <button>Pridėti projektą</button>
            </Link>
          </div>
          {projectLoading ? (
            <p className="home__projects-loading">Kraunama...</p>
          ) : projectError ? (
            <p className="home__projects-error">{projectError}</p>
          ) : projects.length > 0 ? (
            <table className="home__projects-list">
              <thead>
                <tr>
                  <th>Pavadinimas</th>
                  <th>Aprašymas</th>
                  <th>Pradžios data</th>
                  <th>Pabaigos data</th>
                  <th>Prioritetas</th>
                  <th>Veiksmai</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.description || "Nenurodyta"}</td>
                    <td>{project.startDate}</td>
                    <td>{project.endDate}</td>
                    <td>{project.priority}</td>
                    <td>
                      <button onClick={() => navigate(`/edit-project/${project.id}`)}>Keisti</button>
                      <button onClick={() => handleDeleteProject(project.id)}>Ištrinti</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="home__projects-empty">Kol kas projektų nėra.</p>
          )}
          <section className="home__features">
            <h2>Funkcijos, kurios palengvina jūsų darbą:</h2>
            <ul>
              <li>Intuityvus projektų valdymas</li>
              <li>Užduočių prioritetų nustatymas</li>
              <li>Terminų sekimas</li>
              <li>Bendradarbiavimas su komanda</li>
            </ul>
          </section>
        </section>
      </main>
      {error && <p className="home__error">Klaida: {error}</p>}
    </div>
  );
};

export default Home;

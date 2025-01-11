import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../../services/AuthServices";
import "./home.scss";
import userAvatar from "../../assets/images/user-avatar.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { useProjectContext } from "../../context/ProjectContext";
import { fetchUserProjects } from "../../services/ProjectServices";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { projects, setProjects } = useProjectContext();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (logoutError) {
      console.error("Logout failed:", logoutError.message);
      alert("Atsijungimas nepavyko. Bandykite dar kartą.");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");

    if (user) {
      const getProjects = async () => {
        const result = await fetchUserProjects(user.uid);
        if (result.success) {
          setProjects(result.projects);
        } else {
          console.error("Failed to fetch projects", result.error);
        }
      };

      getProjects();
    }
  }, [loading, user, navigate, setProjects]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="home-screen">
      <main>
        <div className="home-screen__main-content">
          <section className="home-screen__main-content-user-content">
            <div className="home-screen__main-content-user-content-avatar-logout">
              <img
                src={userAvatar}
                alt="Vartotojo avataras"
                className="home-screen__main-content-user-content-avatar"
                width="50"
                height="50"
              />
            </div>
            <div className="home-screen__main-content-user-content-info">
              <p className="home-screen__main-content-user-content-info-text">
                Sveiki atvykę,{" "}
                {user.displayName ? `${user.displayName}!` : "Vartotojau!"}
              </p>
              <button
                onClick={handleLogout}
                className="home-screen__main-content-user-content-logout-btn"
              >
                Atsijungti
              </button>
            </div>
          </section>
          <section>
            <Link to="/create-project">
              <button>Pridėti projektą</button>
            </Link>
          </section>
          <section className="home-screen__main-content-projects">
            <h2>Projektų sąrašas</h2>
            {projects.length > 0 ? (
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Pavadinimas</th>
                    <th>Aprašymas</th>
                    <th>Pradžios data</th>
                    <th>Pabaigos data</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.description || "Nenurodyta"}</td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Kol kas projektų nėra.</p>
            )}
          </section>
        </div>
      </main>
      {error && <p className="home-screen__error">Klaida: {error.message}</p>}
    </div>
  );
};

export default Home;

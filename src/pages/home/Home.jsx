import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/AuthServices';
import { getProjects } from '../../services/CRUDServices';
import '../../styles/home/Home.scss';
import userAvatar from '../../assets/images/user-avatar.png';

const Home = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchProjects();
    }
  }, [currentUser]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const result = await getProjects(currentUser.uid);
      if (result.success) {
        setProjects(result.projects);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Nepavyko gauti projektų sąrašo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/'); 
    } catch (error) {
      setError('Atsijungimas nepavyko. Bandykite dar kartą.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="home-screen">
      <header className="header">
        <h1>To Do App</h1>
      </header>
      
      {currentUser ? (
        <div className="main-content">
          <section className="user-content">
            <div className="user-avatar-logout">
              <img src={userAvatar} alt="User Avatar" className="user-avatar" />
            </div>
            <div className="user-info">
              <p>Sveiki atvykę, {userProfile?.name ? `${userProfile.name}!` : 'Vartotojas!'}</p>
              <button onClick={handleLogout} className="logout-btn" disabled={isLoading}>
                {isLoading ? 'Atsijungiama...' : 'Atsijungti'}
              </button>
            </div>
          </section>

          <section className="project-content">
            <section className="welcome-section">
              <h2>Sveiki atvykę į jūsų užduočių valdymo centrą!</h2>
              <p>Čia galite sekti ir valdyti savo projektus bei užduotis.</p>
            </section>

            <section className="projects-section">
              <h2>Jūsų Projektai</h2>
              {isLoading && <p className="loading">Kraunama...</p>}
              <div className="project-list">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <h3>{project.Pavadinimas}</h3>
                    <p>Projektas aprašymas...</p>
                    <button onClick={() => handleProjectClick(project.id)} className="project-btn">Atidaryti</button>
                  </div>
                ))}
                {!projects.length && !isLoading && <p className="no-projects">Jūs neturite jokių projektų.</p>}
              </div>
              <button onClick={handleCreateProject} className="create-btn" disabled={isLoading}>
                {isLoading ? 'Kraunama...' : 'Sukurti naują projektą'}
              </button>
            </section>

            <section className="features">
              <h2>Funkcijos, kurios palengvina jūsų darbą:</h2>
              <ul>
                <li><i className="fas fa-check"></i> Intuityvus projektų valdymas</li>
                <li><i className="fas fa-check"></i> Užduočių prioritetų nustatymas</li>
                <li><i className="fas fa-check"></i> Terminų sekimas</li>
                <li><i className="fas fa-check"></i> Bendradarbiavimas su komanda</li>
              </ul>
            </section>
          </section>
        </div>
      ) : (
        <main className="main-content split">
          <section className="left-section">
            <h2>Sveiki atvykę į Užduočių tvarkyklę</h2>
            <p>Čia galite efektyviai valdyti savo projektus ir užduotis.</p>
          </section>

          <section className="right-section">
            <h2>Supaprastinkite savo darbą</h2>
            <p>Ar norite efektyviai valdyti savo projektus ir užduotis?</p>
            <div className="cta-buttons">
              <Link to="/login">
                <button className="cta-btn" disabled={isLoading}>
                  {isLoading ? 'Prisijungiama...' : 'Prisijungti'}
                </button>
              </Link>
              <Link to="/register">
                <button className="cta-btn" disabled={isLoading}>
                  {isLoading ? 'Registruojama...' : 'Registruotis'}
                </button>
              </Link>
            </div>
          </section>
        </main>
      )}
      
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
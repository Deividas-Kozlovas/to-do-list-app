// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/authServices';
import '../../styles/home/home.scss';
import userAvatar from '../../assets/images/user-avatar.png';

const Home = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
  }, [currentUser]);

  return (
    <div className="home-screen">
      <header className="home-screen__header">
        <h1 className="home-screen__header-title">To Do List APP</h1>
      </header>
      
      {currentUser ? (
        <div className="home-screen__main-content">
          <section className="home-screen__main-content-user-content">
            <div className="home-screen__main-content-user-content-avatar-logout">
              <img src={userAvatar} alt="Vartotojo avataras" className="home-screen__main-content-user-content-avatar" width="50" height="50" />
            </div>
            <div className="home-screen__main-content-user-content-info">
              <p className="home-screen__main-content-user-content-info-text">Sveiki atvykę, {userProfile && userProfile.name ? `${userProfile.name}!` : 'Vartotojau!'}</p>
              <button onClick={handleLogout} className="home-screen__main-content-user-content-logout-btn" disabled={isLoading}>
                {isLoading ? 'Atsijungiama...' : 'Atsijungti'}
              </button>
            </div>
          </section>
        </div>
      ) : (
        <main className="home-screen__main-content home-screen__main-content--split">
          <section className="home-screen__main-content--split-left-section">
            <h2 className="home-screen__main-content--split-left-section-title">Sveiki atvykę į Užduočių tvarkyklę</h2>
            <p className="home-screen__main-content--split-left-section-description">Čia galite efektyviai valdyti savo projektus ir užduotis.</p>
          </section>
  
          <section className="home-screen__main-content--split-right-section">
            <h2 className="home-screen__main-content--split-right-section-title">Supaprastinkite savo darbą</h2>
            <p className="home-screen__main-content--split-right-section-description">Ar norite efektyviai valdyti savo projektus ir užduotis?</p>
            <div className="home-screen__main-content--split-right-section-buttons">
              <Link to="/login">
                <button className="home-screen__main-content--split-right-section-buttons-button" disabled={isLoading}>
                  Prisijungti
                </button>
              </Link>
              <Link to="/register">
                <button className="home-screen__main-content--split-right-section-buttons-button" disabled={isLoading}>
                  Registruotis
                </button>
              </Link>
            </div>
          </section>
        </main>
      )}
      
      {error && <p className="home-screen__error">{error}</p>}
    </div>
  );
};

export default Home;
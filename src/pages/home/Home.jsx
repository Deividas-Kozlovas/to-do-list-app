// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/AuthServices';
import '../../styles/home/Home.scss';
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
      <header className="header">
        <h1>To Do List APP</h1>
      </header>
      
      {currentUser ? (
        <div className="main-content">
          <section className="user-content">
            <div className="user-avatar-logout">
              <img src={userAvatar} alt="Vartotojo avataras" className="user-avatar" width="50" height="50" />
            </div>
            <div className="user-info">
              <p>Sveiki atvykę, {userProfile && userProfile.name ? `${userProfile.name}!` : 'Vartotojau!'}</p>
              <button onClick={handleLogout} className="logout-btn" disabled={isLoading}>
                {isLoading ? 'Atsijungiama...' : 'Atsijungti'}
              </button>
            </div>
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
            <div className="user-buttons">
              <Link to="/login">
                <button className="user-btn" disabled={isLoading}>
                  Prisijungti
                </button>
              </Link>
              <Link to="/register">
                <button className="user-btn" disabled={isLoading}>
                  Registruotis
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
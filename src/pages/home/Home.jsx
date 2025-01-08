import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../../services/AuthServices";
import { useAuthState } from "react-firebase-hooks/auth";
import "./home.scss";
import userAvatar from "../../assets/images/user-avatar.png";


const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (logoutError) {
      console.error("Logout failed:", logoutError.message);
      alert("Atsijungimas nepavyko. Bandykite dar kartą.");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [loading, user, navigate]);

  return (
    <div className="home-screen">
      <header className="home-screen__header">
        <h1 className="home-screen__header-title">To Do List APP</h1>
      </header>
      {user ? (
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
              Sveiki atvykę, {user.displayName ? `${user.displayName}!` : 'Vartotojau!'}
              </p>
              <button
                onClick={handleLogout}
                className="home-screen__main-content-user-content-logout-btn"
              >
                Atsijungti
              </button>
            </div>
          </section>
        </div>
      ) : (
        <main className="home-screen__main-content home-screen__main-content--split">
          <section className="home-screen__main-content--split-left-section">
            <h2 className="home-screen__main-content--split-left-section-title">
              Sveiki atvykę į Užduočių tvarkyklę
            </h2>
            <p className="home-screen__main-content--split-left-section-description">
              Čia galite efektyviai valdyti savo projektus ir užduotis.
            </p>
          </section>

          <section className="home-screen__main-content--split-right-section">
            <h2 className="home-screen__main-content--split-right-section-title">
              Supaprastinkite savo darbą
            </h2>
            <p className="home-screen__main-content--split-right-section-description">
              Ar norite efektyviai valdyti savo projektus ir užduotis?
            </p>
            <div className="home-screen__main-content--split-right-section-buttons">
              <Link to="/login">
                <button className="home-screen__main-content--split-right-section-buttons-button">
                  Prisijungti
                </button>
              </Link>
              <Link to="/register">
                <button className="home-screen__main-content--split-right-section-buttons-button">
                  Registruotis
                </button>
              </Link>
            </div>
          </section>
        </main>
      )}

      {error && <p className="home-screen__error">Klaida: {error.message}</p>}
    </div>
  );
};

export default Home;

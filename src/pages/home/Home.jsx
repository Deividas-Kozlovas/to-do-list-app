import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, logout } from "../../services/AuthServices";
import "./home.scss";
import userAvatar from "../../assets/images/user-avatar.png";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

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
  }, [loading, user, navigate]);

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
              <button>Prideti projekta</button>
            </Link>
          </section>
        </div>
      </main>
      {error && <p className="home-screen__error">Klaida: {error.message}</p>}
    </div>
  );
};

export default Home;

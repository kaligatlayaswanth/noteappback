import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, UserCircle, LogIn, LogOut } from 'lucide-react';
import "../styles/Layout.css";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');  // logout sonrası login sayfasına yönlendir
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="container header-container">
          <NavLink to="/" className="logo">
            <BookOpen size={24} />
            <span>NotesApp</span>
          </NavLink>

          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Home
                </NavLink>
              </li>

              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                      <UserCircle size={20} className="nav-icon" />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-button">
                      <LogOut size={20} className="nav-icon" />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                      <LogIn size={20} className="nav-icon" />
                      <span>Login</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className={({ isActive }) => isActive ? "nav-button active-button" : "nav-button"}
                    >
                      <UserCircle size={20} className="nav-icon" />
                      <span>Register</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} NotesApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

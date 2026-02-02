import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleReportsClick = () => {
    navigate('/reports');
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          Stay Healthy
          <img src="/images/doctor_favicon.png" alt="Logo" className="navbar-logo" />
        </a>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/find-doctors" className="nav-link">Find Doctors</a></li>
            <li><a href="/instant-consultation" className="nav-link">Instant Consultation</a></li>
            <li><a href="/appointments" className="nav-link">Appointments</a></li>
            <li><a href="/" className="nav-link">Health Blog</a></li>
            <li><a href="/reviews" className="nav-link">Reviews</a></li>
          </ul>
          <div className="navbar-buttons">
            {user ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <button className="user-button" onClick={toggleDropdown}>
                  <span className="welcome-text">Welcome, <strong>{user.name}</strong></span>
                  <i className={`bi bi-chevron-${showDropdown ? 'up' : 'down'}`}></i>
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleProfileClick}>
                      <i className="bi bi-person"></i> Profile
                    </button>
                    <button className="dropdown-item" onClick={handleReportsClick}>
                      <i className="bi bi-file-text"></i> Your Reports
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/signup" className="btn btn-primary">Sign Up</a>
                <a href="/login" className="btn btn-primary">Log In</a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

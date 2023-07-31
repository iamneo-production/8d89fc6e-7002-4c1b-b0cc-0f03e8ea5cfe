import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import './adminNavBar.css';
import Logo from '../img/logo.png';

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("Admin User");

  const handleLogout = () => {
    // Remove the stored credentials from localStorage
    localStorage.removeItem('credentials');
    // Redirect to the login page after logout
    navigate("/");
  };

  const isLinkActive = (linkPath) => {
    return location.pathname === linkPath;
  };

  return (
    <div>
      <nav className='navigation'>
        <div className='logocontainer'>
          <Link to="/admin" className='logolink'>
            <img src={Logo} alt="Logo" className='logo' />
          </Link>
        </div>
        <div className='center'>
          <Link to="/Popularplans" className={isLinkActive("/popularplans") ? "activeLink" : ""}>Users</Link>
          <Link to="/admin/PrepaidPlans" className={isLinkActive("/admin/PrepaidPlans") ? "activeLink" : ""}>Prepaid Plans</Link>
          <Link to="/admin/PostpaidPlans" className={isLinkActive("/admin/PostpaidPlans") ? "activeLink" : ""}>Postpaid Plans</Link>
          <Link to="/admin/AddOns" className={isLinkActive("/admin/AddOns") ? "activeLink" : ""}>AddOns</Link>
          <Link to="/admin/requests" className={isLinkActive("/admin/requests") ? "activeLink" : ""}>Admin Requests</Link>
        </div>
        <div className='right'>
          <span className="notificationbar_username">{userName}</span>
          <button className="logout_icon" onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} size="2x" style={{ "--fa-primary-opacity": "3", "--fa-secondary-opacity": "0.5" }} />
            <span className="logout_text">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;

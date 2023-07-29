import { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import "../Customer/navigationBar.css";
import Logo from "../img/logo.png";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get the stored credentials from localStorage
    const storedCredentials = localStorage.getItem('credentials');

    if (storedCredentials) {
      // Parse the stored credentials to get the username
      const credentials = JSON.parse(storedCredentials);
      setUserName(credentials.username);
    }
  }, []);

  const handleLogout = () => {
    // Remove the stored credentials from localStorage
    localStorage.removeItem('credentials');
    // Redirect to the login page after logout
    navigate("/Login");
  };

  const isLinkActive = (linkPath) => {
    return location.pathname === linkPath;
  };

  return (
    <div>
      <nav className='navigation'>
        <div className='logocontainer'>
          <Link to="/Login" className='logolink'>
            <img src={Logo} alt="Logo" className='logo' />
          </Link>
        </div>
        <div className='center'>
          <Link to="/Popularplans" className={isLinkActive("/Popularplans") ? "activeLink" : ""}>Popular Plans</Link>
          <Link to="/Addons" className={isLinkActive("/Addons") ? "activeLink" : ""}>Addon</Link>
          <Link to="/Notifications" className={isLinkActive("/Notifications") ? "activeLink" : ""}>Notifications</Link>
          <Link to="/Review" className={isLinkActive("/Review") ? "activeLink" : ""}>Reviews</Link>
        </div>
        <div className='right'>
          <span className="notificationbar_username">{userName}</span>
          <button className="logout_icon" onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} size="2xl" style={{ "--fa-primary-opacity": "3", "--fa-secondary-opacity": "0.5" }} />
            {/* <span className="logout_text">Logout</span> */}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;

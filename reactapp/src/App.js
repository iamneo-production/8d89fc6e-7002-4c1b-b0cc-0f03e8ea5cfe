import React, { useEffect } from 'react';
import { Link, Route, Routes, BrowserRouter as Router, useLocation}from 'react-router-dom';
import styles from './App.module.css';
import Logo from './logo.png';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import PopularPlans from './components/Popularplans';
import Addons from './components/user/AddOns';
import Recharge from './components/Recharge'; 
import Notifications from './components/Notifications'; 
import ReviewPage from './components/user/ReviewPage';


import PrepaidPlans from './components/admin/PrepaidPlans';
import AdminNavBar from './components/admin/AdminNavBar';
import AddPrepaidPlans from './components/admin/AddPrepaidPlans';
import EditPrepaidPlans from './components/admin/EditPrepaidPlans';
import PostpaidPlans from './components/admin/PostpaidPlans';
import AddPostpaidPlans from './components/admin/AddPostpaidPlans';
import EditPostpaidPlans from './components/admin/EditPostpaidPlans';
import AddOns from './components/admin/AddOns';
import AddAddOns from './components/admin/AddAddOns';
import EditAddOns from './components/admin/EditAddOns';
import AdminRequests from './components/admin/AdminRequests';
import { useNavigate } from 'react-router-dom';



const NavigationBar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Remove the stored credentials from localStorage
    localStorage.removeItem('credentials');
  };

  const isAdminPath = location.pathname.includes("/admin");
  // Exclude Login and Signup pages from showing the navigation bar
  if (location.pathname === '/Login' || location.pathname === '/Signup') {
    return null;
  }

  if (isAdminPath) {
    return (
      <AdminNavBar></AdminNavBar>
    );
  }

  return (
    <div>
      <nav className={styles.navigation}>
        <div className={styles.logocontainer}>
          <Link to="/Login" className={styles.logolink}>
            <img src={Logo} alt="Logo" className={styles.logo} />{/* Add the logo image */}
          </Link>
        </div>
        <div className={styles.center}>
          <Link to="/Popularplans">Popular Plans</Link>
          <Link to="/Addons">Addon</Link>
          <Link to="/Notifications">Notifications</Link>
          <Link to="/Review">Reviews</Link>
        </div>
        <div className={styles.right}>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
      </nav>

      {/* <Plans items={plans}></Plans> */}
    </div>
    
    
  );
};

const App = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  // Check if the user has admin access based on their role
  const userHasAdminAccess = user?.roles.includes('ROLE_ADMIN');

  console.log(user,"  ",userHasAdminAccess);

  const NotFound = () => {
    const navigate = useNavigate(); // Move the useNavigate() hook inside the NotFound component
  
    useEffect(() => {
      // Redirect to Login page when the NotFound component is mounted
      navigate('/Login');
    }, [navigate]);
  
    return null;
  };
  
  return (
    <Router>
      <div className={styles.container}>
        <div>
          <NavigationBar />
        </div>
        <div className={styles.context}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />


            <Route path="/PopularPlans" element={<PopularPlans />} />
            <Route path="/Addons" element={<Addons />} />
            <Route path="/Recharge" element={<Recharge/>} />
            <Route path="/Notifications" element={<Notifications/>} />
            <Route path="/Review" element={<ReviewPage/>} />


            <Route path="/admin" element={<PrepaidPlans />} />
            <Route path="/admin/PrepaidPlans" element={<PrepaidPlans />} />
            <Route path="/admin/AddPrepaidPlans" element={<AddPrepaidPlans />} />
            <Route path="/admin/EditPrepaidPlans" element={<EditPrepaidPlans />} />
            <Route path="/admin/PostpaidPlans" element={<PostpaidPlans />} />
            <Route path="/admin/AddPostpaidPlans" element={<AddPostpaidPlans />} />
            <Route path="/admin/EditPostpaidPlans" element={<EditPostpaidPlans />} />
            <Route path="/admin/AddOns" element={<AddOns />} />
            <Route path="/admin/AddAddOns" element={<AddAddOns />} />
            <Route path="/admin/EditAddOns" element={<EditAddOns />} />
            <Route path="/admin/requests" element={<AdminRequests/>} />

            {/* Add more routes for other pages */}

            {/* Catch-all route for any other path */} 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;

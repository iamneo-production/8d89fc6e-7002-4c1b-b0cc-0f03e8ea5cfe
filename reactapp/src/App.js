import { Link, Route, Routes, BrowserRouter as Router, useLocation}from 'react-router-dom';
import styles from './App.module.css';
import Logo from './logo.png';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import PopularPlans from './components/Popularplans';
import Addon from './components/Addon';
import Recharge from './components/Recharge'; 
import Notifications from './components/Notifications'; 
import PrepaidPlans from './components/admin/PrepaidPlans';
import AdminNavBar from './components/admin/AdminNavBar';
import AddPrepaidPlans from './components/admin/AddPrepaidPlans';



const NavigationBar = () => {
  const location = useLocation();
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
        <Link to="/Addon">Addon</Link>
        <Link to="/Notifications">Notifications</Link>
      </div>
      <div className={styles.right}>
        <Link to="/Logout">Logout</Link>
      </div>
    </nav>

    {/* <Plans items={plans}></Plans> */}
    </div>
    
    
  );
};

const App = () => {

  useEffect(() => {
    // Redirect to Login page when the app is deployed
    // const { pathname } = window.location;
    // if (pathname !== '/Login') {
    //   window.location.href = '/Login';
    // }
  }, []);
  
  return (
    <Router>
      <div className={styles.container}>
        <NavigationBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/PopularPlans" element={<PopularPlans />} />
          <Route path="/Addon" element={<Addon />} />
          <Route path="/Recharge" element={<Recharge/>} />
          <Route path="/Notifications" element={<Notifications/>} />
          <Route path="/admin/PrepaidPlans" element={<PrepaidPlans />} />
          <Route path="/admin/AddPrepaidPlans" element={<AddPrepaidPlans />} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

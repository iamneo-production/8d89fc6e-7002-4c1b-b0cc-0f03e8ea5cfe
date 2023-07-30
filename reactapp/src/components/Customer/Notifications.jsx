import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './notification.css';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './Navigationbar';

function Notifications() {
  const location = useLocation();
  const data = location.state;
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = () => {
    const storedCredentials = localStorage.getItem('credentials');
    if (!storedCredentials) {
      navigate('/login'); 
      setUserRole('guest');
    } else {
      const loggedUserData = JSON.parse(storedCredentials);
      setUserRole(loggedUserData.userRole);
    }
  };

  console.log('notifications', data);

  if (!data || !data.mobile) {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div  style={{ paddingTop: "100px" }}>
        <h4>Please recharge.</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style={{ paddingTop: "100px" }}>
      <div className='content'>
      <div className='column1'>
        <h2>You have recharged successfully</h2>
        {data && <h2>Your Number: {data.mobile}</h2>}
      </div>
      <div className='column2'>
        <img
          className='img_tick'
          src='https://t3.ftcdn.net/jpg/05/19/34/30/360_F_519343023_owTeGgGUILpJ31sTeaEYYhKB5CXst6M9.jpg'
          alt='react logo'
        />
      </div>
    </div>

      </div>
    </div>
  
  );
}

export default Notifications;

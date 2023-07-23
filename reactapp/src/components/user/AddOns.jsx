import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserAddOnItems from './UserAddOnItems';
import AddOnsList from './AddOnsList';
import styles from './Addon.module.css';
import { useNavigate } from 'react-router-dom';

const AddOns = () => {
  const [addOns, setAddOns] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAddOns();
    checkUserRole();
  }, []);

  const loadAddOns = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/getAddon');
      setAddOns(res.data);
    } catch (error) {
      console.log('Error occurred while loading addons:', error);
    }
  };

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

  return (
    <div className={styles.container}>
      {userRole === 'guest' ? (
        <h4>Need to login first</h4>
      ) : (
        <>
          {addOns.length === 0 ? (
            <div className={styles.noAddonsMessage}>No AddOns Found.</div>
          ) : (
            <AddOnsList items={addOns} />
          )}
        </>
      )}
    </div>
  );
};

export default AddOns;
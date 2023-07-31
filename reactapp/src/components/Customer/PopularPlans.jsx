import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  "../Customer/popularPlans.css";
import NavigationBar from "./Navigationbar";
import Plans from './Plans';

const PopularPlans = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    checkUserRole();
  }, [plans]); // Only trigger this effect when plans change

  const loadPlans = async () => {
    try {
      const res = await axios.get('https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/admin/getAllPlan');
      setPlans(res.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError('Error occurred while loading plans.');
      console.log('Error occurred while loading plans:', error);
      setLoading(false);
    }
  };

  const checkUserRole = () => {
    const storedCredentials = localStorage.getItem('credentials');
    if (!storedCredentials) {
      setError('Credentials not found in localStorage.');
      setUserRole(null);
    } else {
      const loggedUserData = JSON.parse(storedCredentials);
      setUserRole(loggedUserData.userRole);
    }
  };

  console.log(plans);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (userRole === 'user' || userRole === 'admin') {
    console.log('User has the role', userRole);
    return (
        <div>
            <NavigationBar/>
            <div style={{ paddingTop: "100px" }} >
            {error ? (
          <div
        //    className={styles.error}
           >{error}</div>
        ) : (
          <>
            {plans.length === 0 ? (
              <div 
              className='noAddonsMessage'
              >
              No Plans Found.</div>
            ) : (
              <div>
                <Plans items={plans} />
              </div>
            )}
          </>
        )}
    </div>
      </div>
    );
  }
  else {
    
    // return <h4>Need to login first</h4>;
    navigate('/login');
    return null;
  }
};

export default PopularPlans;

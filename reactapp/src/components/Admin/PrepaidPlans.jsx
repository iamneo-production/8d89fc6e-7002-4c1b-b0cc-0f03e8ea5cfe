import PrepaidPlansItems from './PrepaidPlanItem';
import axios from "axios";
import AccessDenied from '../Open/AccessDenied';




import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import './prepaidPlans.css';

const PrepaidPlans = () => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
      setLoading(false);
    } catch (error) {
      setError(true);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredPlans = [];

  if (Array.isArray(plans)) {
    filteredPlans = plans.filter((plan) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      const planNameLowerCase = plan.planName.toLowerCase();
      const planPriceString = plan.planPrice.toString();

      return (
        planNameLowerCase.includes(searchTermLowerCase) ||
        planPriceString.includes(searchTermLowerCase)
      );
    });
  }

  const handleAddPlan = () => {
    window.location.href = '/admin/AddPrepaidPlans';
  };

  if (userRole === 'admin') {
    return (
      <div>
        <AdminNavBar></AdminNavBar>
        <div style={{ paddingTop: "100px" }}>
        <div>
        <div className="search-bar">
          <div className="grid-3">
            <button className='add_plan' onClick={handleAddPlan}>
              {/* <FontAwesomeIcon icon={faCirclePlus} flip /> */}
              Add Plan
            </button>
          </div>
          <div className="grid-6">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="grid-3">
            {/* <button>Search</button> */}
          </div>
        </div>

        <header>
          <tr>
            <th className='title1'>Plan Type</th>
            <th className='title2'>Plan Name</th>
            <th className='title3'>Plan Price</th>
          </tr>
        </header>

        {filteredPlans.length === 0 ? (
          <div className="no-plans-message">No PrepaidPlans Found.</div>
        ) : (
          filteredPlans.map((allPlans) => {
            if (allPlans.planType.toLowerCase() === "prepaid") {
              return (
                <PrepaidPlansItems
                  key={allPlans.planId}
                  id={allPlans.planId}
                  type={allPlans.planType}
                  name={allPlans.planName}
                  validity={allPlans.planValidity}
                  details={allPlans.planDetails}
                  offers={allPlans.planOffers}
                  price={allPlans.planPrice}
                />
              );
            } else {
              return null;
            }
          })
        )}

        {filteredPlans.length < 0 && !filteredPlans.some((plan) => plan.planType === "postpaid") && (
          <div className="no-plans-message">No Prepaid plans found.</div>
        )}
      </div>
        </div>
      </div>
      
    );
  } else {
    // return (
    //   <div>
    //     <h3>No access</h3>
    //   </div>
    // );
    return(<AccessDenied/>);
  }
};

export default PrepaidPlans;

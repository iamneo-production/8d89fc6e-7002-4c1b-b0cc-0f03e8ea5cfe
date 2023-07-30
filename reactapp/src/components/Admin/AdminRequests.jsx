import axios from "axios";
import React, { useState, useEffect } from 'react';
import AdminRequestsItem from './AdminRequestsItem';
import AdminNavBar from "./AdminNavBar";
import './adminRequests.css'; // Import the CSS file

const AdminRequests = () => {
  const [adminRequests, setAdminRequests] = useState([]);
  const [userRole, setUserRole] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    checkUserRole();
    // Fetch admin requests when the component mounts
    fetchAdminRequests();
  }, []);

  // useEffect(() => {
    // checkUserRole();
  // }, [plans]);

  const fetchAdminRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/admin/viewRequests');
      setAdminRequests(response.data);
      console.log(response.data);
    } 
  
    catch (error) {
      console.log(error);
      console.error('Error fetching admin requests:', error);
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

  const handleAcceptRequest = (requestId) => {
    // Remove the accepted request from the list
    setAdminRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
  };

  const handleRejectRequest = (requestId) => {
    // Remove the rejected request from the list
    setAdminRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
  };

  if(userRole==='admin'){
    return (

      <div>
        <AdminNavBar></AdminNavBar>
        <div style={{ paddingTop: "100px" }}>
        <div className="admin-requests-container">
        <h2 className="admin-requests-header">Admin Account Requests</h2>
        {adminRequests.length === 0 ? (
          <div className="noAccount">
          <p className="noAccountMsg">No admin account requests found.</p>
          </div>
        ) : (
          <ul className="admin-requests-list">
            {adminRequests.map((request) => (
              <AdminRequestsItem
                key={request.id}
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ))}
          </ul>
        )}
      </div>

        </div>
      
      </div>
     
    );
  }
  else{
    return (
      <div>
        <h3>No access</h3>
      </div>
    );
  }
 
};

export default AdminRequests;

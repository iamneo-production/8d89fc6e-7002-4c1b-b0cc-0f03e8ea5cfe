import React from 'react';
import axios from 'axios';
import './adminRequestsItem.css';
const AdminRequestsItem = ({ request, onAccept, onReject }) => {
  const handleAccept = async () => {
    try {
      await axios.post(`https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/auth/admin/authorizeRequest/${request.id}`);
      onAccept(request.id);
      
    } 
    catch (error) {
      console.error('Error accepting admin request:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(`https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/auth/admin/deleteRequest/${request.id}`);
      onReject(request.id);
    } catch (error) {
      console.error('Error rejecting admin request:', error);
    }
  };

  return (
    <li className='list'>
      <p><span className='adminreq_heading'>Username:</span>      <span className='adminreq_p'>{request.username}</span> </p>
      <p><span className='adminreq_heading'>Email: </span>        <span className='adminreq_p'>{request.email}</span></p>
      <p><span className='adminreq_heading'>Mobile Number:</span> <span className='adminreq_p'>{request.mobileNumber}</span></p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </li>
  );
};

export default AdminRequestsItem;

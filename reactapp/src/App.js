import React, { useEffect , useNavigate } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route

import Login from './Components/Auth/login';
import Signup from './Components/Auth/signup';
import Popularplans from './Components/Customer/PopularPlans';
import Recharge from './Components/Customer/Recharge';
import Addons from './Components/Customer/AddOns';
import Notifications from './Components/Customer/Notifications';
import ReviewPage from './Components/Customer/ReviewPage';
import PrepaidPlans from './Components/Admin/PrepaidPlans';
import AddPrepaidPlans from './Components/Admin/AddPrepaidPlans';
import EditPrepaidPlan from './Components/Admin/EditPrepaidPlans';
import PostpaidPlans from './Components/Admin/PostpaidPlans';
import AddPostpaidPlans from './Components/Admin/AddPostpaidPlans'
import EditPostpaidPlan from './Components/Admin/EditPostpaidPlans';

import AddOns from './Components/Admin/AddOns';
import AddAddOns  from './Components/Admin/AddAddOns';
import EditAddOns from './Components/Admin/EditAddOns';

import AdminRequests from './Components/Admin/AdminRequests';


const App = () => { 
  
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
      <div >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Popularplans" element={<Popularplans />} />
          <Route path="/Recharge" element={<Recharge />} />
          <Route path="/AddOns" element={<Addons />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Review" element={<ReviewPage/>} />

          
          <Route path="/admin" element={<PrepaidPlans />} />
          <Route path="/admin/PrepaidPlans" element={<PrepaidPlans />} />
          <Route path="/admin/AddPrepaidPlans" element={<AddPrepaidPlans />} />
          <Route path='/admin/EditPrepaidPlans' element={<EditPrepaidPlan/>}/>

          
          <Route path="/admin/PostpaidPlans" element={<PostpaidPlans />} />
          <Route path="/admin/AddPostpaidPlans" element={<AddPostpaidPlans />} />
          <Route path='/admin/EditPostpaidPlans' element={<EditPostpaidPlan/>}/>

          
          <Route path="/admin/AddOns" element={<AddOns />} />
          <Route path="/admin/AddAddOns" element={<AddAddOns />} />
          <Route path="/admin/EditAddOns" element={<EditAddOns />} />

          <Route path="/admin/requests" element={<AdminRequests/>} />

          {/* Catch-all route for any other path */} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './Navigationbar';
import "./recharge.css";

const Recharge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [userRole, setUserRole] = useState('');


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      rechargeType: data.type,
      name: name,
      mobile: mobile,
      email: email,
      rechargePlan: parseInt(data.data, 10),
      rechargePrice: data.price
    };

    try {
      console.log(payload);
      const response = await axios.post('https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/user/addRecharge', payload);

      if (response.status === 200) {
        // Recharge successful, handle the response accordingly
        console.log('Recharge successful');
        sendMailNotification(email); // Send mail notification
        navigate('/Notifications', { state: payload });
      } else {
        // Handle the error response
        console.log('Recharge failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const sendMailNotification = async (toEmail) => {
    const mailPayload = {
      to: toEmail,
      subject: "Recharge Successful",
      body: "Your recharge was successful. Thank you!"
    };

    try {
      const response = await axios.post('https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/sendmail', mailPayload);
      if (response.status === 200) {
        console.log('Mail notification sent successfully');
      } else {
        console.log('Failed to send mail notification');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const isButtonDisabled = !email || !name || !mobile;

  if (!data.type || !data.data || !data.price) {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div  style={{ paddingTop: "100px" }}>
                <p> Please choose a plan.</p>
                <p><Link to="/PopularPlans">Go Back</Link></p>
            </div>
        </div>);
  }

  

  return (
   <div>
    <NavigationBar/>
    <div style={{ paddingTop: "100px" }} >
    <div className='recharge_container'>
      <div className="row container">
        <div className="col-md-6 left">
          <label>
            <input
              type="text"
              name="textbox1"
              placeholder='Enter your Recharge Type'
              className="form-control"
              value={data?.type || ''}
              readOnly
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            <input
              type="text"
              name="textbox2"
              placeholder='Enter Email Address'
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="col-md-6 left">
          <label>
            <input
              type="text"
              name="textbox2"
              placeholder='Enter your Name'
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div className="col-md-6">
          <label>
            <input
              type="text"
              name="textbox2"
              placeholder='Enter Recharge Plan'
              className="form-control"
              value={data?.data || ''}
              readOnly
            />
          </label>
        </div>

        <div className="col-md-6 left">
          <label>
            <input
              type="text"
              name="textbox2"
              placeholder='Enter the Number to Recharge'
              className="form-control"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
        </div>

        <div className="col-md-6">
          <label>
            <input
              type="text"
              name="textbox2"
              placeholder='Recharge Price'
              className="form-control"
              value={data?.price || ''}
              readOnly
            />
          </label>
        </div>

        <div className="col-md-6">
        </div>

        <div className="col-md-6">
          <div>
            <button className='btn' type="submit" onClick={handleSubmit} disabled={isButtonDisabled}>
              Recharge
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
   </div>
  );
}

export default Recharge;

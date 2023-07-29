import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png';

import './signup.css'

const validatePassword = (password) => {
  // Password validation rules: 8 letters, 1 capital letter, 1 special character, 2 numbers
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d{2,})(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

const Signup = () => {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requestSent, setRequestSent] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password validation
    if (!validatePassword(password)) {
      alert(
        'Password must contain 8 letters, 1 capital letter, 1 special character, and 2 numbers'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const formData = {
      userRole: role,
      username: name,
      email: email,
      password: password,
      mobileNumber: mobileNumber,
    };

    try {
      let apiURL = '';

      // for user
      if (role === 'user') {
        apiURL = 'http://localhost:8080/auth/user/signup';
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setRole('');
          setName('');
          setEmail('');
          setMobileNumber('');
          setPassword('');
          setConfirmPassword('');

          // Redirect to Login after successful signup
          navigate('/login');
        } else {
          // Handle signup error
          const errorData = await response.json();
          console.log('Signup Error:', errorData);
          // Display error message to the user
          alert('Signup failed. Please try again.');
        }
      } else {
        apiURL = 'http://localhost:8080/admin/addUser';
        const response1 = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        apiURL = 'http://localhost:8080/auth/admin/signup';
        const response2 = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response1.ok && response2.ok) {
          console.log(response1.ok);
          console.log(response2.ok);
          // Reset the form
          setRole('');
          setName('');
          setEmail('');
          setMobileNumber('');
          setPassword('');
          setConfirmPassword('');
          setRequestSent(true);

          // navigate('/login');
        } else {
          // Handle signup error
          const errorData = await response1.json();
          console.log('Signup Error:', errorData);
          // Display error message to the user
          alert('Signup failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Signup Error:', error);
      // Display error message to the user
      alert('An error occurred during signup. Please try again.');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    
  };

  
  return (
    <div className="signup_container">
      <nav className="Signupheader">
        <div className="logocontainer">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <h1>Signup</h1>
      </nav>
      <div className="Signupbody">
      {requestSent ? (
          <div className='requestSentMessage'>
            <p>Your request to access the admin side has been sent.</p>
            <p>You will receive a notification once access is granted.</p>
            <p>Please log in with your credentials to view the user side.</p>
            <p>
              Already a user? <Link to="/login">Log in</Link>
            </p>
          </div>
        ) : (
        <form className="signupform" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role"></label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="name"></label>
            <input className="form_input" placeholder="Enter Username" type="text" id="name" value={name} onChange={handleNameChange} required />
          </div>
          <div>
            <label htmlFor="email"></label>
            <input className="form_input" placeholder="Enter Email" type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div>
            <label htmlFor="mobileNumber"></label>
            <input className="form_input" placeholder="Enter Mobile Number" type="tel" id="mobileNumber" value={mobileNumber} onChange={handleMobileNumberChange} required />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input className="form_input" placeholder="Password" type="password" id="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <div>
            <label htmlFor="confirmPassword"></label>
            <input placeholder="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            
          </div>
          <button className="signup_btn" type="submit">Sign Up</button>
          <p className='log_in'>Already a user? <Link to="/login">Log in</Link></p>
        </form>
        )}
      </div>
    </div>
  );
};

export default Signup;

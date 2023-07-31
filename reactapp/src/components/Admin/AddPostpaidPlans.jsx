import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import './addPostpaidPlans.css';

const AddPostpaidPlans = () => {
  const initialUserState = {
    planName: '',
    planPrice: '',
    planType: 'Postpaid', // Set the default value to "Postpaid"
    planOffers: '',
    planValidity: '',
    planDetails: {
      input1: '',
      input2: '',
      input3: '',
    },
  };

  const [plans, setPlans] = useState(initialUserState);
  const [formValid, setFormValid] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { planName, planPrice, planType, planOffers, planValidity, planDetails } = plans;

  useEffect(() => {
    checkUserRole();
  }, []);

  useEffect(() => {
    setFormValid(validateForm());
  }, [plans]);

  const checkUserRole = () => {
    const storedCredentials = localStorage.getItem('credentials');
    if (!storedCredentials) {
      setUserRole(null);
    } else {
      const loggedUserData = JSON.parse(storedCredentials);
      setUserRole(loggedUserData.userRole);
    }
  };

  const onInputChange = (e) => {
    setPlans({ ...plans, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const mergedInput = `${planDetails.input1} ${planDetails.input2} ${planDetails.input3}`;
    const updatedPlans = { ...plans, planDetails: mergedInput };
    await axios.post('https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/admin/addPlan', updatedPlans);
    console.log(updatedPlans);
    setPlans(initialUserState);
    setIsDropdownOpen(false);
    window.location = '/admin/PostpaidPlans';
  };

  const validateForm = () => {
    const { planName, planPrice, planType, planOffers, planValidity, planDetails } = plans;
    return (
      planName.trim() !== '' &&
      planPrice.trim() !== '' &&
      planType.trim() !== '' &&
      planOffers.trim() !== '' &&
      planValidity.trim() !== '' &&
      planDetails.input1.trim() !== '' &&
      planDetails.input2.trim() !== '' &&
      planDetails.input3.trim() !== ''
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInput1Change = (e) => {
    setPlans({ ...plans, planDetails: { ...planDetails, input1: e.target.value } });
  };

  const handleInput2Change = (e) => {
    setPlans({ ...plans, planDetails: { ...planDetails, input2: e.target.value } });
  };

  const handleInput3Change = (e) => {
    setPlans({ ...plans, planDetails: { ...planDetails, input3: e.target.value } });
  };

  if (userRole === 'admin') {
    return (
      <div>
        <AdminNavBar></AdminNavBar>
        <div style={{ paddingTop: "100px" }}>
        <div className="container_addPlan">
        <form onSubmit={onSubmit}>
          <div className="row container">
            <div className="col-md-6 left">
              <label>
                <input
                  type="text"
                  name="planName"
                  placeholder="Enter Plan Name"
                  className="form-control"
                  value={planName}
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                <input
                  type="text"
                  name="planPrice"
                  placeholder="Enter Plan Price"
                  className="form-control"
                  value={planPrice}
                  onChange={onInputChange}
                />
              </label>
            </div>


            <div className="col-md-6 left">
              <label>
                <input
                  type="text"
                  name="planType"
                  placeholder="Enter Plan Type"
                  className="form-control"
                  value="PostPaid"
                  readOnly
                />
              </label>
            </div>



            <div className="col-md-6">
              <label>
                <input
                  type="text"
                  name="planOffers"
                  placeholder="Enter Offer for the Plan"
                  className="form-control"
                  value={planOffers}
                  onChange={onInputChange}
                />
              </label>
            </div>

            <div className="col-md-6 left">
              <label>
                <input
                  type="text"
                  name="planValidity"
                  placeholder="Enter Plan Validity"
                  className="form-control"
                  value={planValidity}
                  onChange={onInputChange}
                />
              </label>
            </div>

            <div className="col-md-6">
              {!isDropdownOpen ? (
                <label>
                  <div className="dropdown-container">
                    <input
                      type="text"
                      name="planDetails"
                      placeholder="Enter Plan Description"
                      className="form-control"
                      value={`${planDetails.input1} ${planDetails.input2} ${planDetails.input3}`}
                      onClick={toggleDropdown}
                    />
                  </div>
                </label>
              ) : (
                <div className="dropdown">
                  <input
                    type="text"
                    placeholder="Data"
                    className="dropdown-input"
                    value={planDetails.input1}
                    onChange={handleInput1Change}
                  />
                  <input
                    type="text"
                    placeholder="Data Speed"
                    className="dropdown-input"
                    value={planDetails.input2}
                    onChange={handleInput2Change}
                  />
                  <input
                    type="text"
                    placeholder="Description of Plan"
                    className="dropdown-input"
                    value={planDetails.input3}
                    onChange={handleInput3Change}
                  />
                </div>
              )}
            </div>

            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div>
                <button className="btn" type="submit" disabled={!formValid}>
                  Add Plan
                </button>
                {!formValid && <span className="error-message">Please fill in all fields.</span>}
              </div>
            </div>
          </div>
        </form>
      </div>
        </div>
      </div>
      
    );
  } else {
    return (
      <div>
        <h3>No access</h3>
      </div>
    );
  }
};

export default AddPostpaidPlans;

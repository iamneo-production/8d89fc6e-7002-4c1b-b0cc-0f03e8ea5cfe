import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import axios from 'axios';

const EditPrepaidPlan = () => {
  const useLoc = useLocation();
  const plandata = useLoc.state;
  console.log(plandata.id);

  const [name, setName] = useState(plandata.name);
  const [price, setPrice] = useState(plandata.price);
  const [type, setType] = useState(plandata.type);
  const [offers, setOffers] = useState(plandata.offers);
  const [validity, setValidity] = useState(plandata.validity);
  const [details, setDetails] = useState(plandata.details);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = () => {
    const storedCredentials = localStorage.getItem('credentials');
    if (!storedCredentials) {
      setUserRole(null);
    } else {
      const loggedUserData = JSON.parse(storedCredentials);
      setUserRole(loggedUserData.userRole);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleOffersChange = (event) => {
    setOffers(event.target.value);
  };

  const handleValidityChange = (event) => {
    setValidity(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedPlan = {
      planId: plandata.id,
      planName: name,
      planPrice: price,
      planType: type,
      planOffers: offers,
      planValidity: validity,
      planDetails: details,
    };

    console.log(updatedPlan);

    await axios.post(
      `http://localhost:8080/admin/editPlan/${plandata.id}`,
      updatedPlan
    );

    window.location = '/admin/PrepaidPlans';
  };

  if (userRole === 'admin') {
    return (
      <div>
      <AdminNavBar></AdminNavBar>
      <div style={{ paddingTop: "100px" }}>
      <div className="recharge_container">
        <form onSubmit={onSubmit}>
          <div className="row container">
            <div className="col-md-6 left">
              <label>
                <input
                  type="text"
                  name="planName"
                  placeholder="Enter Plan Name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
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
                  value={price}
                  onChange={handlePriceChange}
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
                  value={type}
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
                  value={offers}
                  onChange={handleOffersChange}
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
                  value={validity}
                  onChange={handleValidityChange}
                />
              </label>
            </div>

            <div className="col-md-6">
              <label>
                <input
                  type="text"
                  name="planDetails"
                  placeholder="Enter Plan Description"
                  className="form-control"
                  value={details}
                  onChange={handleDetailsChange}
                />
              </label>
            </div>

            <div className="col-md-6"></div>

            <div className="col-md-6">
              <div>
                <button className="btn" type="submit">
                  Update Plan
                </button>
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

export default EditPrepaidPlan;

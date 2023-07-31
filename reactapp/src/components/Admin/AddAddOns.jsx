import { useEffect , useState} from "react";
import AdminNavBar from "./AdminNavBar";
import axios from 'axios';
import './addPostpaidPlans.css';

const AddAddOns = () => {
  const initialUserState = {
    addonName: "",
    addonPrice: "",
    addonType: "AddOn", 
    addonOffers: "",
    addonValidity: "",
    addonDetails: {
      input1: "",
      input2: "",
      input3: ""
    }
  };

  const [addons, setAddons] = useState(initialUserState);
  const [formValid, setFormValid] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { addonName, addonPrice, addonType, addonOffers, addonValidity, addonDetails } = addons;

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

  const onInputChange = (e) => {
    setAddons({ ...addons, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const mergedInput = `${addonDetails.input1} ${addonDetails.input2} ${addonDetails.input3}`;
    const updatedAddons = { ...addons, addonDetails: mergedInput };
    await axios.post("https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io//admin/addAddon", updatedAddons);
    console.log(updatedAddons);
    setAddons(initialUserState);
    setIsDropdownOpen(false);
    window.location = '/admin/AddOns';
  };

  const validateForm = () => {
    const { addonName, addonPrice, addonType, addonOffers, addonValidity, addonDetails } = addons;
    return (
      addonName.trim() !== "" &&
      addonPrice.trim() !== "" &&
      addonType.trim() !== "" &&
      addonOffers.trim() !== "" &&
      addonValidity.trim() !== "" &&
      addonDetails.input1.trim() !== "" &&
      addonDetails.input2.trim() !== "" &&
      addonDetails.input3.trim() !== ""
    );
  };

  useEffect(() => {
    setFormValid(validateForm());
  }, [addons]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInput1Change = (e) => {
    setAddons({ ...addons, addonDetails: { ...addonDetails, input1: e.target.value } });
  };

  const handleInput2Change = (e) => {
    setAddons({ ...addons, addonDetails: { ...addonDetails, input2: e.target.value } });
  };

  const handleInput3Change = (e) => {
    setAddons({ ...addons, addonDetails: { ...addonDetails, input3: e.target.value } });
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
                  name="addonName"
                  placeholder="Enter Addon Name"
                  className="form-control"
                  value={addonName}
                  onChange={onInputChange}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                <input
                  type="text"
                  name="addonPrice"
                  placeholder="Enter Addon Price"
                  className="form-control"
                  value={addonPrice}
                  onChange={onInputChange}
                />
              </label>
            </div>

           


            <div className="col-md-6 left">
              <label>
                <input
                  type="text"
                  className="form-control"
                  value="AddOn"
                  readOnly
                />
              </label>
            </div>


            <div className="col-md-6">
              <label>
                <input
                  type="text"
                  name="addonOffers"
                  placeholder="Enter Offer for the Addon"
                  className="form-control"
                  value={addonOffers}
                  onChange={onInputChange}
                />
              </label>
            </div>

            <div className="col-md-6 left">
              <label>
                <input
                  type="text"
                  name="addonValidity"
                  placeholder="Enter Addon Validity"
                  className="form-control"
                  value={addonValidity}
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
                      name="addonDetails"
                      placeholder="Enter Addon Description"
                      className="form-control"
                      value={addonDetails.input1 + " " + addonDetails.input2 + " " + addonDetails.input3}
                      onClick={toggleDropdown}
                      readOnly
                    />
                  </div>
                </label>
              ) : (
                <div className="dropdown">
                  <input
                    type="text"
                    placeholder="Data"
                    className="dropdown-input"
                    value={addonDetails.input1}
                    onChange={handleInput1Change}
                  />
                  <input
                    type="text"
                    placeholder="Data Speed"
                    className="dropdown-input"
                    value={addonDetails.input2}
                    onChange={handleInput2Change}
                  />
                  <input
                    type="text"
                    placeholder="Description of Addon"
                    className="dropdown-input"
                    value={addonDetails.input3}
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

export default AddAddOns;

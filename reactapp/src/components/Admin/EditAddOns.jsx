import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const EditAddOns = () => {
  const useLoc = useLocation();
  const addOndata = useLoc.state;
  console.log(addOndata.id);

  const [name, setName] = useState(addOndata.name);
  const [price, setPrice] = useState(addOndata.price);
  const [type, setType] = useState(addOndata.type);
  const [offers, setOffers] = useState(addOndata.offers);
  const [validity, setValidity] = useState(addOndata.validity);
  const [details, setDetails] = useState(addOndata.details);

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

    const updatedAddOn = {
      addonId: addOndata.id,
      addonName: name,
      addonPrice: price,
      addonType: type,
      addonOffers: offers,
      addonValidity: validity,
      addonDetails: details,
    };

    console.log(updatedAddOn);
      await axios.post(
        `https://8080-bcdebecaeaabbdddabaaafdeafcffbbb.project.examly.io/admin/editAddon/${addOndata.id}`,
        updatedAddOn
      );
      window.location = '/admin/AddOns';
      // window.location.reload(); 
    
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row container">
          <div className="col-md-6 left">
            <label>
              <input
                type="text"
                name="addonName"
                placeholder="Enter AddOn Name"
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
                name="addonPrice"
                placeholder="Enter AddOn Price"
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
                name="addonType"
                placeholder="Enter AddOn Type"
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
                name="addonOffers"
                placeholder="Enter Offer for the AddOn"
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
                name="addonValidity"
                placeholder="Enter AddOn Validity"
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
                name="addonDetails"
                placeholder="Enter AddOn Description"
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
                Update AddOn
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAddOns;

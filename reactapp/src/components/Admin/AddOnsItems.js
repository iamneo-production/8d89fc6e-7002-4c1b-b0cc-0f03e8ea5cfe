
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../Customer/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare, faTrashAlt, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const AddOnsItems = (addOns) => {
//   console.log(addOns.details.split(" "));
  const usenavigate = useNavigate();
  console.log(addOns);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deletePlan = async (addonId) => {
    const response = await axios.delete(`http://localhost:8080/admin/deleteAddon/${addonId}`);
    window.location.reload();
  }
  const handleEditPlan = (data) => {
    console.log(data);
    usenavigate('/admin/EditAddOns', { state: data })
  }
  const handleDeletePlan = (data) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowConfirmation(true);
  }
  const confirmDeletePlan = (data) => {
    console.log(data.id);
    deletePlan(data.id);
    setShowConfirmation(false);
  };

  const cancelDeletePlan = () => {
    setShowConfirmation(false);
  };

  if ((addOns.type).toLowerCase().trim() === "addon") {
    return (
      <Card className="admin_card">
        {/* <div> */}

        {/* Section1 */}
        <div className="col1">
          <p className="admin_plan_type">{addOns.type}</p>
          <p className="details">Description:{addOns.details.split(" ").slice(0, 1)}  {addOns.details.split(" ").slice(1, 2)}</p>
          <p className="details">Offers:<span className="admin_plan_offer">{addOns.offers}</span></p>

        </div>


        {/* section3 */}
        <div className="col">
          <p data-testid="planName" className="section3 admin_plan_name">{addOns.name}</p>
          <p data-testid="validity">(Validity:{addOns.validity})</p>
        </div>

        {/* section4 */}
        <div className="col">
          <div>
            <p data-testid="amount" className="price"><FontAwesomeIcon className='rupees' icon={faIndianRupeeSign} />{addOns.price}</p>
          </div>
        </div>

        {/* section5 */}
        <div className="section5">
          <button className="edit-button" onClick={() => handleEditPlan(addOns)}>
            <FontAwesomeIcon icon={faPenSquare} />
          </button>
          <button className="delete-button" onClick={() => handleDeletePlan(addOns)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
        {showConfirmation && (
          <div className="popup_box">
            <div className="confirmation-dialog">
              <p className="dialog">Are you sure you want to delete this plan?</p>
              <button className="confirm-button " onClick={() => confirmDeletePlan(addOns)}>
                Yes
              </button>
              <button className="cancel-button" onClick={cancelDeletePlan}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* </div> */}
      </Card>
    );
  }
}

export default AddOnsItems;

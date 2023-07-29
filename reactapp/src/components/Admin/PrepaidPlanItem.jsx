// based on test case

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import Card from "../Customer/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare, faTrashAlt, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const PrepaidPlanItem = (PrepaidPlans) => {
  console.log(PrepaidPlans.details.split(" "));
  const usenavigate = useNavigate();
  console.log(PrepaidPlans);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deletePlan = async (planId) => {
    const response = await axios.delete(`https://8080-bccbfcacfceaaabbdddabaaafdeafcffbbb.project.examly.io/admin/deletePlan/${planId}`);
    window.location.reload();
  }
  const handleEditPlan = (data) => {
    console.log(data);
    usenavigate('/admin/EditPrepaidPlans', { state: data })
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

  if ((PrepaidPlans.type).toLowerCase().trim() === "prepaid") {
    return (
      <Card className="admin_card">
        {/* <div> */}

        {/* Section1 */}
        <div className="col1">
          <p className="admin_plan_type">{PrepaidPlans.type}</p>
          <p className="details">Description:{PrepaidPlans.details.split(" ").slice(0, 1)}  {PrepaidPlans.details.split(" ").slice(1, 2)}</p>
          <p className="details">Offers:<span className="admin_plan_offer">{PrepaidPlans.offers}</span></p>

        </div>


        {/* section3 */}
        <div className="col">
          <p data-testid="planName" className="section3 admin_plan_name">{PrepaidPlans.name}</p>
          <p data-testid="validity">(Validity:{PrepaidPlans.validity})</p>
        </div>

        {/* section4 */}
        <div className="col">
          <div>
            <p data-testid="amount" className="price"><FontAwesomeIcon className='rupees' icon={faIndianRupeeSign} />{PrepaidPlans.price}</p>
          </div>
        </div>

        {/* section5 */}
        <div className="section5">
          <button className="edit-button" onClick={() => handleEditPlan(PrepaidPlans)}>
            <FontAwesomeIcon icon={faPenSquare} />
          </button>
          <button className="delete-button" onClick={() => handleDeletePlan(PrepaidPlans)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
        {showConfirmation && (
          <div className="popup_box">
            <div className="confirmation-dialog">
              <p className="dialog">Are you sure you want to delete this plan?</p>
              <button className="confirm-button " onClick={() => confirmDeletePlan(PrepaidPlans)}>
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

export default PrepaidPlanItem;

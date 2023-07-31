import { useNavigate } from 'react-router-dom';
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import netflix from '../img/netflix.png';
import amazon from '../img/amazon.jpeg';
import allott from '../img/allott.jpeg'
import hotstar from '../img/hotstar.jpeg'
 

const PlanItems = (objs) => {
  console.log("objs", objs);
  const usenavigate = useNavigate();
  const ButtonClick = () => {
    usenavigate('/Recharge', { state: objs });
    console.log(objs);
  };

  // Determine which image to use based on the offer
  let offerImage;
  if (objs.offers.toLowerCase().includes("netflix")) {
    console.log(objs.offers.toLowerCase());
    offerImage = netflix;
  } 
  else if  (objs.offers.split(" ").join("").toLowerCase().includes("allott")) {
    console.log(objs.offers.split(" ").join("").toLowerCase().includes("allott"));
    offerImage = allott;
  }
  else if  (objs.offers.split(" ").join("").toLowerCase().includes("hotstar")) {
    console.log(objs.offers.split(" ").join("").toLowerCase().includes("hotstar"));
    offerImage = hotstar;
  }
  else if  (objs.offers.split(" ").join("").toLowerCase().includes("amazon")) {
    console.log(objs.offers.split(" ").join("").toLowerCase().includes("amazon"));
    offerImage = amazon;
  }
  else{
    console.log((objs.offers.split(" ").join("").toLowerCase()));
    console.log((objs.offers.trim().toLowerCase().includes("allott")));
  }
  return (
    <Card>
      {/* <div> */}
      {/* Section1 */}
      <div className="col1">
        <p className="type">{objs.type}</p>
        <div>
          <p className="price"><FontAwesomeIcon className='rupees' icon={faIndianRupeeSign} />{objs.price}</p>
        </div>
        <p className="details">Data: {objs.data}</p>
        <p className="details">Speed: {objs.speed}</p>
        <p className="details">Note: {objs.note}</p>
      </div>

      {/* section2 */}
      {/* black Line */}
      <div className="blackLine"></div>

      {/* section3 */}
      <div className="col">
        <p className="section3 section_Heading">Data:</p>
        <p className="section3">{objs.data} ({objs.speed})</p>
      </div>

      {/* section4 */}
      <div className="col">
        <p className="section_Heading">Validity:</p>
        <p>{objs.validity}</p>
      </div>

      {/* section5 */}
      <div className="col2">
        <button onClick={ButtonClick} className='arrowButton'><FontAwesomeIcon className='arrow' icon={faGreaterThan} size="2xl" /></button>
        <div>
          <img className="ott" src={offerImage} alt={objs.offers} />
        </div>
      </div>
      {/* </div> */}
    </Card>
  );
};

export default PlanItems;


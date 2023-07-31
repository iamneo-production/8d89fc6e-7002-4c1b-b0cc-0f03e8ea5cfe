import './accessDenied.css';
import { Link } from 'react-router-dom';

const AccessDenied=()=>{
    return(
        <div >
         Access Denied,<Link to="/PopularPlans">Go Back</Link>
        </div>
    );
}
export default AccessDenied;




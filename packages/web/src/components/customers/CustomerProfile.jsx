import { useParams } from "react-router-dom"
import CustomerSlideBar from "./CustomerSlideBar";
import './CustomerProfile.css'
import AccountSettings from "./AccountSettings";
import Booktoservices from "./Booktoservices";

function CustomerProfile() {
    const {activepage} = useParams();
    return (
      <div className="customerProfile">
          <div className="customerProfilein">
              <div className="left">
              <CustomerSlideBar activepage={activepage}/>
              </div>
              <div className="right">
                  {activepage === 'accountsettings' && <AccountSettings/>}
                  {activepage === 'bookservice' && <Booktoservices/>}
              </div>
          </div>
        {/* CustomerProfile, showing {activepage} */}
      </div>
    )
}

export default CustomerProfile

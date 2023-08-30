import './AccountSettings.css';
import { useUser } from '../../context/UserContext';

function AccountSettings() {
  const { userData } = useUser();
  return (
    <div className="accountsettings">
      <h1 className='mainhead1'>Personal Information</h1>
      <div className='form'>
        <div className='form-group'>
          <label htmlFor="fname">Your First Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            value={userData ? userData.fname : ''}
            disabled
          />
        </div>

        <div className='form-group'>
          <label htmlFor="lname">Your Last Name</label>
          <input
            type="text"
            name="lname"
            id="lname"
            value={userData ? userData.lname : ''}
            disabled
          />
        </div>

        <div className='form-group'>
          <label htmlFor="phone">Your Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userData ? userData.phone : ''}
            disabled
          />
        </div>

        <div className='form-group'>
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={userData ? userData.email : ''}
            disabled
          />
        </div>

        <div className='form-group'>
          <label htmlFor="address">Your Address</label>
          <input
            type="text"
            name="address"
            id="emaaddressil"
            value={userData ? userData.address : ''}
            disabled
          />
        </div>
      </div>
      <button className='mainbutton1'>
        Save Changes
      </button>
    </div>
  )
}

export default AccountSettings

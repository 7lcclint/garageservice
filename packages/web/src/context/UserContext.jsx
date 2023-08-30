import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData')) || null
  );
  const setTheUser = (data) => {
    console.log('Setting user data:', data);
    setUserData(data);
  };
  const logout = () => {
    setUserData(null);
  };
  return (
    <UserContext.Provider value={{ userData, setTheUser, logout }}>
      {children}
    </UserContext.Provider>
  );
  
}
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useUser() {
  return useContext(UserContext);
}
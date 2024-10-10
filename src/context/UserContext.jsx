import * as React from 'react';
import Data from '../user.json';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userState, setUserState] = React.useState({
    dismissedCards: Data[0].dismissedCards,
  });

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);

export default UserProvider;

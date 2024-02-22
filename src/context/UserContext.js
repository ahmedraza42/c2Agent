import React, {useState} from 'react';

export const INITIAL_STATE_USER = {
 
  isLoggedIn: null,
  isUserFirstTime: false,
  isSplash:true,
};

export const UserContext = React.createContext([{}, () => {}]);

export const UserProvider = ({children}) => {
  const [state, setState] = useState({
    isLoggedIn: null,
    isUserFirstTime: false,
    isSplash:true,
    showCompleteProfile:false,
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

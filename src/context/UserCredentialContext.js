import React, {useState} from 'react';

export const INITIAL_STATE_USER = {
 
  id: 0,
  emailAddress: '',
};

export const UserCredentialContext = React.createContext([{}, () => {}]);

export const UserCredentialProvider = ({children}) => {
  const [state, setState] = useState({
    id: 0,
    emailAddress: '',
  });

  return (
    <UserCredentialContext.Provider value={[state, setState]}>
      {children}
    </UserCredentialContext.Provider>
  );
};

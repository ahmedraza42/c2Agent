import React, {useState} from 'react';

export const INITIAL_STATE_USER = {
 
};

export const ProfileContext = React.createContext([{}, () => {}]);

export const ProfileProvider = ({children}) => {
  const [state, setState] = useState({
  });

  return (
    <ProfileContext.Provider value={[state, setState]}>
      {children}
    </ProfileContext.Provider>
  );
};

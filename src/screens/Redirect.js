import React, { useContext, useEffect} from 'react';
import {View} from 'react-native';
import TokenStorageService from '../services/tokenService';
import {remove} from '../utils/storage';
import Text from '../components/Text';
import {UserContext} from '../context/UserContext';
import { ProfileContext } from '../context/ProfileContext';
const _tokenStorageService = TokenStorageService.getService();

const Redirect = () => {
  const [_, setUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  useEffect(() => {
    handleLogoutUser();
  }, []);
  const handleLogoutUser = async () => {
    const getUserName = await remove('current_user');
    _tokenStorageService.clearToken();
    setUserProfile((state) => ({}));
    setUser(state => ({
      isLoggedIn: false,
    }));
  };

  return (
    null
  );
};

export default Redirect;

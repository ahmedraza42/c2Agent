import {saveItemToStorage, getItemFromStorage, remove} from '../utils/storage';

const TokenStorageService = (function () {
  let _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  async function _setToken(tokenObj) {
    await saveItemToStorage('access', tokenObj);
  }
  async function _setAccessToken(tokenObj) {
    await saveItemToStorage('access', tokenObj);
  }
  async function _setRefreshToken(tokenObj) {
    await saveItemToStorage('refresh', tokenObj);
  }

  async function _getAccessToken() {
    return await getItemFromStorage('access');
  }

  async function _getRefreshToken() {
    return await getItemFromStorage('refresh');
  }

  async function _clearToken() {
    await remove('access');
    await remove('refresh');
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    setAccessToken:_setAccessToken,
    setRefreshToken:_setRefreshToken
  };
})();
export default TokenStorageService;

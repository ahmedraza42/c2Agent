import { ADD_COUNTRY, GET_CATEGORY} from '../types';

export const addCountry = data => {
  return {
    type: ADD_COUNTRY,
    payload: data,
  };
};

export const getCategory= data => {
    return {
      type: GET_CATEGORY,
      payload: data,
    };
  };

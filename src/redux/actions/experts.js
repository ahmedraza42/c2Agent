import { ADD_ALL_EXPERTS, ADD_COUNTRY, ADD_SELECTED_EXPERTS, GET_CATEGORY, REMOVE_EXPERT} from '../types';

export const addExpertList = data => {
  return {
    type: ADD_ALL_EXPERTS,
    payload: data,
  };
};

export const addSelectedExpert = data => {
  return {
    type: ADD_SELECTED_EXPERTS,
    payload: data,
  };
};

export const removeSelectedExpert = id => {
  return {
    type: REMOVE_EXPERT,
    payload: {
      id: id
  }
  };
};

export const getCategory= data => {
    return {
      type: GET_CATEGORY,
      payload: data,
    };
  };

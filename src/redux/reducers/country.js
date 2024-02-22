import { ADD_COUNTRY, GET_CATEGORY} from '../types';

const initialState = {
  country: [],
};
 const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };

    default:
      return state;
  }
};

export default countryReducer;

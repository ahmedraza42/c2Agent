import { ADD_BOOKINGNO } from "../types";

const initialState = {
    bookingNo: null,
  };

  export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_BOOKINGNO:
        return {
          ...state,
          bookingNo: action.payload,
        };
  
      default:
        return state;
    }
  };
  export default bookingReducer
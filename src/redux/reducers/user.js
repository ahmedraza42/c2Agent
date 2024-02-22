import { ADD_USER } from "../types";

const initialState = {
    user:{}
  };

  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        console.log('action.payload',action)
        let copy={
          id:action.payload.id,
          emailAddress:action.payload.emailAddress
        }
        return {
          ...state,
          user:copy
        };
  
      default:
        return state;
    }
  };
  export default userReducer
import { ADD_EXPERTS, ADD_SELECTED_EXPERTS, GET_CATEGORY, REMOVE_EXPERT } from "../types";

const initialState = {
    expert: [],
    selectedexpert: {},
  };
export const expertReducer = (state = initialState, action) => {
  let selectedexpert=state.selectedexpert;
    switch (action.type) {
      case ADD_EXPERTS:
       
        return {
          ...state,
          expert: action.payload,
        };
      case REMOVE_EXPERT:
        let copy=selectedexpert;
        delete copy[action.payload.id]
        return {
          ...state,
          selectedexpert: copy,
        };
      case ADD_SELECTED_EXPERTS:
        const addedProduct = action.payload.id;
        // let copy=[...state.selectedexpert]
        // copy.push(action.payload)
        // console.log({copy})
        return {
          ...state,
          selectedexpert: {...state.selectedexpert,[addedProduct]:action.payload},
        };
  
      default:
        return state;
    }
  };
  export default expertReducer
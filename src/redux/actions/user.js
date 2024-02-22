import { getItemFromStorage } from "../../utils/storage";
import { ADD_USER } from "../types";

export const getUserEmailAndId = (id,emailAddress) => {
  let data={
    id:id,
    emailAddress:emailAddress
  }
    return {
        type: ADD_USER,
        payload: {
            id,
            emailAddress
        }
    }
  };
import API_CALLS from "../../services/constants";
import { SET_FAVORITE, TOGGLE_FAVORITE } from "../types";


export const fetchFavoriteProducts = (data) => {
  return async (dispatch) => {
    try {
      const response = await API_CALLS.favoritesProducts(data);
      if (!response.success) {
        let msg = response.message || 'Something went wrong';
        throw new Error(msg);
      }

      const loadedFavoriteProducts = response.favs || [];
      dispatch({type: SET_FAVORITE, favoriteProducts: loadedFavoriteProducts});
    } catch (error) {
      throw error;
    }
  };
};

export const toggleFavorite = (data,item) => {
  return async (dispatch) => {
    try {
      const response = await API_CALLS.toggleFavorite(data);
      console.log('favv',response,data)
      if (response.status==true) {
        dispatch({type: TOGGLE_FAVORITE, product: item});
      }
      else{
       
        let msg = response.message || 'Something went wrong';
        throw new Error(msg);
      }
    
    } catch (error) {
      console.log({error})
      console.log(data)
      throw error;
    }
  };
};

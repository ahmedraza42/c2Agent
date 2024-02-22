import {
    SET_FAVORITE,
    TOGGLE_FAVORITE
  } from '../types';

  const INITAL_STATE = {
    products: [],
    filterProducts: [],
    favoriteProducts: [],
    units: [],
    presetsListing: [],
  };

  const productReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
   
      case SET_FAVORITE:
        return {
          ...state,
          favoriteProducts: action.favoriteProducts,
        };
  
      case TOGGLE_FAVORITE:
        console.log('reduscer',action)
        const existingIndex = state.favoriteProducts.findIndex(
          (product) => product.id === action.product.id,
        );
        console.log('existingIndex',existingIndex)
        if (existingIndex >= 0) {
          let updateFavoriteProduct = [...state.favoriteProducts];
          updateFavoriteProduct.splice(existingIndex, 1);
          return {...state, favoriteProducts: updateFavoriteProduct};
        } else {
        //   let product = state.products.find(
        //     (product) => product.id === action.productId,
        //   );
          return {
            ...state,
            favoriteProducts: state.favoriteProducts.concat(action.product),
          };
        }
  
   
  
      default:
        return state;
    }
  };

  export default productReducer;
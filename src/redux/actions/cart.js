// import APICALLS from '../../services/RequestHandler';
import {
  SET_CART,
  TOGGLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_ITEM,
  CLEAR_ALL,
} from '../types';

// export const fetchCart = (data) => {
//   return async (dispatch) => {
//     try {
//       const response = await APICALLS.viewCart(data);
//       if (!response.success) {
//         let msg = response.message || 'Something went wrong';
//         throw new Error(msg);
//       }

//       const loadedCartItems = response;
//       dispatch({type: SET_CART, cartItems: loadedCartItems});
//     } catch (error) {
//       throw error;
//     }
//   };
// };

export const toggleProductToCart = (data, value, item) => {
  console.log({item})
  return async (dispatch) => {
    try {
      // const response = await APICALLS.toggleProductToCart(data);
      // if (!response.success) {
      //   let msg = response.message || 'Something went wrong';
      //   throw new Error(msg);
      // }

      // const pId = item.productId || item.id;

      // const loadedCartItems = response;
      if (value === 'plus') {
        dispatch(addToCart(item));
      } else if (value === 'minus') {
        dispatch(removeFromCart( item.id||item.productId));
      } else if (value === 'remove') {
        dispatch(clearItemFromCart(item.id||item.productId));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload:product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    pid: productId,
  };
};

export const clearItemFromCart = (productId) => {
  console.log(productId)
  return {
    type: CLEAR_ITEM,
    pid: productId,
  };
};

// export const clearAll = () => {
//   return {
//     type: CLEAR_ALL,
//   };
// };
export const clearAll = (data) => {
  return async (dispatch) => {
    try {
      // const response = await APICALLS.clearCart(data);
      // if (!response.success) {
      //   let msg = response.message || 'Something went wrong';
      //   throw new Error(msg);
      // }
      // const clearCartResponse = response;
      dispatch({type: CLEAR_ALL});
    } catch (error) {
      throw error;
    }
  };
};

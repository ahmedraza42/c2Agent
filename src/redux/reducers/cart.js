import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  EMPTY_CART,
  SUB_QUANTITY,
  CLEAR_ITEM,
} from '../types';

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
  serviceFees: 0,
  deliveryFees: 2.5,
  netAmount: 0,
};
const cartReducer = (state = INITIAL_STATE, action) => {
  let cart = state.cart;
  // let filterItem = cart.filter((item) => action.payload.product.id !== item.product.id )
  console.log("action.payload",action)
  switch (action.type) {
    case ADD_TO_CART:
      let initial=true
      const addedProduct = action.payload;
      const productPrice = addedProduct.price;
      const addedProductId = addedProduct.productId || addedProduct.id;
console.log('addedProduct.zoq',addedProduct.moq)
      let newOrUpdateCartItem = {
        productId: addedProductId,
        category_name: addedProduct.category_name,
        description: addedProduct.description,
        discountedPrice: addedProduct.discountedPrice,
        image: addedProduct.image,
        name: addedProduct.name,
        price: addedProduct.price,
        product_category_id: addedProduct.product_category_id,
        product_image: addedProduct.product_image,
        quantity: addedProduct.quantity,
        short_unit: addedProduct.short_unit,
      };
      if (state.items[addedProductId]) {
        initial=false
        newOrUpdateCartItem = {
          ...newOrUpdateCartItem,
          qty: state.items[addedProductId].qty + 1,
          // total: state.items[addedProductId].total + productPrice,
        };
      } else {
        initial=true
        newOrUpdateCartItem = {
          ...newOrUpdateCartItem,
          qty: addedProduct.moq,
          // total: productPrice,
        };
      }
      let amount =initial==true?state.totalAmount + (productPrice * addedProduct.moq):state.totalAmount + productPrice ;
      let net =initial==true?state.totalAmount + (productPrice * addedProduct.moq) + state.deliveryFees+ 3.00:state.totalAmount + productPrice+ state.deliveryFees + 3.00;
      return {
        ...state,
        items: {...state.items, [addedProductId]: newOrUpdateCartItem},
        // totalAmount: state.totalAmount + (productPrice * addedProduct.moq),
        totalAmount: amount,
        netAmount: net,
      };
    case ADD_QUANTITY:
      let item = cart.find(item => item.product.id == action.payload.productId);

      let newCart = cart.filter(
        item => item.product.id != action.payload.productId,
      );

      item.quantity = action.payload.quantity;
      newCart.push(item);
      return {
        ...state,
        cart: newCart,
      };
    case REMOVE_FROM_CART:
      let selectedCartItem = state.items[action.pid];
      console.log({selectedCartItem})
      if (!selectedCartItem) {
        return {
          ...state,
        };
      }

      let currentQuentity = selectedCartItem.qty;
      let updatedCartItems;
      let netAmount;

      if (currentQuentity > 1) {
        const updatedCartItem = {
          ...selectedCartItem,
          qty: selectedCartItem.qty - 1,
          // total: selectedCartItem.total - selectedCartItem.price
        };
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
      }

      netAmount = state.netAmount - selectedCartItem.price;
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
        netAmount: netAmount,
      };
      case CLEAR_ITEM:
        let itemToClear = state.items[action.pid];
        let updatedItems = {...state.items};
        let netAmountAfterClear;
        let itemTotalAmount=itemToClear.qty*itemToClear.price
        delete updatedItems[action.pid];
  
        netAmountAfterClear =
          state.deliveryFees + (state.totalAmount - itemTotalAmount);
  
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotalAmount,
          netAmount: netAmountAfterClear,
        };
  
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
export default cartReducer;
// const initialState = {
//   products: [],
// };
// const ShoppinReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//     console.log("ADD TO CAssRT");
//       return {
//         ...state,
//         products: state.products.map(product =>
//           product.id === action.id ? {...product, selected: true} : product,
//         ),

//       };

//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         products: state.products.map(product =>
//           product.id === action.id
//             ? {...product, selected: false, quantity: 1}
//             : product,
//         ),
//       };
//     case ADD_QUANTITY:
//       return {
//         ...state,
//         products: state.products.map(product =>
//           product.id === action.id
//             ? {...product, quantity: product.quantity + 1}
//             : product,
//         ),
//       };
//     case SUB_QUANTITY:
//       return {
//         ...state,
//         products: state.products.map(product =>
//           product.id === action.id
//             ? {
//                 ...product,
//                 quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
//               }
//             : product,
//         ),
//       };
//     case EMPTY_CART:
//       return {
//         ...state,
//         products: state.products.map(product =>
//           product.selected
//             ? {...product, selected: false, quantity: 1}
//             : product,
//         ),
//       };
//     default:
//       return state;
//   }
// };
// export {ShoppinReducer};

import {combineReducers} from 'redux';
import userReducer from './user';
import cartReducer from './cart';
import productReducer from './products';

export default combineReducers({
  user:userReducer,
  cart: cartReducer,
  products:productReducer,
});

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from "redux-persist";
import RootReducer from './reducers/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

let middleware = [];
if (__DEV__) {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: 100000
};
// const persistedReducer = persistReducer(persistConfig, RootReducer);
// const store = createStore(persistedReducer, applyMiddleware(...middleware));
// const persistor = persistStore(store);

// export { store, persistor };
const middlewares = applyMiddleware(...middleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(RootReducer, composeEnhancers(middlewares));
export default Store;


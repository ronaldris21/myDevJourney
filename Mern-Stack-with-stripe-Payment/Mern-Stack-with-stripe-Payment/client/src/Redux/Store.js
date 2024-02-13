import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as user from './Reducers/UserReducers';
import * as cat from './Reducers/CatReducers';
import * as cards from './Reducers/CardReducers';
import * as orders from './Reducers/OrderReducers';

const rootReducer = combineReducers({
  // user reducer
  userLogin: user.LoginReducer,
  userRegister: user.registerReducer,
  changePassword: user.changePasswordReducer,
  updateProfile: user.profileReducer,
  deleteProfile: user.deleteProfileReducer,
  // category reducer
  categoriesList: cat.getAllCategoriesReducer,
  // card reducer
  getAllCards: cards.getAllCardsReducer,
  getCard: cards.getSingleCardReducer,
  allTags: cards.getAllTagsReducer,
  // order reducer
  createOrder: orders.createOrderReducer,
  getOrder: orders.getOrderDetailsReducer,
  getAllOrders: orders.getAllOrdersReducer,
  deleteAllOrders: orders.deleteAllOrdersReducer,
  deleteOrder: orders.deleteOrderReducer,
  stripe: orders.stripePaymentReducer,
  // wishlist reducer
  wishlists: cards.wishlistReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// get wishlists from localStorage
const wishlistFromStorage = localStorage.getItem('wishlists')
  ? JSON.parse(localStorage.getItem('wishlists'))
  : [];

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  wishlists: { wishlist: wishlistFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

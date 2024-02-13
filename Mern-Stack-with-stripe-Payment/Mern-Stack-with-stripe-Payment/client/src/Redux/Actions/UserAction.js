import * as Types from '../Constants/AllConstants';
import * as Apis from '../API/UserApis';
import { toast } from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../Protection';

// logout user
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_LOGOUT });
    dispatch({ type: Types.USER_LOGIN_RESET });
    dispatch({ type: Types.PROFILE_UPDATE_RESET });
    dispatch({ type: Types.CHANGE_PASSWORD_RESET });
    dispatch({ type: Types.DELETE_PROFILE_RESET });
    dispatch({ type: Types.USER_REGISTER_RESET });
    dispatch({ type: Types.CATEGORY_LIST_RESET });
    dispatch({ type: Types.PRODUCT_LIST_RESET });
    dispatch({ type: Types.GET_PRODUCT_RESET });
    dispatch({ type: Types.TAGS_PRODUCT_RESET });
    dispatch({ type: Types.ORDER_LIST_RESET });
    dispatch({ type: Types.GET_ORDER_RESET });
    dispatch({ type: Types.DELETE_ALL_ORDERS_RESET });
    dispatch({ type: Types.ORDER_DELETE_RESET });
    dispatch({ type: Types.STRIPE_RESET });
    Apis.logoutService();
  } catch (error) {
    toast.error('Logout failed');
  }
};

// login user
export const loginAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_LOGIN_REQUEST });
    const data = await Apis.loginService(user);
    dispatch({ type: Types.USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    ErrorsAction(error, dispatch, Types.USER_LOGIN_FAIL);
  }
};

// register user
export const registerAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_REGISTER_REQUEST });
    const data = await Apis.registerService(user);
    dispatch({ type: Types.USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: Types.USER_LOGIN_SUCCESS, payload: data });
    toast.success(`Welcome to OnlineShop ${data.fullName}`);
  } catch (error) {
    ErrorsAction(error, dispatch, Types.USER_REGISTER_FAIL);
  }
};

// update user profile
export const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: Types.PROFILE_UPDATE_REQUEST });
    const data = await Apis.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({ type: Types.PROFILE_UPDATE_SUCCESS });
    dispatch({
      type: Types.USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, Types.PROFILE_UPDATE_FAIL);
  }
};

// change user password
export const changePasswordAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: Types.CHANGE_PASSWORD_REQUEST });
    await Apis.changePasswordService(user, tokenProtection(getState));
    dispatch({ type: Types.CHANGE_PASSWORD_SUCCESS });
    toast.success('Password changed successfully');
  } catch (error) {
    ErrorsAction(error, dispatch, Types.CHANGE_PASSWORD_FAIL);
  }
};

// delete user profile
export const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: Types.DELETE_PROFILE_REQUEST });
    await Apis.deleteProfileService(tokenProtection(getState));
    dispatch({ type: Types.DELETE_PROFILE_SUCCESS });
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, Types.DELETE_PROFILE_FAIL);
  }
};

import * as Types from '../Constants/AllConstants';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.USER_LOGIN_REQUEST:
      return { loading: true };
    case Types.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case Types.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case Types.USER_LOGOUT || Types.USER_LOGIN_RESET:
      return {};

    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.USER_REGISTER_REQUEST:
      return { loading: true };
    case Types.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case Types.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case Types.USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case Types.PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case Types.PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case Types.PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case Types.CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case Types.CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case Types.CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.DELETE_PROFILE_REQUEST:
      return { loading: true };
    case Types.DELETE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case Types.DELETE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case Types.DELETE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

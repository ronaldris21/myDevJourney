import * as Types from '../Constants/AllConstants';

// get all categories

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case Types.CATEGORY_LIST_REQUEST:
      return { loading: true };
    case Types.CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case Types.CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case Types.CATEGORY_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};

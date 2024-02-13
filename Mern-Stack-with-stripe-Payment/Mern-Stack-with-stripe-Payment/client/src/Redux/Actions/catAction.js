import * as Types from '../Constants/AllConstants';
import * as Apis from '../API/CategoriesApis';
import { ErrorsAction } from '../Protection';

export const getCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: Types.CATEGORY_LIST_REQUEST });
    const data = await Apis.getCategoriesService();
    dispatch({ type: Types.CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    ErrorsAction(error, dispatch, Types.CATEGORY_LIST_FAIL);
  }
};

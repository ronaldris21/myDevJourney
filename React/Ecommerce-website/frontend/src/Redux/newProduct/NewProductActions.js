import axios from "axios";
import {
  NEW_PRODUCT_DETAILS_REQUEST,
  NEW_PRODUCT_DETAILS_SUCCESS,
  NEW_PRODUCT_DETAILS_FAIL,
} from "./NewProductConstants";
import { logout } from "../user/userActions";

// PRODUCT LIST
export const newProductDetails = (idService) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_DETAILS_REQUEST });
    console.log(`newProductDetailsACTION -> /api/products/${idService}`);

    const { data } = await axios.get(`http://localhost:5004/api/products/${idService}`);
    dispatch({ type: NEW_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// UPDATE PRODUCT on DATABASE
export const newProductPostChanges =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: NEW_PRODUCT_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const {
        newProduct: { editProduct },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.table("xd");
      console.log(editProduct);

      await axios
        .put(`/api/products/${editProduct._id}`, {editProduct: editProduct}, config)
        .then((response) => {
          dispatch(newProductDetails(editProduct._id));
        })
        .catch((reqError) => {
          const messageReqError =
            reqError.response && reqError.response.data.message
              ? reqError.response.data.message
              : reqError.message;
          dispatch({
            type: NEW_PRODUCT_DETAILS_FAIL,
            payload: messageReqError,
          });
        });

      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: NEW_PRODUCT_DETAILS_FAIL,
        payload: message,
      });
    }
  };

import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "./CartConstants";

// ADD TO CART
export const addToCart = (id, planName) => async (dispatch, getState) => {

  console.table(["addToCart", id, planName]);

  const { data } = await axios.get(`http://localhost:5004/api/products/${id}`);

  console.log("Agregando al carrito");
  console.log(data);

  let price = 0;
  console.log(planName);
  // Decode the planName parameter
  const decodedPlanName = decodeURIComponent(planName);
  console.log(decodedPlanName);

  switch (decodedPlanName) {
    case "Básico":
      price = data.plans.basic.price;
      break;
    case "Estándar":
      price = data.plans.standard.price;
      break;
    case "Premium":
      price = data.plans.premium.price;
      break;

    default:
      break;
  }
  console.log(price);

  const newCartItem = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: price,
    planSelected: decodedPlanName,
  };

  dispatch({
    type: CART_ADD_ITEM,
    payload: newCartItem,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE PRODUCT FROM CART
export const removefromcart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

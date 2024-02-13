import * as Types from '../Constants/AllConstants';

// get all orders
export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case Types.ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case Types.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        total: action.payload.total,
        pending: action.payload.pending,
        completed: action.payload.completed,
        cancelled: action.payload.cancelled,
      };
    case Types.ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.ORDER_LIST_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};

// get order details
export const getOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case Types.GET_ORDER_REQUEST:
      return {
        loading: true,
      };
    case Types.GET_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case Types.GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.GET_ORDER_RESET:
      return {
        order: {},
      };
    default:
      return state;
  }
};

// create order
export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case Types.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case Types.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// delete order
export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.ORDER_DELETE:
      return {
        success: true,
      };
    case Types.ORDER_DELETE_FAIL:
      return {
        error: action.payload,
      };
    case Types.ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// delete all orders
export const deleteAllOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.DELETE_ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case Types.DELETE_ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case Types.DELETE_ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.DELETE_ALL_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};

// checkout from stripe
export const stripePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.STRIPE:
      return {
        url: action.payload,
        success: true,
      };
    case Types.STRIPE_ERROR:
      return {
        error: action.payload,
      };
    case Types.STRIPE_RESET:
      return {};
    default:
      return state;
  }
};

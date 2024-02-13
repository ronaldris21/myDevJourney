import {
  NEW_PRODUCT_DETAILS_REQUEST,
  NEW_PRODUCT_DETAILS_SUCCESS,
  NEW_PRODUCT_DETAILS_UPDATE_IMAGES,
  NEW_PRODUCT_DETAILS_FAIL,
  NEW_PRODUCT_ATTRIBUTE_UPDATE,
  NEW_PRODUCT_PLANS_UPDATE,
} from "./NewProductConstants";

// NEW_PRODUCT_DETAILS_REQUEST
export const newProductDetailsReducer = (
  state = {
    editProduct: {
      plans: {
        basic: {
          name: "Básico",
          description: "",
          price: 100,
          revisionsCount: 1,
          deliveryDays: 1,
          includes: "",
          isPlanUsed: false,
        },
        standard: {
          name: "Estándar",
          description: "",
          price: 500,
          revisionsCount: 2,
          deliveryDays: 5,
          includes: "",
          isPlanUsed: false,
        },
        premium: {
          name: "Premium",
          description: "",
          price: 800,
          revisionsCount: 3,
          deliveryDays: 10,
          includes: "",
          isPlanUsed: false,
        },
      },
      multimedia: [],
    },
    error: null,
    loading: null,
  },
  action
) => {
  switch (action.type) {
    case NEW_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case NEW_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, editProduct: action.payload };
    case NEW_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case NEW_PRODUCT_DETAILS_UPDATE_IMAGES:
      return {
        ...state,
        loading: false,
        editProduct: {
          ...state.editProduct,
          multimedia: action.payload,
        },
      };
    case NEW_PRODUCT_ATTRIBUTE_UPDATE:
      const { attribute, value } = action.payload;
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          [attribute]: value,
        },
      };

    case NEW_PRODUCT_PLANS_UPDATE:
      const { planName, plan } = action.payload;
      switch (planName) {
        case "Básico":
          return {
            ...state,
            editProduct: {
              ...state.editProduct,
              plans: {
                ...state.editProduct.plans,
                basic: plan,
              },
            },
          };
        case "Estándar":
          return {
            ...state,
            editProduct: {
              ...state.editProduct,
              plans: {
                ...state.editProduct.plans,
                standard: plan
              },
            },
          };
        case "Premium":
          return {
            ...state,
            editProduct: {
              ...state.editProduct,
              plans: {
                ...state.editProduct.plans,
                premium: plan,
              },
            },
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

// // PRODUCT LIST
// export const productListReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true, products: [] };
//     case PRODUCT_LIST_SUCCESS:
//       return {
//         loading: false,
//         pages: action.payload.pages,
//         page: action.payload.page,
//         products: action.payload.products,
//       };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// // // PRODUCT LIST
// // export const productListReducer = (state = { products: [] }, action) => {
// //   switch (action.type) {
// //     case PRODUCT_LIST_REQUEST:
// //       return { loading: true, products: [] };
// //     case PRODUCT_LIST_SUCCESS:
// //       return {
// //         loading: false,
// //         pages: action.payload.pages,
// //         page: action.payload.page,
// //         products: action.payload.products,
// //       };
// //     case PRODUCT_LIST_FAIL:
// //       return { loading: false, error: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// // // SINGLE PRODUCT
// // export const productDetailsReducer = (
// //   state = { product: { reviews: [] } },
// //   action
// // ) => {
// //   switch (action.type) {
// //     case PRODUCT_DETAILS_REQUEST:
// //       return { ...state, loading: true };
// //     case PRODUCT_DETAILS_SUCCESS:
// //       return { loading: false, product: action.payload };
// //     case PRODUCT_DETAILS_FAIL:
// //       return { loading: false, error: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// // // PRODUCT REVIEW CREATE
// // export const productCreateReviewReducer = (state = {}, action) => {
// //   switch (action.type) {
// //     case PRODUCT_CREATE_REVIEW_REQUEST:
// //       return { loading: true };
// //     case PRODUCT_CREATE_REVIEW_SUCCESS:
// //       return { loading: false, success: true };
// //     case PRODUCT_CREATE_REVIEW_FAIL:
// //       return { loading: false, error: action.payload };
// //     case PRODUCT_CREATE_REVIEW_RESET:
// //       return {};
// //     default:
// //       return state;
// //   }
// // };

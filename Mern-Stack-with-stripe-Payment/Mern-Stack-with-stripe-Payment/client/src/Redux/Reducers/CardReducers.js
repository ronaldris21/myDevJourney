import * as Types from '../Constants/AllConstants';

// get all cards
export const getAllCardsReducer = (
  state = { products: [], offers: [] },
  action
) => {
  switch (action.type) {
    case Types.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case Types.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        offers: action.payload.offers,
      };
    case Types.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case Types.PRODUCT_LIST_RESET:
      return { products: [], offers: [] };
    default:
      return state;
  }
};

// get single card
export const getSingleCardReducer = (
  state = {
    card: {},
  },
  action
) => {
  switch (action.type) {
    case Types.GET_PRODUCT_REQUEST:
      return { loading: true, card: {} };
    case Types.GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        card: action.payload.product,
        related: action.payload.relatedProducts,
      };
    case Types.GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case Types.GET_PRODUCT_RESET:
      return { card: {} };
    default:
      return state;
  }
};

// get all tags
export const getAllTagsReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case Types.TAGS_PRODUCT:
      return {
        tags: action.payload,
      };
    case Types.TAGS_PRODUCT_FAIL:
      return { error: action.payload };
    case Types.TAGS_PRODUCT_RESET:
      return { tags: [] };
    default:
      return state;
  }
};

// wishlist
export const wishlistReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case Types.ADD_WISHLIST:
      return {
        wishlist: [...state.wishlist, action.payload],
      };
    case Types.DELETE_WISHLIST:
      return {
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      };

    case Types.DELETE_ALL_WISHLIST:
      return {
        wishlist: [],
      };

    default:
      return state;
  }
};

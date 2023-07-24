import {
  WISHLIST_ADD_ITEM,
  WISHLIST_ADD_ITEM_FAIL,
  WISHLIST_EMPTY,
  WISHLIST_REMOVE_ITEM,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const item = action.payload;
      const existItem = state.wishlistItems.find(
        (x) => x.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          error: "",
          wishlistItems: state.wishlistItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          error: "",
          wishlistItems: [...state.wishlistItems, item],
        };
      }
    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        error: "",
        wishlistItems: state.wishlistItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    case WISHLIST_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
    case WISHLIST_EMPTY:
      return { ...state, error: "", wishlistItems: [] };
    default:
      return state;
  }
};

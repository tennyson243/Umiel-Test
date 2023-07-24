import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
  CART_SAVE_FACTURATION,
  CART_SAVE_LIVRAISON,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/produits/${productId}`);
  const {
    cart: { cartItems },
  } = getState();
  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.nom} in this order`,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        nom: data.nom,
        image: data.image,
        prix: data.prix,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savefACTURATION = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_FACTURATION, payload: data });
  localStorage.setItem("facturation", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
export const saveLivraison = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_LIVRAISON, payload: data });
};

import Axios from "axios";
import {
  POPULAIRE_CATEGORY_LIST_FAIL,
  POPULAIRE_CATEGORY_LIST_REQUEST,
  POPULAIRE_CATEGORY_LIST_SUCCESS,
  POPULAIRE_CREATE_FAIL,
  POPULAIRE_CREATE_REQUEST,
  POPULAIRE_CREATE_SUCCESS,
  POPULAIRE_DELETE_FAIL,
  POPULAIRE_DELETE_REQUEST,
  POPULAIRE_DELETE_SUCCESS,
  POPULAIRE_DETAILS_FAIL,
  POPULAIRE_DETAILS_REQUEST,
  POPULAIRE_DETAILS_SUCCESS,
  POPULAIRE_LIST_FAIL,
  POPULAIRE_LIST_REQUEST,
  POPULAIRE_LIST_SEARCH_FAIL,
  POPULAIRE_LIST_SEARCH_REQUEST,
  POPULAIRE_LIST_SEARCH_SUCCESS,
  POPULAIRE_LIST_SUCCESS,
  POPULAIRE_MODIFICATION_FAIL,
  POPULAIRE_MODIFICATION_REQUEST,
  POPULAIRE_MODIFICATION_SUCCESS,
  POPULAIRE_REVIEW_CREATE_FAIL,
  POPULAIRE_REVIEW_CREATE_REQUEST,
  POPULAIRE_REVIEW_CREATE_SUCCESS,
  POPULAIRE_UPDATE_FAIL,
  POPULAIRE_UPDATE_REQUEST,
  POPULAIRE_UPDATE_SUCCESS,
} from "../../constants/Blog/populaireConstants";

export const populaireSearch =
  ({ pageNumber = "", title = "", catgeory = "" }) =>
  async (dispatch) => {
    dispatch({
      type: POPULAIRE_LIST_SEARCH_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/populaires/search?pageNumber=${pageNumber}&title=${title}&catgeory=${catgeory}`
      );
      dispatch({ type: POPULAIRE_LIST_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POPULAIRE_LIST_SEARCH_FAIL, payload: error.message });
    }
  };

export const listPopulaires = () => async (dispatch) => {
  dispatch({
    type: POPULAIRE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/populaires`);
    dispatch({ type: POPULAIRE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POPULAIRE_LIST_FAIL, payload: error.message });
  }
};

export const listPopulaireCategories = () => async (dispatch) => {
  dispatch({
    type: POPULAIRE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/populaires/categories`);
    dispatch({ type: POPULAIRE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POPULAIRE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsPopulaire = (populaireTitle) => async (dispatch) => {
  dispatch({ type: POPULAIRE_DETAILS_REQUEST, payload: populaireTitle });
  try {
    const { data } = await Axios.get(`/api/populaires/${populaireTitle}`);
    dispatch({ type: POPULAIRE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POPULAIRE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const modificationPopulaire =
  (populaireId) => async (dispatch, getState) => {
    dispatch({ type: POPULAIRE_MODIFICATION_REQUEST, payload: populaireId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/populaires/modif/${populaireId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: POPULAIRE_MODIFICATION_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POPULAIRE_MODIFICATION_FAIL, payload: message });
    }
  };
export const createPopulaire = () => async (dispatch, getState) => {
  dispatch({ type: POPULAIRE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/populaires",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: POPULAIRE_CREATE_SUCCESS,
      payload: data.populaire,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POPULAIRE_CREATE_FAIL, payload: message });
  }
};
export const updatePopulaire = (populaire) => async (dispatch, getState) => {
  dispatch({ type: POPULAIRE_UPDATE_REQUEST, payload: populaire });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/populaires/${populaire._id}`,
      populaire,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: POPULAIRE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POPULAIRE_UPDATE_FAIL, error: message });
  }
};
export const deletePopulaire = (populaireId) => async (dispatch, getState) => {
  dispatch({ type: POPULAIRE_DELETE_REQUEST, payload: populaireId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/populaires/${populaireId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: POPULAIRE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POPULAIRE_DELETE_FAIL, payload: message });
  }
};
export const createReview =
  (populaireId, review) => async (dispatch, getState) => {
    dispatch({ type: POPULAIRE_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/populaires/${populaireId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: POPULAIRE_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POPULAIRE_REVIEW_CREATE_FAIL, payload: message });
    }
  };

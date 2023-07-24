import Axios from "axios";
import {
  LIFESTYLE_CATEGORY_LIST_FAIL,
  LIFESTYLE_CATEGORY_LIST_REQUEST,
  LIFESTYLE_CATEGORY_LIST_SUCCESS,
  LIFESTYLE_CREATE_FAIL,
  LIFESTYLE_CREATE_REQUEST,
  LIFESTYLE_CREATE_SUCCESS,
  LIFESTYLE_DELETE_FAIL,
  LIFESTYLE_DELETE_REQUEST,
  LIFESTYLE_DELETE_SUCCESS,
  LIFESTYLE_DETAILS_FAIL,
  LIFESTYLE_DETAILS_REQUEST,
  LIFESTYLE_DETAILS_SUCCESS,
  LIFESTYLE_LIST_FAIL,
  LIFESTYLE_LIST_REQUEST,
  LIFESTYLE_LIST_SUCCESS,
  LIFESTYLE_MODIFICATION_FAIL,
  LIFESTYLE_MODIFICATION_REQUEST,
  LIFESTYLE_MODIFICATION_SUCCESS,
  LIFESTYLE_REVIEW_CREATE_FAIL,
  LIFESTYLE_REVIEW_CREATE_REQUEST,
  LIFESTYLE_REVIEW_CREATE_SUCCESS,
  LIFESTYLE_UPDATE_FAIL,
  LIFESTYLE_UPDATE_REQUEST,
  LIFESTYLE_UPDATE_SUCCESS,
} from "../../constants/Blog/lifeStyleConstants";

export const listLifestyles = () => async (dispatch) => {
  dispatch({
    type: LIFESTYLE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/lifestyles`);
    dispatch({ type: LIFESTYLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIFESTYLE_LIST_FAIL, payload: error.message });
  }
};

export const listLifestyleCategories = () => async (dispatch) => {
  dispatch({
    type: LIFESTYLE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/lifestyles/categories`);
    dispatch({ type: LIFESTYLE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIFESTYLE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsLifestyle = (lifestyleTitle) => async (dispatch) => {
  dispatch({ type: LIFESTYLE_DETAILS_REQUEST, payload: lifestyleTitle });
  try {
    const { data } = await Axios.get(`/api/lifestyles/${lifestyleTitle}`);
    dispatch({ type: LIFESTYLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIFESTYLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const modificationLifestyle =
  (lifestyleId) => async (dispatch, getState) => {
    dispatch({ type: LIFESTYLE_MODIFICATION_REQUEST, payload: lifestyleId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/lifestyles/modif/${lifestyleId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: LIFESTYLE_MODIFICATION_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LIFESTYLE_MODIFICATION_FAIL, payload: message });
    }
  };
export const createLifestyle = () => async (dispatch, getState) => {
  dispatch({ type: LIFESTYLE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/lifestyles",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: LIFESTYLE_CREATE_SUCCESS,
      payload: data.lifestyle,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: LIFESTYLE_CREATE_FAIL, payload: message });
  }
};
export const updateLifestyle = (lifestyle) => async (dispatch, getState) => {
  dispatch({ type: LIFESTYLE_UPDATE_REQUEST, payload: lifestyle });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/lifestyles/${lifestyle._id}`,
      lifestyle,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: LIFESTYLE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: LIFESTYLE_UPDATE_FAIL, error: message });
  }
};
export const deleteLifestyle = (lifestyleId) => async (dispatch, getState) => {
  dispatch({ type: LIFESTYLE_DELETE_REQUEST, payload: lifestyleId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/lifestyles/${lifestyleId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: LIFESTYLE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: LIFESTYLE_DELETE_FAIL, payload: message });
  }
};
export const createReviewLifeStyle =
  (lifestyleId, review) => async (dispatch, getState) => {
    dispatch({ type: LIFESTYLE_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/lifestyle/${lifestyleId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: LIFESTYLE_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LIFESTYLE_REVIEW_CREATE_FAIL, payload: message });
    }
  };

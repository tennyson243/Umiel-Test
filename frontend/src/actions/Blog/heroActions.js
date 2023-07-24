import Axios from "axios";
import {
  HERO_CATEGORY_LIST_FAIL,
  HERO_CATEGORY_LIST_REQUEST,
  HERO_CATEGORY_LIST_SUCCESS,
  HERO_CREATE_FAIL,
  HERO_CREATE_REQUEST,
  HERO_CREATE_SUCCESS,
  HERO_DELETE_FAIL,
  HERO_DELETE_REQUEST,
  HERO_DELETE_SUCCESS,
  HERO_DETAILS_FAIL,
  HERO_DETAILS_REQUEST,
  HERO_DETAILS_SUCCESS,
  HERO_LIST_FAIL,
  HERO_LIST_POPULAIRE_FAIL,
  HERO_LIST_POPULAIRE_REQUEST,
  HERO_LIST_POPULAIRE_SUCCESS,
  HERO_LIST_REQUEST,
  HERO_LIST_SEARCH_FAIL,
  HERO_LIST_SEARCH_REQUEST,
  HERO_LIST_SEARCH_SUCCESS,
  HERO_LIST_SUCCESS,
  HERO_MODIFICATION_FAIL,
  HERO_MODIFICATION_REQUEST,
  HERO_MODIFICATION_SUCCESS,
  HERO_REVIEW_CREATE_FAIL,
  HERO_REVIEW_CREATE_REQUEST,
  HERO_REVIEW_CREATE_SUCCESS,
  HERO_UPDATE_FAIL,
  HERO_UPDATE_REQUEST,
  HERO_UPDATE_SUCCESS,
} from "../../constants/Blog/heroConstants";

export const listHeros = () => async (dispatch) => {
  dispatch({
    type: HERO_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/hero`);
    dispatch({ type: HERO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HERO_LIST_FAIL, payload: error.message });
  }
};

export const listPopulaireHeros = () => async (dispatch) => {
  dispatch({
    type: HERO_LIST_POPULAIRE_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/hero/populaire`);
    dispatch({ type: HERO_LIST_POPULAIRE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HERO_LIST_POPULAIRE_FAIL, payload: error.message });
  }
};

export const heroSearch =
  ({ pageNumber = "", title = "", catgeory = "" }) =>
  async (dispatch) => {
    dispatch({
      type: HERO_LIST_SEARCH_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/hero/search?pageNumber=${pageNumber}&title=${title}&catgeory=${catgeory}`
      );
      dispatch({ type: HERO_LIST_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: HERO_LIST_SEARCH_FAIL, payload: error.message });
    }
  };

export const listHeroCategories = () => async (dispatch) => {
  dispatch({
    type: HERO_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/hero/categories`);
    dispatch({ type: HERO_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HERO_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsHero = (heroTitle) => async (dispatch) => {
  dispatch({ type: HERO_DETAILS_REQUEST, payload: heroTitle });
  try {
    const { data } = await Axios.get(`/api/hero/${heroTitle}`);
    dispatch({ type: HERO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HERO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const modificationHero = (heroId) => async (dispatch, getState) => {
  dispatch({ type: HERO_MODIFICATION_REQUEST, payload: heroId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/hero/modif/${heroId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HERO_MODIFICATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HERO_MODIFICATION_FAIL, payload: message });
  }
};
export const createHero = () => async (dispatch, getState) => {
  dispatch({ type: HERO_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/hero",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: HERO_CREATE_SUCCESS,
      payload: data.hero,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HERO_CREATE_FAIL, payload: message });
  }
};
export const updateHero = (hero) => async (dispatch, getState) => {
  dispatch({ type: HERO_UPDATE_REQUEST, payload: hero });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/hero/${hero._id}`, hero, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HERO_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HERO_UPDATE_FAIL, error: message });
  }
};
export const deleteHero = (heroId) => async (dispatch, getState) => {
  dispatch({ type: HERO_DELETE_REQUEST, payload: heroId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/hero/${heroId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: HERO_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HERO_DELETE_FAIL, payload: message });
  }
};
export const createReview = (heroId, review) => async (dispatch, getState) => {
  dispatch({ type: HERO_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/hero/${heroId}/reviews`, review, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: HERO_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: HERO_REVIEW_CREATE_FAIL, payload: message });
  }
};

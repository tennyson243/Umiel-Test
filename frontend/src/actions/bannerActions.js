import Axios from "axios";
import {
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_MODIFICATION_FAIL,
  BANNER_MODIFICATION_REQUEST,
  BANNER_MODIFICATION_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
} from "../constants/bannerConstant";

export const listBanners = () => async (dispatch) => {
  dispatch({
    type: BANNER_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/banners`);
    dispatch({ type: BANNER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BANNER_LIST_FAIL, payload: error.message });
  }
};

export const modificationBanner = (bannerId) => async (dispatch, getState) => {
  dispatch({ type: BANNER_MODIFICATION_REQUEST, payload: bannerId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/banners/${bannerId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BANNER_MODIFICATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_MODIFICATION_FAIL, payload: message });
  }
};
export const createBanner = () => async (dispatch, getState) => {
  dispatch({ type: BANNER_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/banners",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: BANNER_CREATE_SUCCESS,
      payload: data.lifestyle,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_CREATE_FAIL, payload: message });
  }
};
export const updateBanner = (banner) => async (dispatch, getState) => {
  dispatch({ type: BANNER_UPDATE_REQUEST, payload: banner });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/banners/${banner._id}`, banner, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BANNER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_UPDATE_FAIL, error: message });
  }
};
export const deleteBanner = (bannerId) => async (dispatch, getState) => {
  dispatch({ type: BANNER_DELETE_REQUEST, payload: bannerId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/banners/${bannerId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BANNER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_DELETE_FAIL, payload: message });
  }
};

import Axios from "axios";
import {
  TIKTOK_CREATE_FAIL,
  TIKTOK_CREATE_REQUEST,
  TIKTOK_CREATE_SUCCESS,
  TIKTOK_DELETE_FAIL,
  TIKTOK_DELETE_REQUEST,
  TIKTOK_DELETE_SUCCESS,
  TIKTOK_DETAILS_FAIL,
  TIKTOK_DETAILS_REQUEST,
  TIKTOK_DETAILS_SUCCESS,
  TIKTOK_LIST_FAIL,
  TIKTOK_LIST_REQUEST,
  TIKTOK_LIST_SUCCESS,
  TIKTOK_MODIFICATION_FAIL,
  TIKTOK_MODIFICATION_REQUEST,
  TIKTOK_MODIFICATION_SUCCESS,
  TIKTOK_UPDATE_FAIL,
  TIKTOK_UPDATE_REQUEST,
  TIKTOK_UPDATE_SUCCESS,
} from "../../constants/Blog/tiktokConstants";

export const listTiktoks = () => async (dispatch) => {
  dispatch({
    type: TIKTOK_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/tiktoks`);
    dispatch({ type: TIKTOK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TIKTOK_LIST_FAIL, payload: error.message });
  }
};

export const detailsTiktok = (tiktokTitle) => async (dispatch) => {
  dispatch({ type: TIKTOK_DETAILS_REQUEST, payload: tiktokTitle });
  try {
    const { data } = await Axios.get(`/api/tiktoks/${tiktokTitle}`);
    dispatch({ type: TIKTOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TIKTOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const modificationTiktok = (tiktokId) => async (dispatch, getState) => {
  dispatch({ type: TIKTOK_MODIFICATION_REQUEST, payload: tiktokId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/tiktoks/modif/${tiktokId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TIKTOK_MODIFICATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TIKTOK_MODIFICATION_FAIL, payload: message });
  }
};
export const createTiktok = () => async (dispatch, getState) => {
  dispatch({ type: TIKTOK_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/tiktoks",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: TIKTOK_CREATE_SUCCESS,
      payload: data.tiktok,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TIKTOK_CREATE_FAIL, payload: message });
  }
};
export const updatedTikTok = (tiktok) => async (dispatch, getState) => {
  dispatch({ type: TIKTOK_UPDATE_REQUEST, payload: tiktok });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/tiktoks/${tiktok._id}`, tiktok, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TIKTOK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TIKTOK_UPDATE_FAIL, error: message });
  }
};
export const deleteTiktok = (tiktokId) => async (dispatch, getState) => {
  dispatch({ type: TIKTOK_DELETE_REQUEST, payload: tiktokId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/tiktoks/${tiktokId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TIKTOK_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TIKTOK_DELETE_FAIL, payload: message });
  }
};

import Axios from "axios";
import {
  APITHERAPIE_CATEGORY_LIST_FAIL,
  APITHERAPIE_CATEGORY_LIST_REQUEST,
  APITHERAPIE_CATEGORY_LIST_SUCCESS,
  APITHERAPIE_CREATE_FAIL,
  APITHERAPIE_CREATE_REQUEST,
  APITHERAPIE_CREATE_SUCCESS,
  APITHERAPIE_DELETE_FAIL,
  APITHERAPIE_DELETE_REQUEST,
  APITHERAPIE_DELETE_SUCCESS,
  APITHERAPIE_DETAILS_FAIL,
  APITHERAPIE_DETAILS_REQUEST,
  APITHERAPIE_DETAILS_SUCCESS,
  APITHERAPIE_LIST_FAIL,
  APITHERAPIE_LIST_REQUEST,
  APITHERAPIE_LIST_SEARCH_FAIL,
  APITHERAPIE_LIST_SEARCH_REQUEST,
  APITHERAPIE_LIST_SEARCH_SUCCESS,
  APITHERAPIE_LIST_SUCCESS,
  APITHERAPIE_MODIFICATION_FAIL,
  APITHERAPIE_MODIFICATION_REQUEST,
  APITHERAPIE_MODIFICATION_SUCCESS,
  APITHERAPIE_REVIEW_CREATE_FAIL,
  APITHERAPIE_REVIEW_CREATE_REQUEST,
  APITHERAPIE_REVIEW_CREATE_SUCCESS,
  APITHERAPIE_UPDATE_FAIL,
  APITHERAPIE_UPDATE_REQUEST,
  APITHERAPIE_UPDATE_SUCCESS,
} from "../../constants/Blog/ApitherapieConstant";

export const listApitherapie = () => async (dispatch) => {
  dispatch({
    type: APITHERAPIE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/apitherapies`);
    dispatch({ type: APITHERAPIE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: APITHERAPIE_LIST_FAIL, payload: error.message });
  }
};

export const apitherapieSearch =
  ({ pageNumber = "", title = "", catgeory = "", sousCategorie = "" }) =>
  async (dispatch) => {
    dispatch({
      type: APITHERAPIE_LIST_SEARCH_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/apitherapies/search?pageNumber=${pageNumber}&title=${title}&catgeory=${catgeory}$sousCategorie=${sousCategorie}`
      );
      dispatch({ type: APITHERAPIE_LIST_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: APITHERAPIE_LIST_SEARCH_FAIL, payload: error.message });
    }
  };

export const listApitherapieCategories = () => async (dispatch) => {
  dispatch({
    type: APITHERAPIE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/apitherapies/categories`);
    dispatch({ type: APITHERAPIE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: APITHERAPIE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsApitherapie = (apitherapieTitle) => async (dispatch) => {
  dispatch({ type: APITHERAPIE_DETAILS_REQUEST, payload: apitherapieTitle });
  try {
    const { data } = await Axios.get(`/api/apitherapies/${apitherapieTitle}`);
    dispatch({ type: APITHERAPIE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APITHERAPIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const modificationApitherapie =
  (apitherapieId) => async (dispatch, getState) => {
    dispatch({
      type: APITHERAPIE_MODIFICATION_REQUEST,
      payload: apitherapieId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(
        `/api/apitherapies/modif/${apitherapieId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: APITHERAPIE_MODIFICATION_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APITHERAPIE_MODIFICATION_FAIL, payload: message });
    }
  };
export const createApitherapie = () => async (dispatch, getState) => {
  dispatch({ type: APITHERAPIE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/apitherapies",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: APITHERAPIE_CREATE_SUCCESS,
      payload: data.apitherapie,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APITHERAPIE_CREATE_FAIL, payload: message });
  }
};
export const updateApitherapie =
  (apitherapie) => async (dispatch, getState) => {
    dispatch({ type: APITHERAPIE_UPDATE_REQUEST, payload: apitherapie });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/apitherapies/${apitherapie._id}`,
        apitherapie,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: APITHERAPIE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APITHERAPIE_UPDATE_FAIL, error: message });
    }
  };
export const deleteApitherapie =
  (apitherapieId) => async (dispatch, getState) => {
    dispatch({ type: APITHERAPIE_DELETE_REQUEST, payload: apitherapieId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/apitherapies/${apitherapieId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: APITHERAPIE_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APITHERAPIE_DELETE_FAIL, payload: message });
    }
  };
export const createReviewApitherapie =
  (apitherapieId, review) => async (dispatch, getState) => {
    dispatch({ type: APITHERAPIE_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/apitherapie/${apitherapieId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: APITHERAPIE_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: APITHERAPIE_REVIEW_CREATE_FAIL, payload: message });
    }
  };

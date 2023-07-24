import Axios from "axios";
import {
  AFFILIATESTAT_CREATE_FAIL,
  AFFILIATESTAT_CREATE_REQUEST,
  AFFILIATESTAT_CREATE_SUCCESS,
  DASHBOARD_LIST_FAIL,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
  GENERAL_LIST_FAIL,
  GENERAL_LIST_REQUEST,
  GENERAL_LIST_SUCCESS,
  OVERALL_CREATE_FAIL,
  OVERALL_CREATE_REQUEST,
  OVERALL_CREATE_SUCCESS,
  PRODUCTSTAT_CREATE_FAIL,
  PRODUCTSTAT_CREATE_REQUEST,
  PRODUCTSTAT_CREATE_SUCCESS,
} from "../constants/generalConstant";

export const listGeneral = () => async (dispatch) => {
  dispatch({ type: GENERAL_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/generals");
    dispatch({ type: GENERAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GENERAL_LIST_FAIL, payload: message });
  }
};

export const listDashboard = () => async (dispatch) => {
  dispatch({ type: DASHBOARD_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/generals/dashboard");
    dispatch({ type: DASHBOARD_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DASHBOARD_LIST_FAIL, payload: message });
  }
};

export const affiliateSales =
  (newAffiliateStat) => async (dispatch, getState) => {
    dispatch({
      type: AFFILIATESTAT_CREATE_REQUEST,
      payload: newAffiliateStat,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.post(
        "/api/generals/affiliate-sales",
        newAffiliateStat,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: AFFILIATESTAT_CREATE_SUCCESS,
        payload: data.newAffiliateStat,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: AFFILIATESTAT_CREATE_FAIL, payload: message });
    }
  };

export const productStat = () => async (dispatch, getState) => {
  dispatch({
    type: PRODUCTSTAT_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.get("/api/generals/update-product-stats", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PRODUCTSTAT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCTSTAT_CREATE_FAIL, payload: message });
  }
};

export const overallStatistique = () => async (dispatch, getState) => {
  dispatch({
    type: OVERALL_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.get("/api/generals/update-overall-stats", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: OVERALL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: OVERALL_CREATE_FAIL, payload: message });
  }
};

import Axios from "axios";
import {
  GENERAL_DASHBOARD_FAIL,
  GENERAL_DASHBOARD_REQUEST,
  GENERAL_DASHBOARD_SUCCESS,
  OVERVIEUW_LIST_FAIL,
  OVERVIEUW_LIST_REQUEST,
  OVERVIEUW_LIST_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
} from "../constants/transactionConstant";

export const listTransaction =
  ({ pageNumber = "", page = "", sort = null, search = "" }) =>
  async (dispatch) => {
    dispatch({
      type: TRANSACTION_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/transactions/client?page=${pageNumber}&pageSize=${page}&sort=${sort}&search=${search}`
      );
      dispatch({ type: TRANSACTION_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TRANSACTION_LIST_FAIL, payload: error.message });
    }
  };

export const detailsTransaction = (transactionId) => async (dispatch) => {
  dispatch({ type: TRANSACTION_DETAILS_REQUEST, payload: transactionId });
  try {
    const { data } = await Axios.get(`/api/transactions/${transactionId}`);
    dispatch({ type: TRANSACTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createTransaction =
  (transaction) => async (dispatch, getState) => {
    dispatch({ type: TRANSACTION_CREATE_REQUEST, payload: transaction });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post("/api/transactions", transaction, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: TRANSACTION_CREATE_SUCCESS,
        payload: data.transaction,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TRANSACTION_CREATE_FAIL, payload: message });
    }
  };
export const updateTransaction =
  (transaction) => async (dispatch, getState) => {
    dispatch({ type: TRANSACTION_UPDATE_REQUEST, payload: transaction });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/transactions/${transaction._id}`,
        transaction,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: TRANSACTION_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TRANSACTION_UPDATE_FAIL, error: message });
    }
  };
export const deleteTransaction =
  (transactionId) => async (dispatch, getState) => {
    dispatch({ type: TRANSACTION_DELETE_REQUEST, payload: transactionId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: TRANSACTION_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TRANSACTION_DELETE_FAIL, payload: message });
    }
  };

export const generalDashboard = () => async (dispatch) => {
  dispatch({
    type: GENERAL_DASHBOARD_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/transactions/general/dashboard`);
    dispatch({ type: GENERAL_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GENERAL_DASHBOARD_FAIL, payload: error.message });
  }
};

export const overviewList = () => async (dispatch) => {
  dispatch({
    type: OVERVIEUW_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/transactions/overallStats`);
    dispatch({ type: OVERVIEUW_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: OVERVIEUW_LIST_FAIL, payload: error.message });
  }
};

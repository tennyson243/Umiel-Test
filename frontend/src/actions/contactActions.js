import Axios from "axios";
import {
  CONTACT_CREATE_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_PROFILE_FAIL,
  CONTACT_PROFILE_REQUEST,
  CONTACT_PROFILE_SUCCESS,
} from "../constants/contactConstants";

export const createContact = (contact) => async (dispatch, getState) => {
  dispatch({ type: CONTACT_CREATE_REQUEST, payload: contact });
  try {
    const { data } = await Axios.post("/api/contacts", contact);
    dispatch({ type: CONTACT_CREATE_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: CONTACT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsContact = (contactId) => async (dispatch, getState) => {
  dispatch({ type: CONTACT_DETAILS_REQUEST, payload: contactId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CONTACT_DETAILS_FAIL, payload: message });
  }
};

export const updateContact = (contact) => async (dispatch, getState) => {
  dispatch({ type: CONTACT_PROFILE_REQUEST, payload: contact });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/contacts/${contact._id}`, contact, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CONTACT_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CONTACT_PROFILE_FAIL, payload: message });
  }
};
export const listContacts = () => async (dispatch, getState) => {
  dispatch({ type: CONTACT_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/contacts/list`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CONTACT_LIST_FAIL, payload: message });
  }
};
export const deleteContact = (contactId) => async (dispatch, getState) => {
  dispatch({ type: CONTACT_DELETE_REQUEST, payload: contactId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CONTACT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CONTACT_DELETE_FAIL, payload: message });
  }
};

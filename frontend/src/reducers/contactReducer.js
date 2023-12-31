import {
  CONTACT_CREATE_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_RESET,
  CONTACT_CREATE_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_RESET,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_PROFILE_FAIL,
  CONTACT_PROFILE_REQUEST,
  CONTACT_PROFILE_RESET,
  CONTACT_PROFILE_SUCCESS,
} from "../constants/contactConstants";

export const contactCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_CREATE_REQUEST:
      return { loading: true };
    case CONTACT_CREATE_SUCCESS:
      return { loading: false, success: true, contact: action.payload };
    case CONTACT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const contactDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CONTACT_DETAILS_REQUEST:
      return { loading: true };
    case CONTACT_DETAILS_SUCCESS:
      return { loading: false, contact: action.payload };
    case CONTACT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactListReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { loading: true };
    case CONTACT_LIST_SUCCESS:
      return { loading: false, contacts: action.payload };
    case CONTACT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const contactUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_PROFILE_REQUEST:
      return { loading: true };
    case CONTACT_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

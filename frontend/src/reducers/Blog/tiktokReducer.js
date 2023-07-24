import {
  TIKTOK_CREATE_FAIL,
  TIKTOK_CREATE_REQUEST,
  TIKTOK_CREATE_RESET,
  TIKTOK_CREATE_SUCCESS,
  TIKTOK_DELETE_FAIL,
  TIKTOK_DELETE_REQUEST,
  TIKTOK_DELETE_RESET,
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
  TIKTOK_UPDATE_RESET,
  TIKTOK_UPDATE_SUCCESS,
} from "../../constants/Blog/tiktokConstants";

export const tiktokListReducer = (
  state = { loading: true, heros: [] },
  action
) => {
  switch (action.type) {
    case TIKTOK_LIST_REQUEST:
      return { loading: true };
    case TIKTOK_LIST_SUCCESS:
      return {
        loading: false,
        tiktoks: action.payload,
      };
    case TIKTOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tiktokDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TIKTOK_DETAILS_REQUEST:
      return { loading: true };
    case TIKTOK_DETAILS_SUCCESS:
      return { loading: false, tiktok: action.payload };
    case TIKTOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tiktokModificationReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case TIKTOK_MODIFICATION_REQUEST:
      return { loading: true };
    case TIKTOK_MODIFICATION_SUCCESS:
      return { loading: false, tiktok: action.payload };
    case TIKTOK_MODIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const tiktokCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TIKTOK_CREATE_REQUEST:
      return { loading: true };
    case TIKTOK_CREATE_SUCCESS:
      return { loading: false, success: true, tiktok: action.payload };
    case TIKTOK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TIKTOK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const tiktokUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TIKTOK_UPDATE_REQUEST:
      return { loading: true };
    case TIKTOK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TIKTOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TIKTOK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const tiktokDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TIKTOK_DELETE_REQUEST:
      return { loading: true };
    case TIKTOK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TIKTOK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TIKTOK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

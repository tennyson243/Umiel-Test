import {
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_RESET,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_RESET,
  BANNER_DELETE_SUCCESS,
  BANNER_DETAILS_FAIL,
  BANNER_DETAILS_REQUEST,
  BANNER_DETAILS_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_MODIFICATION_FAIL,
  BANNER_MODIFICATION_REQUEST,
  BANNER_MODIFICATION_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_RESET,
  BANNER_UPDATE_SUCCESS,
} from "../constants/bannerConstant";

export const bannerListReducer = (
  state = { loading: true, banners: [] },
  action
) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return { loading: true };
    case BANNER_LIST_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case BANNER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bannerDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case BANNER_DETAILS_REQUEST:
      return { loading: true };
    case BANNER_DETAILS_SUCCESS:
      return { loading: false, banner: action.payload };
    case BANNER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bannerModificationReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case BANNER_MODIFICATION_REQUEST:
      return { loading: true };
    case BANNER_MODIFICATION_SUCCESS:
      return { loading: false, banner: action.payload };
    case BANNER_MODIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const bannerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_CREATE_REQUEST:
      return { loading: true };
    case BANNER_CREATE_SUCCESS:
      return { loading: false, success: true, banner: action.payload };
    case BANNER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const bannerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST:
      return { loading: true };
    case BANNER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BANNER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const bannerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return { loading: true };
    case BANNER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BANNER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

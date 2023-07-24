import {
  LIFESTYLE_CATEGORY_LIST_FAIL,
  LIFESTYLE_CATEGORY_LIST_REQUEST,
  LIFESTYLE_CATEGORY_LIST_SUCCESS,
  LIFESTYLE_CREATE_FAIL,
  LIFESTYLE_CREATE_REQUEST,
  LIFESTYLE_CREATE_RESET,
  LIFESTYLE_CREATE_SUCCESS,
  LIFESTYLE_DELETE_FAIL,
  LIFESTYLE_DELETE_REQUEST,
  LIFESTYLE_DELETE_RESET,
  LIFESTYLE_DELETE_SUCCESS,
  LIFESTYLE_DETAILS_FAIL,
  LIFESTYLE_DETAILS_REQUEST,
  LIFESTYLE_DETAILS_SUCCESS,
  LIFESTYLE_LIST_FAIL,
  LIFESTYLE_LIST_REQUEST,
  LIFESTYLE_LIST_SUCCESS,
  LIFESTYLE_MODIFICATION_FAIL,
  LIFESTYLE_MODIFICATION_REQUEST,
  LIFESTYLE_MODIFICATION_SUCCESS,
  LIFESTYLE_REVIEW_CREATE_FAIL,
  LIFESTYLE_REVIEW_CREATE_REQUEST,
  LIFESTYLE_REVIEW_CREATE_RESET,
  LIFESTYLE_REVIEW_CREATE_SUCCESS,
  LIFESTYLE_UPDATE_FAIL,
  LIFESTYLE_UPDATE_REQUEST,
  LIFESTYLE_UPDATE_RESET,
  LIFESTYLE_UPDATE_SUCCESS,
} from "../../constants/Blog/lifeStyleConstants";

export const lifestylesListReducer = (
  state = { loading: true, lifestyles: [] },
  action
) => {
  switch (action.type) {
    case LIFESTYLE_LIST_REQUEST:
      return { loading: true };
    case LIFESTYLE_LIST_SUCCESS:
      return {
        loading: false,
        lifestyles: action.payload,
      };
    case LIFESTYLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lifestyleCategoryListReducer = (
  state = { loading: true, lifestyles: [] },
  action
) => {
  switch (action.type) {
    case LIFESTYLE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case LIFESTYLE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case LIFESTYLE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lifestyleDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LIFESTYLE_DETAILS_REQUEST:
      return { loading: true };
    case LIFESTYLE_DETAILS_SUCCESS:
      return { loading: false, lifestyle: action.payload };
    case LIFESTYLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lifestyleModificationReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case LIFESTYLE_MODIFICATION_REQUEST:
      return { loading: true };
    case LIFESTYLE_MODIFICATION_SUCCESS:
      return { loading: false, lifestyle: action.payload };
    case LIFESTYLE_MODIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const lifestyleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIFESTYLE_CREATE_REQUEST:
      return { loading: true };
    case LIFESTYLE_CREATE_SUCCESS:
      return { loading: false, success: true, lifestyle: action.payload };
    case LIFESTYLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LIFESTYLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const lifestyleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIFESTYLE_UPDATE_REQUEST:
      return { loading: true };
    case LIFESTYLE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case LIFESTYLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LIFESTYLE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const lifestyleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LIFESTYLE_DELETE_REQUEST:
      return { loading: true };
    case LIFESTYLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LIFESTYLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case LIFESTYLE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const lifestyleReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LIFESTYLE_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case LIFESTYLE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case LIFESTYLE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LIFESTYLE_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

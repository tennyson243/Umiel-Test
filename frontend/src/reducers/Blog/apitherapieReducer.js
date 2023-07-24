import {
  APITHERAPIE_CATEGORY_LIST_FAIL,
  APITHERAPIE_CATEGORY_LIST_REQUEST,
  APITHERAPIE_CATEGORY_LIST_SUCCESS,
  APITHERAPIE_CREATE_FAIL,
  APITHERAPIE_CREATE_REQUEST,
  APITHERAPIE_CREATE_RESET,
  APITHERAPIE_CREATE_SUCCESS,
  APITHERAPIE_DELETE_FAIL,
  APITHERAPIE_DELETE_REQUEST,
  APITHERAPIE_DELETE_RESET,
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
  APITHERAPIE_REVIEW_CREATE_RESET,
  APITHERAPIE_REVIEW_CREATE_SUCCESS,
  APITHERAPIE_UPDATE_FAIL,
  APITHERAPIE_UPDATE_REQUEST,
  APITHERAPIE_UPDATE_RESET,
  APITHERAPIE_UPDATE_SUCCESS,
} from "../../constants/Blog/ApitherapieConstant";

export const apitherapieListReducer = (
  state = { loading: true, apitherapies: [] },
  action
) => {
  switch (action.type) {
    case APITHERAPIE_LIST_REQUEST:
      return { loading: true };
    case APITHERAPIE_LIST_SUCCESS:
      return {
        loading: false,
        apitherapies: action.payload,
      };
    case APITHERAPIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const apitherapieListSearchReducer = (
  state = { loading: true, apitherapies: [] },
  action
) => {
  switch (action.type) {
    case APITHERAPIE_LIST_SEARCH_REQUEST:
      return { loading: true };
    case APITHERAPIE_LIST_SEARCH_SUCCESS:
      return {
        loading: false,
        apitherapies: action.payload.apitherapies,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case APITHERAPIE_LIST_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const apitherapieCategoryListReducer = (
  state = { loading: true, apitherapies: [] },
  action
) => {
  switch (action.type) {
    case APITHERAPIE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case APITHERAPIE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case APITHERAPIE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const apitherapieDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case APITHERAPIE_DETAILS_REQUEST:
      return { loading: true };
    case APITHERAPIE_DETAILS_SUCCESS:
      return { loading: false, apitherapie: action.payload };
    case APITHERAPIE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const apitherapieModificationReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case APITHERAPIE_MODIFICATION_REQUEST:
      return { loading: true };
    case APITHERAPIE_MODIFICATION_SUCCESS:
      return { loading: false, apitherapie: action.payload };
    case APITHERAPIE_MODIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const apitherapieCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APITHERAPIE_CREATE_REQUEST:
      return { loading: true };
    case APITHERAPIE_CREATE_SUCCESS:
      return { loading: false, success: true, apitherapie: action.payload };
    case APITHERAPIE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APITHERAPIE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const apitherapieUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case APITHERAPIE_UPDATE_REQUEST:
      return { loading: true };
    case APITHERAPIE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case APITHERAPIE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APITHERAPIE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const apitherapieDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APITHERAPIE_DELETE_REQUEST:
      return { loading: true };
    case APITHERAPIE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case APITHERAPIE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case APITHERAPIE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const apitherapieReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APITHERAPIE_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case APITHERAPIE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case APITHERAPIE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APITHERAPIE_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

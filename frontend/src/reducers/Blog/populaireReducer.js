import {
  POPULAIRE_CATEGORY_LIST_FAIL,
  POPULAIRE_CATEGORY_LIST_REQUEST,
  POPULAIRE_CATEGORY_LIST_SUCCESS,
  POPULAIRE_CREATE_FAIL,
  POPULAIRE_CREATE_REQUEST,
  POPULAIRE_CREATE_RESET,
  POPULAIRE_CREATE_SUCCESS,
  POPULAIRE_DELETE_FAIL,
  POPULAIRE_DELETE_REQUEST,
  POPULAIRE_DELETE_RESET,
  POPULAIRE_DELETE_SUCCESS,
  POPULAIRE_DETAILS_FAIL,
  POPULAIRE_DETAILS_REQUEST,
  POPULAIRE_DETAILS_SUCCESS,
  POPULAIRE_LIST_FAIL,
  POPULAIRE_LIST_REQUEST,
  POPULAIRE_LIST_SEARCH_FAIL,
  POPULAIRE_LIST_SEARCH_REQUEST,
  POPULAIRE_LIST_SEARCH_SUCCESS,
  POPULAIRE_LIST_SUCCESS,
  POPULAIRE_MODIFICATION_FAIL,
  POPULAIRE_MODIFICATION_REQUEST,
  POPULAIRE_MODIFICATION_SUCCESS,
  POPULAIRE_REVIEW_CREATE_FAIL,
  POPULAIRE_REVIEW_CREATE_REQUEST,
  POPULAIRE_REVIEW_CREATE_RESET,
  POPULAIRE_REVIEW_CREATE_SUCCESS,
  POPULAIRE_UPDATE_FAIL,
  POPULAIRE_UPDATE_REQUEST,
  POPULAIRE_UPDATE_RESET,
  POPULAIRE_UPDATE_SUCCESS,
} from "../../constants/Blog/populaireConstants";

export const populaireListSearchReducer = (
  state = { loading: true, populaires: [] },
  action
) => {
  switch (action.type) {
    case POPULAIRE_LIST_SEARCH_REQUEST:
      return { loading: true };
    case POPULAIRE_LIST_SEARCH_SUCCESS:
      return {
        loading: false,
        populaires: action.payload.populaires,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case POPULAIRE_LIST_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const populaireListReducer = (
  state = { loading: true, populaires: [] },
  action
) => {
  switch (action.type) {
    case POPULAIRE_LIST_REQUEST:
      return { loading: true };
    case POPULAIRE_LIST_SUCCESS:
      return {
        loading: false,
        populaires: action.payload,
      };
    case POPULAIRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const populaireCategoryListReducer = (
  state = { loading: true, populaires: [] },
  action
) => {
  switch (action.type) {
    case POPULAIRE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case POPULAIRE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case POPULAIRE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const populaireDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POPULAIRE_DETAILS_REQUEST:
      return { loading: true };
    case POPULAIRE_DETAILS_SUCCESS:
      return { loading: false, populaire: action.payload };
    case POPULAIRE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const populaireModificationReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case POPULAIRE_MODIFICATION_REQUEST:
      return { loading: true };
    case POPULAIRE_MODIFICATION_SUCCESS:
      return { loading: false, populaire: action.payload };
    case POPULAIRE_MODIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const populaireCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POPULAIRE_CREATE_REQUEST:
      return { loading: true };
    case POPULAIRE_CREATE_SUCCESS:
      return { loading: false, success: true, populaire: action.payload };
    case POPULAIRE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POPULAIRE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const populaireUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POPULAIRE_UPDATE_REQUEST:
      return { loading: true };
    case POPULAIRE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POPULAIRE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POPULAIRE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const populaireDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POPULAIRE_DELETE_REQUEST:
      return { loading: true };
    case POPULAIRE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POPULAIRE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case POPULAIRE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const populaireReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POPULAIRE_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case POPULAIRE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case POPULAIRE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POPULAIRE_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

import {
  HERO_CATEGORY_LIST_FAIL,
  HERO_CATEGORY_LIST_REQUEST,
  HERO_CATEGORY_LIST_SUCCESS,
  HERO_CREATE_FAIL,
  HERO_CREATE_REQUEST,
  HERO_CREATE_RESET,
  HERO_CREATE_SUCCESS,
  HERO_DELETE_FAIL,
  HERO_DELETE_REQUEST,
  HERO_DELETE_RESET,
  HERO_DELETE_SUCCESS,
  HERO_DETAILS_FAIL,
  HERO_DETAILS_REQUEST,
  HERO_DETAILS_SUCCESS,
  HERO_LIST_FAIL,
  HERO_LIST_REQUEST,
  HERO_LIST_SEARCH_FAIL,
  HERO_LIST_SEARCH_REQUEST,
  HERO_LIST_SEARCH_SUCCESS,
  HERO_LIST_SUCCESS,
  HERO_MODIFICATION_FAIL,
  HERO_MODIFICATION_REQUEST,
  HERO_MODIFICATION_SUCCESS,
  HERO_REVIEW_CREATE_FAIL,
  HERO_REVIEW_CREATE_REQUEST,
  HERO_REVIEW_CREATE_RESET,
  HERO_REVIEW_CREATE_SUCCESS,
  HERO_UPDATE_FAIL,
  HERO_UPDATE_REQUEST,
  HERO_UPDATE_RESET,
  HERO_UPDATE_SUCCESS,
} from "../../constants/Blog/heroConstants";

export const herosListReducer = (
  state = { loading: true, heros: [] },
  action
) => {
  switch (action.type) {
    case HERO_LIST_REQUEST:
      return { loading: true };
    case HERO_LIST_SUCCESS:
      return {
        loading: false,
        heros: action.payload,
      };
    case HERO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const heroListSearchReducer = (
  state = { loading: true, heros: [] },
  action
) => {
  switch (action.type) {
    case HERO_LIST_SEARCH_REQUEST:
      return { loading: true };
    case HERO_LIST_SEARCH_SUCCESS:
      return {
        loading: false,
        heros: action.payload.heros,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case HERO_LIST_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const herosPopulaireListReducer = (
  state = { loading: true, herosPopulaires: [] },
  action
) => {
  switch (action.type) {
    case HERO_LIST_REQUEST:
      return { loading: true };
    case HERO_LIST_SUCCESS:
      return {
        loading: false,
        herosPopulaires: action.payload,
      };
    case HERO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const herosCategoryListReducer = (
  state = { loading: true, heros: [] },
  action
) => {
  switch (action.type) {
    case HERO_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case HERO_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case HERO_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const heroDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case HERO_DETAILS_REQUEST:
      return { loading: true };
    case HERO_DETAILS_SUCCESS:
      return { loading: false, hero: action.payload };
    case HERO_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const heroModificationReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case HERO_MODIFICATION_REQUEST:
      return { loading: true };
    case HERO_MODIFICATION_SUCCESS:
      return { loading: false, hero: action.payload };
    case HERO_MODIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const heroCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HERO_CREATE_REQUEST:
      return { loading: true };
    case HERO_CREATE_SUCCESS:
      return { loading: false, success: true, hero: action.payload };
    case HERO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case HERO_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const heroUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HERO_UPDATE_REQUEST:
      return { loading: true };
    case HERO_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case HERO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case HERO_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const heroDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HERO_DELETE_REQUEST:
      return { loading: true };
    case HERO_DELETE_SUCCESS:
      return { loading: false, success: true };
    case HERO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case HERO_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const heroReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HERO_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case HERO_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case HERO_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case HERO_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

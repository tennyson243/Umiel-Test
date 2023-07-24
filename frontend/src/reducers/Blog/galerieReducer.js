import {
  GALERIE_CREATE_FAIL,
  GALERIE_CREATE_REQUEST,
  GALERIE_CREATE_RESET,
  GALERIE_CREATE_SUCCESS,
  GALERIE_DELETE_FAIL,
  GALERIE_DELETE_REQUEST,
  GALERIE_DELETE_RESET,
  GALERIE_DELETE_SUCCESS,
  GALERIE_DETAILS_FAIL,
  GALERIE_DETAILS_REQUEST,
  GALERIE_DETAILS_SUCCESS,
  GALERIE_LIST_FAIL,
  GALERIE_LIST_REQUEST,
  GALERIE_LIST_SUCCESS,
  GALERIE_UPDATE_FAIL,
  GALERIE_UPDATE_REQUEST,
  GALERIE_UPDATE_RESET,
  GALERIE_UPDATE_SUCCESS,
} from "../../constants/Blog/galerieConstants";

export const galeriesListReducer = (
  state = { loading: true, galeries: [] },
  action
) => {
  switch (action.type) {
    case GALERIE_LIST_REQUEST:
      return { loading: true };
    case GALERIE_LIST_SUCCESS:
      return {
        loading: false,
        galeries: action.payload,
      };
    case GALERIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galerieDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GALERIE_DETAILS_REQUEST:
      return { loading: true };
    case GALERIE_DETAILS_SUCCESS:
      return { loading: false, galerie: action.payload };
    case GALERIE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galerieCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GALERIE_CREATE_REQUEST:
      return { loading: true };
    case GALERIE_CREATE_SUCCESS:
      return { loading: false, success: true, galerie: action.payload };
    case GALERIE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GALERIE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const galerieUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GALERIE_UPDATE_REQUEST:
      return { loading: true };
    case GALERIE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case GALERIE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case GALERIE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const galerieDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GALERIE_DELETE_REQUEST:
      return { loading: true };
    case GALERIE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GALERIE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case GALERIE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

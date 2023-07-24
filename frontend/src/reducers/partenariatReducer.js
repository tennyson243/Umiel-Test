import {
  MARQUE_LIST_FAIL,
  MARQUE_LIST_REQUEST,
  MARQUE_LIST_SUCCESS,
  PARTENAIRE_LIST_FAIL,
  PARTENAIRE_LIST_REQUEST,
  PARTENAIRE_LIST_SUCCESS,
  TROPHE_LIST_FAIL,
  TROPHE_LIST_REQUEST,
  TROPHE_LIST_SUCCESS,
} from "../constants/partenaireConstants";

export const marqueVenduListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PARTENAIRE_LIST_REQUEST:
      return { loading: true };
    case PARTENAIRE_LIST_SUCCESS:
      return { loading: false, marques: action.payload };
    case PARTENAIRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const partenaireListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case MARQUE_LIST_REQUEST:
      return { loading: true };
    case MARQUE_LIST_SUCCESS:
      return { loading: false, partenaires: action.payload };
    case MARQUE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tropheListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TROPHE_LIST_REQUEST:
      return { loading: true };
    case TROPHE_LIST_SUCCESS:
      return { loading: false, trophes: action.payload };
    case TROPHE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

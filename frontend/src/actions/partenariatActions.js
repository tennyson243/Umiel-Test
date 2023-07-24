import Axios from "axios";
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

export const listMarqueVendu = () => async (dispatch) => {
  dispatch({ type: PARTENAIRE_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/partenariat/list");
    dispatch({ type: PARTENAIRE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PARTENAIRE_LIST_FAIL, payload: message });
  }
};

export const listPartenaire = () => async (dispatch) => {
  dispatch({ type: MARQUE_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/partenariat/marque");
    dispatch({ type: MARQUE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MARQUE_LIST_FAIL, payload: message });
  }
};

export const listTrophe = () => async (dispatch) => {
  dispatch({ type: TROPHE_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/partenariat/trophe");
    dispatch({ type: TROPHE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TROPHE_LIST_FAIL, payload: message });
  }
};

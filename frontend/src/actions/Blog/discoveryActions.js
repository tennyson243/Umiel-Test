import Axios from "axios";
import {
  DISCOVERY_LIST_FAIL,
  DISCOVERY_LIST_REQUEST,
  DISCOVERY_LIST_SUCCESS,
} from "../../constants/Blog/discoveryConstants";

export const listDiscovery = () => async (dispatch, getState) => {
  dispatch({ type: DISCOVERY_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/discovery");
    dispatch({ type: DISCOVERY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DISCOVERY_LIST_FAIL, payload: message });
  }
};

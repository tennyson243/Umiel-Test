import {
  DISCOVERY_LIST_FAIL,
  DISCOVERY_LIST_REQUEST,
  DISCOVERY_LIST_SUCCESS,
} from "../../constants/Blog/discoveryConstants";

export const discoveryListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DISCOVERY_LIST_REQUEST:
      return { loading: true };
    case DISCOVERY_LIST_SUCCESS:
      return { loading: false, discoverys: action.payload };
    case DISCOVERY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

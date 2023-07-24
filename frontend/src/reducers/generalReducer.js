import {
  AFFILIATESTAT_CREATE_FAIL,
  AFFILIATESTAT_CREATE_REQUEST,
  AFFILIATESTAT_CREATE_RESET,
  AFFILIATESTAT_CREATE_SUCCESS,
  DASHBOARD_LIST_FAIL,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
  GENERAL_LIST_FAIL,
  GENERAL_LIST_REQUEST,
  GENERAL_LIST_SUCCESS,
  OVERALL_CREATE_FAIL,
  OVERALL_CREATE_REQUEST,
  OVERALL_CREATE_SUCCESS,
  PRODUCTSTAT_CREATE_FAIL,
  PRODUCTSTAT_CREATE_REQUEST,
  PRODUCTSTAT_CREATE_RESET,
  PRODUCTSTAT_CREATE_SUCCESS,
} from "../constants/generalConstant";

export const generalListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GENERAL_LIST_REQUEST:
      return { loading: true };
    case GENERAL_LIST_SUCCESS:
      return { loading: false, sales: action.payload };
    case GENERAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dashboardListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DASHBOARD_LIST_REQUEST:
      return { loading: true };
    case DASHBOARD_LIST_SUCCESS:
      return { loading: false, dashboards: action.payload };
    case DASHBOARD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const affiliateSalesReducer = (state = {}, action) => {
  switch (action.type) {
    case AFFILIATESTAT_CREATE_REQUEST:
      return { loading: true };
    case AFFILIATESTAT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newAffiliateStat: action.payload,
      };
    case AFFILIATESTAT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case AFFILIATESTAT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productStatReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTSTAT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCTSTAT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newProductStat: action.payload,
      };
    case PRODUCTSTAT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTSTAT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const overallReducer = (state = {}, action) => {
  switch (action.type) {
    case OVERALL_CREATE_REQUEST:
      return { loading: true };
    case OVERALL_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        overallStat: action.payload,
      };
    case OVERALL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTSTAT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

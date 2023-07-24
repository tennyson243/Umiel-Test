import {
  GENERAL_DASHBOARD_FAIL,
  GENERAL_DASHBOARD_REQUEST,
  GENERAL_DASHBOARD_SUCCESS,
  OVERVIEUW_LIST_FAIL,
  OVERVIEUW_LIST_REQUEST,
  OVERVIEUW_LIST_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_RESET,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_RESET,
  TRANSACTION_UPDATE_SUCCESS,
} from "../constants/transactionConstant";

export const transactionListReducer = (
  state = { loading: true, transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return { loading: true };
    case TRANSACTION_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.transaction,
        total: action.payload.total,
        pageSize: action.payload.pageSize,
        page: action.payload.page,
      };
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const generalDashboardReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GENERAL_DASHBOARD_REQUEST:
      return { loading: true };
    case GENERAL_DASHBOARD_SUCCESS:
      return { loading: false, generals: action.payload };
    case GENERAL_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const overvieuwReducer = (
  state = { loading: true, overallStats: [] },
  action
) => {
  switch (action.type) {
    case OVERVIEUW_LIST_REQUEST:
      return { loading: true };
    case OVERVIEUW_LIST_SUCCESS:
      return {
        loading: false,
        overallStats: action.payload.overallStats,
      };
    case OVERVIEUW_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return { loading: true };
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, transaction: action.payload };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const transactionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return { loading: true };
    case TRANSACTION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const transactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return { loading: true };
    case TRANSACTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

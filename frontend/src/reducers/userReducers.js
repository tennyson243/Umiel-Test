import {
  ADMIS_LIST_FAIL,
  ADMIS_LIST_REQUEST,
  ADMIS_LIST_SUCCESS,
  UPDATE_LOCATION,
  USER_ADDRESS_MAP_CONFIRM,
  USER_ADMIS_LIST_FAIL,
  USER_ADMIS_LIST_REQUEST,
  USER_ADMIS_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_GEOGRAPHY_FAIL,
  USER_GEOGRAPHY_REQUEST,
  USER_GEOGRAPHY_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_MEMBRES_LIST_FAIL,
  USER_MEMBRES_LIST_REQUEST,
  USER_MEMBRES_LIST_SUCCESS,
  USER_PERFORMANCE_FAIL,
  USER_PERFORMANCE_REQUEST,
  USER_PERFORMANCE_RESET,
  USER_PERFORMANCE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_TOPSELLERS_LIST_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, utilisateur: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userPerformanceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PERFORMANCE_REQUEST:
      return { loading: true };
    case USER_PERFORMANCE_SUCCESS:
      return { loading: false, success: true };
    case USER_PERFORMANCE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PERFORMANCE_RESET:
      return {};
    default:
      return state;
  }
};
export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const admisListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_ADMIS_LIST_REQUEST:
      return { loading: true };
    case USER_ADMIS_LIST_SUCCESS:
      return { loading: false, admis: action.payload };
    case USER_ADMIS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userGeographyReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_GEOGRAPHY_REQUEST:
      return { loading: true };
    case USER_GEOGRAPHY_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_GEOGRAPHY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const userTopSellerListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_TOPSELLERS_LIST_REQUEST:
      return { loading: true };
    case USER_TOPSELLERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_TOPSELLERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userMembresListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_MEMBRES_LIST_REQUEST:
      return { loading: true };
    case USER_MEMBRES_LIST_SUCCESS:
      return { loading: false, membres: action.payload };
    case USER_MEMBRES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAddressMapReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_MAP_CONFIRM:
      return { address: action.payload };
    default:
      return state;
  }
};

export const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { userLocationAddress: action.payload };
    default:
      return state;
  }
};

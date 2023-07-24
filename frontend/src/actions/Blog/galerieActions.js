import Axios from "axios";
import {
  GALERIE_CREATE_FAIL,
  GALERIE_CREATE_REQUEST,
  GALERIE_CREATE_SUCCESS,
  GALERIE_DELETE_FAIL,
  GALERIE_DELETE_REQUEST,
  GALERIE_DELETE_SUCCESS,
  GALERIE_DETAILS_FAIL,
  GALERIE_DETAILS_REQUEST,
  GALERIE_DETAILS_SUCCESS,
  GALERIE_LIST_FAIL,
  GALERIE_LIST_REQUEST,
  GALERIE_LIST_SUCCESS,
  GALERIE_UPDATE_FAIL,
  GALERIE_UPDATE_REQUEST,
  GALERIE_UPDATE_SUCCESS,
} from "../../constants/Blog/galerieConstants";

export const listGaleries = () => async (dispatch) => {
  dispatch({
    type: GALERIE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/galeries`);
    dispatch({ type: GALERIE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GALERIE_LIST_FAIL, payload: error.message });
  }
};

// export const detailsGalerie = (galerieId) => async (dispatch) => {
//   dispatch({ type: GALERIE_DETAILS_REQUEST, payload: galerieId });
//   try {
//     const { data } = await Axios.get(`/api/galeries/modif/${galerieId}`);
//     dispatch({ type: GALERIE_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: GALERIE_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const detailsGalerieModif =
  (galerieId) => async (dispatch, getState) => {
    dispatch({ type: GALERIE_DETAILS_REQUEST, payload: galerieId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/galeries/${galerieId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: GALERIE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GALERIE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createdGalerie = () => async (dispatch, getState) => {
  dispatch({ type: GALERIE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/galeries",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: GALERIE_CREATE_SUCCESS,
      payload: data.galerie,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GALERIE_CREATE_FAIL, payload: message });
  }
};
export const updateGalerie = (galerie) => async (dispatch, getState) => {
  dispatch({ type: GALERIE_UPDATE_REQUEST, payload: galerie });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/galeries/${galerie._id}`, galerie, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: GALERIE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GALERIE_UPDATE_FAIL, error: message });
  }
};
export const deleteGalerie = (galerieId) => async (dispatch, getState) => {
  dispatch({ type: GALERIE_DELETE_REQUEST, payload: galerieId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/galeries/${galerieId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: GALERIE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GALERIE_DELETE_FAIL, payload: message });
  }
};

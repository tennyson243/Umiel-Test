import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { cartReducer } from "./reducers/cartReducers";
import {
  affiliateTransactionReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from "./reducers/orderReducers";
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  produitsListReducer,
  produitsListStatReducer,
  recentsProduitListReducer,
} from "./reducers/productReducers";
import {
  admisListReducer,
  locationReducer,
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userGeographyReducer,
  userListReducer,
  userMembresListReducer,
  userPerformanceReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { createSlice } from "@reduxjs/toolkit";
import { createContext, useContext } from "react";
import {
  marqueVenduListReducer,
  partenaireListReducer,
  tropheListReducer,
} from "./reducers/partenariatReducer";
import { wishlistReducer } from "./reducers/wishlistReducers";
import {
  contactCreateReducer,
  contactDeleteReducer,
  contactDetailsReducer,
  contactListReducer,
  contactUpdateReducer,
} from "./reducers/contactReducer";
import { discoveryListReducer } from "./reducers/Blog/discoveryReducer";
import {
  heroCreateReducer,
  heroDeleteReducer,
  heroDetailsReducer,
  heroListSearchReducer,
  heroModificationReducer,
  heroReviewCreateReducer,
  herosCategoryListReducer,
  herosListReducer,
  herosPopulaireListReducer,
  heroUpdateReducer,
} from "./reducers/Blog/heroReducer";
import {
  populaireCategoryListReducer,
  populaireCreateReducer,
  populaireDeleteReducer,
  populaireDetailsReducer,
  populaireListReducer,
  populaireListSearchReducer,
  populaireModificationReducer,
  populaireReviewCreateReducer,
  populaireUpdateReducer,
} from "./reducers/Blog/populaireReducer";
import {
  galerieCreateReducer,
  galerieDeleteReducer,
  galerieDetailsReducer,
  galeriesListReducer,
  galerieUpdateReducer,
} from "./reducers/Blog/galerieReducer";
import {
  tiktokCreateReducer,
  tiktokDeleteReducer,
  tiktokDetailsReducer,
  tiktokListReducer,
  tiktokModificationReducer,
  tiktokUpdateReducer,
} from "./reducers/Blog/tiktokReducer";
import {
  lifestyleCategoryListReducer,
  lifestyleCreateReducer,
  lifestyleDeleteReducer,
  lifestyleDetailsReducer,
  lifestyleModificationReducer,
  lifestyleReviewCreateReducer,
  lifestylesListReducer,
  lifestyleUpdateReducer,
} from "./reducers/Blog/lifestyleReducer";
import {
  bannerCreateReducer,
  bannerDeleteReducer,
  bannerListReducer,
  bannerModificationReducer,
  bannerUpdateReducer,
} from "./reducers/bannerReducer";
import {
  apitherapieCategoryListReducer,
  apitherapieCreateReducer,
  apitherapieDeleteReducer,
  apitherapieDetailsReducer,
  apitherapieListReducer,
  apitherapieModificationReducer,
  apitherapieReviewCreateReducer,
  apitherapieUpdateReducer,
} from "./reducers/Blog/apitherapieReducer";
import {
  generalDashboardReducer,
  overvieuwReducer,
  transactionCreateReducer,
  transactionDeleteReducer,
  transactionDetailsReducer,
  transactionListReducer,
  transactionUpdateReducer,
} from "./reducers/transactionReducer";
import {
  affiliateSalesReducer,
  dashboardListReducer,
  generalListReducer,
  overallReducer,
  productStatReducer,
} from "./reducers/generalReducer";
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    facturation: localStorage.getItem("facturation")
      ? JSON.parse(localStorage.getItem("facturation"))
      : {},
    paymentMethod: "PayPal",
    livraison: 0,
  },
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
  global: {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
  },
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState.global,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const reducer = combineReducers({
  productList: productListReducer,
  transactionList: transactionListReducer,
  generalsDashboard: generalDashboardReducer,
  produitList: produitsListReducer,
  productDetails: productDetailsReducer,
  productListStat: produitsListStatReducer,
  transactionDetails: transactionDetailsReducer,
  herosList: herosListReducer,
  apitherapiesList: apitherapieListReducer,
  lifestylesList: lifestylesListReducer,
  bannersList: bannerListReducer,
  herosPopulaireList: herosPopulaireListReducer,
  heroDetails: heroDetailsReducer,
  heroModification: heroModificationReducer,
  apitherapieDetails: apitherapieDetailsReducer,
  apitherapiModification: apitherapieModificationReducer,
  lifestyleDetails: lifestyleDetailsReducer,
  lifestyleModification: lifestyleModificationReducer,
  bannerModification: bannerModificationReducer,
  populairesList: populaireListReducer,
  populaireDetails: populaireDetailsReducer,
  populaireListSearch: populaireListSearchReducer,
  heroListSearch: heroListSearchReducer,
  populaireModification: populaireModificationReducer,
  tiktoksList: tiktokListReducer,
  tiktokDetails: tiktokDetailsReducer,
  tiktokModification: tiktokModificationReducer,
  galeriesList: galeriesListReducer,
  galerieDetails: galerieDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  contactCreate: contactCreateReducer,
  contactDetails: contactDetailsReducer,
  contactList: contactListReducer,
  contactDelete: contactDeleteReducer,
  contactUpdate: contactUpdateReducer,
  orderPay: orderPayReducer,
  affiliateSalesRequest: affiliateSalesReducer,
  affiliateTransactionRequest: affiliateTransactionReducer,
  productStatRequest: productStatReducer,
  overallRequest: overallReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userPerformance: userPerformanceReducer,
  productCreate: productCreateReducer,
  transactionCreate: transactionCreateReducer,
  productUpdate: productUpdateReducer,
  transactionUpdate: transactionUpdateReducer,
  productDelete: productDeleteReducer,
  transactionDelete: transactionDeleteReducer,
  heroCreate: heroCreateReducer,
  heroUpdate: heroUpdateReducer,
  heroDelete: heroDeleteReducer,
  apitherapieCreate: apitherapieCreateReducer,
  apitherapieUpdate: apitherapieUpdateReducer,
  apitherapieDelete: apitherapieDeleteReducer,
  lifestyleCreate: lifestyleCreateReducer,
  lifestyleUpdate: lifestyleUpdateReducer,
  lifestyleDelete: lifestyleDeleteReducer,
  bannerCreate: bannerCreateReducer,
  bannerUpdate: bannerUpdateReducer,
  bannerDelete: bannerDeleteReducer,
  tiktokCreate: tiktokCreateReducer,
  tiktokUpdate: tiktokUpdateReducer,
  tiktokDelete: tiktokDeleteReducer,
  populaireCreate: populaireCreateReducer,
  populaireUpdate: populaireUpdateReducer,
  populaireDelete: populaireDeleteReducer,
  galerieCreate: galerieCreateReducer,
  galerieUpdate: galerieUpdateReducer,
  galerieDelete: galerieDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  admisList: admisListReducer,
  userGeography: userGeographyReducer,
  discoveryList: discoveryListReducer,
  listOverview: overvieuwReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  heroCategoryList: herosCategoryListReducer,
  heroReviewCreate: heroReviewCreateReducer,
  apitherapieCategoryList: apitherapieCategoryListReducer,
  apitherapieReviewCreate: apitherapieReviewCreateReducer,
  lifestyleCategoryList: lifestyleCategoryListReducer,
  lifestyleReviewCreate: lifestyleReviewCreateReducer,
  populaireCategoryList: populaireCategoryListReducer,
  populaireReviewCreate: populaireReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  userLocationAddress: locationReducer,
  orderSummary: orderSummaryReducer,
  userMembres: userMembresListReducer,
  marqueVenduList: marqueVenduListReducer,
  generalList: generalListReducer,
  dashboardList: dashboardListReducer,
  partenaireList: partenaireListReducer,
  tropheList: tropheListReducer,
  recentProduitList: recentsProduitListReducer,

  global: globalSlice.reducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

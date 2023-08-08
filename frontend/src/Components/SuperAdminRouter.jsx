import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SuperAdminRouter = ({ children }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo && userInfo.isSuperAdmin ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default SuperAdminRouter;

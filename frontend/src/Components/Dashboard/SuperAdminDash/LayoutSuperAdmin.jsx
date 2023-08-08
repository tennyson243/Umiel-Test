import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SiderBarSuperAdmin from "./SiderBarSuperAdmin";
import NavBarSuperAdmin from "./NavBarSuperAdmin";
import { Outlet } from "react-router-dom";

const LayoutSuperAdmin = () => {
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      <Box display={isNotMobile ? "flex" : "block"} width="100%" height="100%">
        <SiderBarSuperAdmin
          user={userInfo}
          isNotMobile={isNotMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Box flexGrow={1}>
          <NavBarSuperAdmin
            user={userInfo}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default LayoutSuperAdmin;

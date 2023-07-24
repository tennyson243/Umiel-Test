import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SiderbarUser from "./SiderbarUser";
import { Outlet } from "react-router-dom";
import NavbarUser from "./NavbarUser";

const LayoutUser = () => {
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      <Box display={isNotMobile ? "flex" : "block"} width="100%" height="100%">
        <SiderbarUser
          user={userInfo}
          isNotMobile={isNotMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Box flexGrow={1}>
          <NavbarUser
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

export default LayoutUser;

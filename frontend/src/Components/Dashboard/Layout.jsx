import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../Dashboard/NavBar";
import Sidebar from "../Dashboard/Sidebar";

const Layout = () => {
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      <Box display={isNotMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={userInfo}
          isNotMobile={isNotMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Box flexGrow={1}>
          <NavBar
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

export default Layout;

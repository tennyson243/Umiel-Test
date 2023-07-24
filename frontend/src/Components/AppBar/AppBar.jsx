import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React from "react";
import AppBarDesketop from "./AppBarDesketop";
import AppBarMobile from "./AppBarMobile";

const AppBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {matches ? (
        <AppBarMobile matches={matches} />
      ) : (
        <AppBarDesketop matches={matches} />
      )}
    </>
  );
};

export default AppBar;

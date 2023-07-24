import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Chargement = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CircularProgress>
          <span className='visually-hidden'>Chargement....</span>
        </CircularProgress>
      </Box>
    </>
  );
};

export default Chargement;

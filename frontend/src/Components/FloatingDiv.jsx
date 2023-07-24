import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const FloatingDiv = ({ img, text1, text2 }) => {
  return (
    <>
      <Box
        sx={{
          justifyContent: "space-around",
          background: "white",
          boxShadow: "var(--boxShadow)",
          borderRadius: "17px",
          display: "flex",
          alignItems: "center",
          padding: "0px 28px 0px 0px",
          height: "4.5rem",
        }}
      >
        <img src={img} alt='' style={{ transform: "scale(0.4)" }} />
        <Typography
          variant='h5'
          sx={{
            fontFamily: "sans-serif",
            fontSize: "16px",
            color: "black",
          }}
        >
          {text1}
        </Typography>
        <Typography
          variant='h5'
          sx={{
            fontFamily: "sans-serif",
            fontSize: "16px",
            color: "black",
          }}
        >
          {text2}
        </Typography>
      </Box>
    </>
  );
};

export default FloatingDiv;

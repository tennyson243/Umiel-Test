import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Healding = ({ title }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          margin: " 30px 0",
          height: "35px",
          backgroundImage: `url("../Images/title_pattern.png")`,
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: "bold",
            background: theme.palette.secondary.alt,
            height: "35px",
            width: "200px",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
    </>
  );
};

export default Healding;

import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";

const Univers = () => {
  const theme = useTheme();
  return (
    <>
      <Box backgroundColor={theme.palette.background.alt} p='2rem' mt='1rem'>
        <Box
          m='auto'
          sx={{
            textAlign: "center",
            width: {
              sm: "60%",
              xs: "90%",
            },
          }}
        >
          <Typography
            variant='h1'
            sx={{
              fontWeight: "bold",
            }}
          >
            Notre Univers
          </Typography>
          <Typography
            variant='h1'
            sx={{
              fontWeight: "bold",
            }}
          >
            <Typography
              variant='h5'
              sx={{
                mt: "3rem",
              }}
            >
              Fondée il y a plus de deux décennies, Umiel est née de la
              conviction profonde que la nature détient les secrets d'une vie
              épanouie et d'une santé équilibrée.....
            </Typography>
            <Button
              variant='contained'
              sx={{
                mt: "2rem",
                height: "3rem",
                width: {
                  sm: "35rem",
                  xs: "15rem",
                },
              }}
            >
              Voyager dans notre histoire
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Univers;

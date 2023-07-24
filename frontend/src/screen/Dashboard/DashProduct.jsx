import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, ButtonBase, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const images = [
    {
      url: "/static/images/buttons/breakfast.jpg",
      title: "Breakfast",
      width: "100%",
    },
    {
      url: "/static/images/buttons/burgers.jpg",
      title: "Burgers",
      width: "100%",
    },
    {
      url: "/static/images/buttons/camera.jpg",
      title: "Camera",
      width: "100%",
    },
  ];

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <>
      <Box width='80%' m='100px auto'>
        <Box
          display='grid'
          gap='15px'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box
            mt='10px'
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 2" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p='15px'
            >
              <Typography varaint='h3' textTransform={"uppercase"}>
                Ajouter un Produit
              </Typography>
            </Box>
            <Box p='20px'>
              <Button
                variant='contained'
                fullWidth
                backgroundColor={theme.palette.secondary.main}
                sx={{
                  boxShadow: "none",
                  borderRadius: 0,
                  padding: "15px 40px",
                }}
              >
                Ajouter un produit
              </Button>
            </Box>
          </Box>

          <Box
            mt='10px'
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 2" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p='15px'
            >
              <Typography varaint='h3' textTransform={"uppercase"}>
                List des Produits
              </Typography>
            </Box>
            <Box p='20px'>
              <Button
                variant='contained'
                fullWidth
                backgroundColor={theme.palette.secondary.main}
                sx={{
                  boxShadow: "none",
                  borderRadius: 0,
                  padding: "15px 40px",
                }}
                onClick={() => navigate("/productlist")}
              >
                Liste des Produits
              </Button>
            </Box>
          </Box>

          <Box
            mt='10px'
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 2" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p='15px'
            >
              <Typography varaint='h3' textTransform={"uppercase"}>
                Modifier un Produit
              </Typography>
            </Box>
            <Box p='20px'>
              <Button
                variant='contained'
                fullWidth
                backgroundColor={theme.palette.secondary.main}
                sx={{
                  boxShadow: "none",
                  borderRadius: 0,
                  padding: "15px 40px",
                }}
              >
                Modifier un Produit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashProduct;

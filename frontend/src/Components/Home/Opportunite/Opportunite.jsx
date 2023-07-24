import styled from "@emotion/styled";
import {
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../../Asset/op1.png";

const Opportunite = () => {
  
  const OpImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    // backgroundImage: `url(${src})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    width: "700px",
    [theme.breakpoints.down("md")]: {
      width: "350px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "19rem",
      height: "300px",
    },
  }));

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center' // Ajout de cette ligne pour centrer horizontalement
        marginBottom='30px'
        marginTop='70px'
        marginLeft='2px'
        width='98%'
        height='98%'
        sx={{
          flexDirection: {
            sm: "row",
            xs: "column",
          },
        }}
      >
        <OpImage src={Logo} />
        <div className='text'>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: 500,
              padding: "30px",
            }}
          >
            <Typography
              sx={{
                lineHeight: 1.5,
                fontSize: {
                  sm: "50px",
                  xs: "42px",
                },
                marginBottom: "20px",
              }}
            >
              Une Opportunite!
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                lineHeight: {
                  sm: 1.25,
                  xs: 1.15,
                },
                letterSpacing: { sm: 1.25, xs: 1.15 },
                marginBottom: { sm: "3rem", xs: "1.5rem" },
              }}
            >
              Explorez le pouvoir guérisseur de ce trésor de la nature et
              intégrez-le dans votre vie quotidienne.
            </Typography>

            <Button
              fullWidth
              // color='p'
              variant='contained'
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                padding: "15px 40px",
              }}
            >
              Pour rejoindre l'aventure c'est par ICI
            </Button>
          </Box>
        </div>
      </Box>
      {/* <Box width='90%' m='auto'>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            mt: "5%",
          }}
        >
          <Box>
            <div className='i-right'>
              <OpImage src={Logo} alt='' />
          
            </div>
          </Box>

          <Box textAlign='center' sx={{
            mt:"100px"
          }}>
            <Typography
              variant='h1'
              sx={{
                pb: "40px",
                fontWeight: "bold",
              }}
            >
              Une Opportunite pour tous!
            </Typography>
            <Typography
              variant='h4'
              sx={{
                pb: "5px",
                color: theme.palette.secondary[600],
              }}
            >
              Umiel - Des trésors de la nature, directement de la ruche à votre
              table
            </Typography>

            <Typography
              variant='h4'
              sx={{
                pt: "5px",
              }}
            >
              Explorez le pouvoir guérisseur de ce trésor de la nature et
              intégrez-le dans votre vie quotidienne.
            </Typography>

            <Button
              variant='contained'
              sx={{
                backgroundColor: theme.palette.secondary.alt,
                mt: "2rem",
                height: "3rem",
                width: {
                  sm: "15rem",
                  xs: "15rem",
                },
              }}
            >
              Pour rejoindre l'aventure c'est par ICI
            </Button>
          </Box>
        </Box>
      </Box> */}
    </>
  );
};

export default Opportunite;

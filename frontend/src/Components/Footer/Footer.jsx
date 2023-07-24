import {
  Box,
  Button,
  Grid,
  Icon,
  List,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { FooterTitle, SubscribeTf } from "./FooterStyle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import FlexBetween from "../FlexBetween";
import { useSelector } from "react-redux";
import ChatBox from "../ChatBox";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BiotechIcon from "@mui/icons-material/Biotech";
import QuizIcon from "@mui/icons-material/Quiz";

const Footer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          marginTop: "10%",
          boxShadow:
            "0px 5px 5px -5px rgba(0,0,0,0.6), 0px -5px 5px -5px rgba(0,0,0,0.6)",
          backgroundColor: theme.palette.primary[900],
        }}
      >
        <Box
          m='auto'
          sx={{
            width: {
              sm: "80%",
              xs: "95%",
            },
          }}
        >
          <Box
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              p: "20px 0 20px 0",
            }}
          >
            <Box sx={{ gridColumn: "span 1" }} textAlign='center'>
              <Icon>
                <ShoppingCartCheckoutIcon fontSize='70px' />
              </Icon>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                }}
              >
                Paiement 100% sécurisé
              </Typography>
              <Typography variant='h6'>
                CB, Paypal, virement bancaire, chèque
              </Typography>
            </Box>

            <Box sx={{ gridColumn: "span 1" }} textAlign='center'>
              <Icon>
                <LocalShippingIcon fontSize='70px' />
              </Icon>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                }}
              >
                Livraison gratuite
              </Typography>
              <Typography variant='h6'>
                En point relais dès 29 € d'achats
              </Typography>
            </Box>

            <Box sx={{ gridColumn: "span 1" }} textAlign='center'>
              <Icon>
                <BiotechIcon fontSize='70px' />
              </Icon>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                }}
              >
                Engagements qualité
              </Typography>
              <Typography variant='h6'>
                Des produits 100% BIO et contrôlés
              </Typography>
            </Box>

            <Box sx={{ gridColumn: "span 1" }} textAlign='center'>
              <Icon>
                <QuizIcon fontSize='70px' />
              </Icon>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                }}
              >
                Service client réactif
              </Typography>
              <Typography variant='h6'>
                Une solution à chaque problème
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          background: theme.palette.background.alt,
          p: { xs: 4, md: 10 },
          pt: 12,
          pb: 12,
          fontSize: { xs: "12px", md: "14px" },
        }}
      >
        {userInfo && !userInfo.isAdmin && (
          <Box
            sx={{
              background: theme.palette.primary[700],
              p: { xs: 4, md: 2 },
              mb: 4,

              fontSize: { xs: "12px", md: "14px" },
            }}
          >
            <Stack
              sx={{
                direction: {
                  sm: "row",
                  xs: "column",
                },
              }}
            >
              <Typography variant='h3'>
                Vous avez besoin d'Assistance?
              </Typography>
              <ChatBox userInfo={userInfo} />
            </Stack>
          </Box>
        )}

        <Grid container spacing={2} justifyContent='center'>
          <Grid item md={6} lg={4}>
            <FooterTitle variant='body1'>Apropos de Nous</FooterTitle>
            <Typography variant='caption2'>
              UMIEL est une entreprise spécialisée dans la vente de miel
              biologique pur. L'entreprise propose une large sélection de miels
              de différentes variétés, tous issus de l'apiculture biologique.
              Les abeilles sont élevées dans un environnement respectueux de
              l'environnement, sans l'utilisation de pesticides ou d'autres
              produits chimiques nocifs.
            </Typography>
            <Box
              sx={{
                mt: 4,
                color: theme.palette.neutral.main,
              }}
            >
              <FacebookIcon sx={{ mr: 1 }} />
              <TwitterIcon sx={{ mr: 1 }} />
              <InstagramIcon />
            </Box>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant='body1'>information</FooterTitle>
            <List>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  À propos de nous
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Suivi de commande
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Confidentialité et politique
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Termes et conditions
                </Typography>
              </ListItemText>
            </List>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant='body1'>mon compte</FooterTitle>
            <List>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Se connecter
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Mon panier
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Mon compte
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant='caption2'>
                  Liste de souhaits
                </Typography>
              </ListItemText>
            </List>
          </Grid>
          <Grid item md={6} lg={4}>
            <FooterTitle variant='body1'>newsletter</FooterTitle>
            <Stack>
              <SubscribeTf
                color='primary'
                label='Email address'
                variant='standard'
              />
              <Button
                startIcon={<SendIcon />}
                sx={{ mt: 4, mb: 4 }}
                variant='contained'
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <div className='legal  '>
        <div className='container flexSB'>
          <p>© all rights reserved</p>
          <p>
            fait avec <i className='fa fa-heart'></i> Par Tennyson Nickson Nick
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

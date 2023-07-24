import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import EnTete from "../Components/EnTete";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { listMembres } from "../actions/userActions";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import FlexBetween from "../Components/FlexBetween";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { listMarqueVendu } from "../actions/partenariatActions";

const AboutScreen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMembres = useSelector((state) => state.userMembres);
  const { loading, error, membres } = userMembres;

  const marqueVenduList = useSelector((state) => state.marqueVenduList);
  const {
    loading: loadingMarqueVendu,
    error: errorMarqueVendu,
    marques,
  } = marqueVenduList;

  useEffect(() => {
    dispatch(listMembres());
    dispatch(listMarqueVendu());
  }, [dispatch]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  console.log(listMarqueVendu());
  return (
    <>
      <EnTete title='A propos de nous' />
      <Box width='80%' m='auto'>
        <Helmet>
          <title> A propos de nous</title>
        </Helmet>
        <Box>
          <Box
            sx={{
              mt: 5,
              textAlign: "center",
            }}
          >
            <Typography
              variant='h2'
              color={theme.palette.secondary[100]}
              fontWeight='bold'
              sx={{ mb: "5px" }}
            >
              Bienvenue chez Umiel
            </Typography>
            <Typography variant='h5' color={theme.palette.secondary[300]}>
              Nous sommes une entreprise spécialisée dans la production et la
              commercialisation de produits de la ruche.
            </Typography>
            <Typography variant='h5' color={theme.palette.secondary[300]}>
              Nous proposons une large gamme de produits naturels tels que le
              miel, la propolis, la gelée royale et la cire d'abeille.
            </Typography>
            <Typography variant='h5' color={theme.palette.secondary[300]}>
              Notre entreprise se distingue par sa démarche respectueuse de
              l'environnement et du bien-être des abeilles.
            </Typography>
            <Typography variant='h5' color={theme.palette.secondary[300]}>
              Tous nos produits sont issus de ruches gérées de manière durable,
              sans utilisation de pesticides ou d'OGM.
            </Typography>
            <Typography variant='h5' color={theme.palette.secondary[300]}>
              Chez Umiel, nous nous engageons à offrir des produits de haute
              qualité, purs et authentiques, tout en préservant la santé des
              abeilles et en soutenant les apiculteurs locaux.
            </Typography>
            <Typography variant='h5' color={theme.palette.secondary[300]}>
              Découvrez la richesse de la nature dans nos produits et
              rejoignez-nous dans notre engagement pour un avenir durable.
            </Typography>
            <Button
              sx={{
                mt: 5,
                width: "200px",
                height: "50px",
              }}
              variant='contained'
              endIcon={<SendIcon />}
            >
              Contactez-nous
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display='grid'
          gap='15px'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            mt: 10,
          }}
        >
          <Box
            mt='10px'
            sx={{
              paddingTop: "120px",
              position: "relative",
              width: "100%",
              zIndex: 2,
              backgroundImage: "url(images/others/1.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              gridColumn: "span 2",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <Box>
                <Box
                  sx={{
                    marginBottom: "20px",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <YouTubeIcon
                      sx={{
                        fontSize: "100px",
                        color: isHovered ? "red" : "inherit",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            mt='10px'
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 2" }}
          >
            <Typography
              variant='h2'
              color={theme.palette.secondary[100]}
              sx={{ mt: "60px", ml: "20px" }}
              textTransform='uppercase'
            >
              Pourquoi nous choisir?
            </Typography>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              m='20px'
            >
              <Box
                backgroundColor={theme.palette.background.alt}
                sx={{ gridColumn: "span 2" }}
              >
                <Stack direction='row' spacing={2}>
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 60 }} />
                  <Stack>
                    <Typography
                      variant='h4'
                      sx={{
                        mt: "10px",
                      }}
                    >
                      Coffret cadeau gratuit
                    </Typography>
                    <Typography variant='h6'>
                      Lorem ipsum dolor sit amet consect adipisic elit sed do.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box
                backgroundColor={theme.palette.background.alt}
                sx={{ gridColumn: "span 2" }}
              >
                <Stack direction='row' spacing={2}>
                  <CachedOutlinedIcon sx={{ fontSize: 50 }} />
                  <Stack>
                    <Typography
                      variant='h4'
                      sx={{
                        mt: "10px",
                      }}
                    >
                      Remboursement
                    </Typography>
                    <Typography variant='h6'>
                      Lorem ipsum dolor sit amet consect adipisic elit sed do.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box
                backgroundColor={theme.palette.background.alt}
                sx={{ gridColumn: "span 2" }}
              >
                <Stack direction='row' spacing={2}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 50 }} />
                  <Stack>
                    <Typography
                      variant='h4'
                      sx={{
                        mt: "10px",
                      }}
                    >
                      Livraison a Domicile
                    </Typography>
                    <Typography variant='h6'>
                      Lorem ipsum dolor sit amet consect adipisic elit sed do.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box
                backgroundColor={theme.palette.background.alt}
                sx={{ gridColumn: "span 2" }}
              >
                <Stack direction='row' spacing={2}>
                  <AccessAlarmOutlinedIcon sx={{ fontSize: 50 }} />
                  <Stack>
                    <Typography
                      variant='h4'
                      sx={{
                        mt: "10px",
                      }}
                    >
                      Assistance 24h/24 et 7j/7
                    </Typography>
                    <Typography variant='h6'>
                      Lorem ipsum dolor sit amet consect adipisic elit sed do.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width='90%' m='auto'>
        <Box textAlign='center' mt='60px' mb='50px'>
          <Header
            title='Notre Equipe'
            subtitle="L'équipe de l'entreprise Umiel est composée d'experts passionnés par la production et la commercialisation du miel. Le groupe se compose de professionnels dédiés à chaque étape du processus, depuis l'apiculture jusqu'à la distribution des produits finaux. Les apiculteurs qualifiés veillent à la santé des abeilles et à la récolte du miel de haute qualité."
          />
        </Box>

        <Box
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {loading ? (
            <Chargement />
          ) : error ? (
            <MessageBox severity='error'>{error}</MessageBox>
          ) : (
            <>
              {membres.map((val) => {
                return (
                  <Box
                    backgroundColor={theme.palette.background.alt}
                    borderRadius='6px'
                    border='1px solid rgb(62 28, 131 /38%)'
                    padding=' 2rem'
                    transition=' 0.5s'
                  >
                    <Box textAlign=' center'>
                      <div className='img'>
                        <img src={val.membre.cover} alt='' srcset='' />
                      </div>
                      <Stack
                        direction='row'
                        justifyContent='center'
                        spacing={1}
                      >
                        <LocationOnIcon />
                        <Typography variant='h6'>
                          {val.membre.address}
                        </Typography>
                      </Stack>

                      <h4>{val.membre.name}</h4>
                      <h4 className='Post'>{val.membre.poste}</h4>
                      {val.membre.icons.map((icon, index) => (
                        <IconButton
                          key={index}
                          onClick={() => (window.location.href = icon.link)}
                        >
                          {icon.icon === "<FacebookIcon />" && <FacebookIcon />}
                          {icon.icon === "<LinkedInIcon />" && <LinkedInIcon />}
                          {icon.icon === "<TwitterIcon />" && <TwitterIcon />}
                          {icon.icon === "<InstagramIcon />" && (
                            <InstagramIcon />
                          )}
                        </IconButton>
                      ))}

                      <FlexBetween mt='20px'>
                        <Button variant='contained'>Message</Button>
                        <Button variant='contained'>
                          <PhoneInTalkIcon className='fa fa-phone-alt' />
                        </Button>
                      </FlexBetween>
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Box>
      <Box mt='80px'>
        <Box
          sx={{
            paddingTop: "120px",
            position: "relative",
            height: "500px",
            zIndex: 2,
            backgroundImage: "url(images/bg/4.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <Box>
              <Box
                sx={{
                  marginBottom: "30px",
                  justifyContent: "center",
                }}
              >
                <img
                  src='images/test/client/1.png'
                  alt='testimonial images'
                  style={{
                    width: "100px",
                  }}
                />
                <Box>
                  <Typography
                    variant='h4'
                    sx={{
                      p: "0 16%",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmod teincidi dunt ut labore et dolore gna aliqua. Ut
                    enim ad minim veniam,
                  </Typography>
                </Box>
                <Stack
                  direction='row'
                  justifyContent='center'
                  spacing={2}
                  sx={{
                    mt: "30px",
                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.secondary[100],
                    }}
                  >
                    Robiul siddikee
                  </Typography>
                  <Typography variant='h3'>-</Typography>
                  <Typography variant='h3'>Client</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box mt='80px'>
        <Box
          display='grid'
          gridTemplateColumns='repeat(5, minmax(0, 1fr))'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {loadingMarqueVendu ? (
            <Chargement />
          ) : errorMarqueVendu ? (
            <MessageBox severity='error'>{errorMarqueVendu}</MessageBox>
          ) : (
            <>
              {marques.map((marque) => {
                return (
                  <Box
                    borderRadius='6px'
                    padding=' 2rem'
                    transition=' 0.5s'
                    justifyContent='center'
                  >
                    <Box>
                      <img
                        src={marque.marque.Image}
                        alt=''
                        srcset=''
                        style={{
                          width: "70px",
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AboutScreen;

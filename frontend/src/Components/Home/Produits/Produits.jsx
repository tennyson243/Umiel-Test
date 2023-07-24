import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import Slider from "react-slick";
import { listPopulaireHeros } from "../../../actions/Blog/heroActions";
import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
    >
      Next
    </Button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
    >
      Prev
    </Button>
  );
};

const Produits = () => {
  const herosPopulaireList = useSelector((state) => state.herosPopulaireList);
  const { loading, error, herosPopulaires } = herosPopulaireList;

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    dispatch(listPopulaireHeros());
  }, [dispatch]);

  const ProductImage2 = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "100%",
    height: "40rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "25rem",
    },
  }));

  return (
    <>
      <Box>
        <Box>
          <Box>
            <Box>
              <Slider {...settings2}>
                {loading ? (
                  <Chargement />
                ) : error ? (
                  <MessageBox severity='error'>{error}</MessageBox>
                ) : (
                  herosPopulaires.map((val) => (
                    <div className='items'>
                      <div className='box shadow'>
                        <div className='images'>
                          <div className='img'>
                            <ProductImage2 src={val.cover} />
                          </div>
                          <Box
                            color='white'
                            padding='20px'
                            borderRadius='1px'
                            textAlign='center'
                            backgroundColor='rgb(0, 0, 0, 0.4)'
                            position='absolute'
                            top='30%'
                            left={isNonMobile ? "2%" : "0"}
                            // right={isNonMobile ? undefined : "0"}
                            // margin={isNonMobile ? undefined : "0 auto"}
                            // maxWidth={isNonMobile ? undefined : "240px"}
                          >
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "20px",
                                  sm: "42px",
                                },
                                fontWeight: "bold",
                              }}
                            >
                              La magie de la nature pour prendre soin de vous au
                              quotidien
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
                              textAlign='center'
                            >
                              Decouvrer nos Produits
                            </Button>
                          </Box>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </Slider>
            </Box>
            {/* <Carousel
              infiniteLoop={true}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              autoPlay={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton
                  onClick={onClickHandler}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    color: "white",
                    padding: "5px",
                    zIndex: "10",
                  }}
                >
                  <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                </IconButton>
              )}
              renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                  onClick={onClickHandler}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    color: "white",
                    padding: "5px",
                    zIndex: "10",
                  }}
                >
                  <NavigateNextIcon sx={{ fontSize: 40 }} />
                </IconButton>
              )}
            >
              {Object.values(heroTextureImports).map((texture, index) => (
                <Box key={`carousel-image-${index}`}>
                  <img
                    src={texture}
                    alt={`carousel-${index}`}
                    style={{
                      width: "100%",
                      height: "500px",
                      objectFit: "cover",
                      backgroundAttachment: "fixed",
                    }}
                  />
                  <Box
                    color='white'
                    padding='20px'
                    borderRadius='1px'
                    textAlign='center'
                    backgroundColor='rgb(0, 0, 0, 0.4)'
                    position='absolute'
                    top='30%'
                    left={isNonMobile ? "2%" : "0"}
                    // right={isNonMobile ? undefined : "0"}
                    // margin={isNonMobile ? undefined : "0 auto"}
                    // maxWidth={isNonMobile ? undefined : "240px"}
                  >
                    <Typography variant='h1'>
                      La magie de la nature pour prendre soin de vous au
                      quotidien
                    </Typography>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: theme.palette.secondary.alt,
                        mt: "2rem",
                        height: "3rem",
                        width: {
                          sm: "35rem",
                          xs: "15rem",
                        },
                      }}
                      textAlign='center'
                    >
                      Decouvrer nos Produits
                    </Button>
                  </Box>
                </Box>
              ))}
            </Carousel> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Produits;

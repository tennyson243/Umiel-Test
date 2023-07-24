import { useTheme } from "@emotion/react";
import { Container, Slide, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPopulaires } from "../../../actions/Blog/populaireAction";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-coverflow";
// import "swiper/css/zoom";
// import "../../Swipper/swiper.css";
import { useNavigate } from "react-router-dom";

const SinglePageSlider = () => {
  
  const populairesList = useSelector((state) => state.populairesList);
  const { loading, error, populaires } = populairesList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listPopulaires());
  }, [dispatch]);


  return (
    <>
      <Box>
        <Box>
          {loading ? (
            <Chargement />
          ) : error ? (
            <MessageBox severity='error'>{error}</MessageBox>
          ) : (
            <Container sx={{ pt: 5, pb: 5 }}>
              {/* <Swiper
                modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
                centeredSlides
                slidesPerView={3}
                grabCursor
                navigation
                autoplay
                lazy
                zoom
                effect='coverflow'
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
              >
                {populaires.map((val) => (
                  <SwiperSlide key={val}>
                    <Box>
                      <Box>
                        <Box
                          sx={{
                            height: "150px",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/populaire/${val.title}`)}
                        >
                          <img src={val.cover} alt='' />
                        </Box>
                      </Box>
                    </Box>

                    <Tooltip
                      title={val.title}
                      sx={{
                        position: "absolute",
                        bottom: "8px",
                        left: "8px",
                        zIndex: 2,
                      }}
                    >
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: "bold",
                          pl: "15px",
                        }}
                        onClick={() => navigate(`/populaire/${val.title}`)}
                      >
                        {val.title}
                      </Typography>
                    </Tooltip>
                  </SwiperSlide>
                ))}
              </Swiper> */}
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SinglePageSlider;

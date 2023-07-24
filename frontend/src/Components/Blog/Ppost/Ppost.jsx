import { Box, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { listPopulaireHeros } from "../../../actions/Blog/heroActions";
import Healding from "../../Healding";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import { useTheme } from "@emotion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ppost.css";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

const Ppost = () => {
  const herosPopulaireList = useSelector((state) => state.herosPopulaireList);
  const { loading, error, herosPopulaires } = herosPopulaireList;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(listPopulaireHeros());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  const ProductImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "100%",
    height: "230px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  return (
    <>
      <Box>
        <Box>
          <Healding title='Remede Naturel' />
          <div className='content'>
            <Slider {...settings}>
              {loading ? (
                <Chargement />
              ) : error ? (
                <MessageBox severity='error'>{error}</MessageBox>
              ) : (
                herosPopulaires.map((val) => (
                  <div className='items'>
                    <Box
                      margin='15px 15px 15px 0'
                      backgroundColor={theme.palette.background.alt}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <div className='images'>
                          <Box>
                            <ProductImage src={val.cover} />
                          </Box>
                          <div class='category category1'>
                            <span>{val.sousCategorie}</span>
                          </div>
                        </div>
                      </Box>

                      <Box
                        sx={{
                          padding: "20px",
                        }}
                      >
                        <Typography
                          variant='h5'
                          sx={{
                            fontWeight: "bold",
                            mb: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/hero/${val.title}`)}
                        >
                          {val.title.slice(0, 40)}...
                        </Typography>
                        <Stack direction='row' spacing={2}>
                          <CalendarToday />
                          <Typography
                            variant='h6'
                            sx={{
                              mb: "15px",
                            }}
                          >
                            {val.time}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  </div>
                ))
              )}
            </Slider>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Ppost;

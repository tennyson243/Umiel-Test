import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { BannerImage } from "./BannerContenaire";
import { useDispatch, useSelector } from "react-redux";
import { listBanners } from "../../../actions/bannerActions";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import BannerCard from "./BannerCard";

const Banner = () => {
  const theme = useTheme();
  const bannersList = useSelector((state) => state.bannersList);
  const { loading, error, banners } = bannersList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listBanners());
  }, [dispatch]);

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
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    autoplay: true,
    speed: 500,
    slidesPerRow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section>
      <div className='content'>
        <Box>
          <Slider {...settings}>
            {loading ? (
              <Chargement />
            ) : error ? (
              <MessageBox severity='error'>{error}</MessageBox>
            ) : (
              banners.map((val) => <BannerCard key={val._id} banner={val} />)
            )}
          </Slider>
        </Box>
      </div>
    </section>
  );
};

export default Banner;

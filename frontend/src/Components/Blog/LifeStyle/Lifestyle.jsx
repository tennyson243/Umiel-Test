import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { listLifestyles } from "../../../actions/Blog/lifeStyleActions";
import Chargement from "../../Chargement";
import Healding from "../../Healding";
import MessageBox from "../../MessageBox";

const Lifestyle = () => {
  const lifestylesList = useSelector((state) => state.lifestylesList);
  const { loading, error, lifestyles } = lifestylesList;
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listLifestyles());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="popularPost life">
        <Healding title="Santé naturelle" />
        <div className="content">
          <Slider {...settings}>
            {loading ? (
              <Chargement />
            ) : error ? (
              <MessageBox severity="error">{error}</MessageBox>
            ) : (
              lifestyles.map((val) => (
                <div className="items">
                  <Box
                    margin="15px 15px 15px 0"
                    backgroundColor={theme.palette.background.alt}
                  >
                    <div className="images">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div class="category category1">
                        <span>{val.sousCategorie.slice(0, 18)}..</span>
                      </div>
                    </div>
                    <div className="text">
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          margin: "0",
                          cursor: "pointer",
                          m: {
                            xs: "2px",
                          },
                        }}
                        onClick={() => navigate(`/lifestyle/${val.title}`)}
                      >
                        {val.title.slice(0, 40)}...
                      </Typography>
                      <div className="date">
                        <i class="fas fa-calendar-days"></i>
                        <label>
                          {new Date(val.createdAt).toLocaleDateString("fr-FR", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </label>
                      </div>
                    </div>
                  </Box>
                  <div className="box shadow"></div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Lifestyle;

import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPopulaires } from "../../../actions/Blog/populaireAction";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./slider.css";

const SinglePageSlider = () => {
  const populairesList = useSelector((state) => state.populairesList);
  const { loading, error, populaires } = populairesList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listPopulaires());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Box>
        <Box>
          {loading ? (
            <Chargement />
          ) : error ? (
            <MessageBox severity="error">{error}</MessageBox>
          ) : (
            <section className="singlePopular">
              <div className="content">
                <Slider {...settings}>
                  {populaires.map((val) => {
                    return (
                      <div className="items">
                        <Box
                          className="box"
                          onClick={() => navigate(`/populaire/${val.title}`)}
                        >
                          <div className="images">
                            <img src={val.cover} alt="" />
                          </div>
                          <div className="text">
                            <h1 className="title">{val.title}</h1>
                          </div>
                        </Box>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </section>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SinglePageSlider;

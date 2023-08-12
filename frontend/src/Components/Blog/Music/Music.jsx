import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Chargement from "../../Chargement";
import Healding from "../../Healding";
import MessageBox from "../../MessageBox";
import "./music.css";
import { listApitherapie } from "../../../actions/Blog/apitherapieActions";

const Music = () => {
  const theme = useTheme();
  const apitherapiesList = useSelector((state) => state.apitherapiesList);
  const { loading, error, apitherapies } = apitherapiesList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listApitherapie());
  }, [dispatch]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    autoplay: true,
    speed: 500,
    rows: 2,
    arrows: false,
    slidesPerRow: 1,
  };
  return (
    <>
      <section className="music">
        <Healding title="Apitherapie" />
        <div className="content">
          <Slider {...settings}>
            {loading ? (
              <Chargement />
            ) : error ? (
              <MessageBox severity="error">{error}</MessageBox>
            ) : (
              apitherapies.map((val) => (
                <div className="items">
                  <Box
                    backgroundColor={theme.palette.background.alt}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom="30px"
                    marginLeft="2px"
                    sx={{
                      flexDirection: {
                        sm: "row",
                        xs: "column",
                      },
                    }}
                  >
                    <div className="images">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div class="category category1">
                        <span>{val.sousCategorie}</span>
                      </div>
                    </div>
                    <div className="text">
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          padding: "20px 20px 20px 20px",
                          margin: "0",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/apitherapie/${val.title}`)}
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
                      <p className="desc">
                        {val.introduction.slice(0, 250)}...
                      </p>
                      <div className="comment">
                        <i class="fas fa-share"></i>
                        <label>Share / </label>
                        <i class="fas fa-comments"></i>
                        <label>{val.comments}</label>
                      </div>
                    </div>
                  </Box>
                  <div className="box shadow flexSB"></div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Music;

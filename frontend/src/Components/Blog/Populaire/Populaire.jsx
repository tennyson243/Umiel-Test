import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { listPopulaires } from "../../../actions/Blog/populaireAction";
import Healding from "../../Healding";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";

import PopulaireCard from "./PopulaireCard";

const Populaire = () => {
  const populairesList = useSelector((state) => state.populairesList);
  const { loading, error, populaires } = populairesList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPopulaires());
  }, [dispatch]);

  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    autoplay: true,
    arrows: false, // Remove arrows
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };
  return (
    <>
      <section className="popular">
        <Healding title="Nutrition naturelle" />
        <div className="content">
          <Slider {...settings}>
            {loading ? (
              <Chargement />
            ) : error ? (
              <MessageBox severity="error">{error}</MessageBox>
            ) : (
              populaires.map((val) => (
                <PopulaireCard key={val._id} populaire={val} />
              ))
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Populaire;

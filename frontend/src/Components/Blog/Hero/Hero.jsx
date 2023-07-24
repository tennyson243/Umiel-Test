import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHeros } from "../../../actions/Blog/heroActions";
import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import HeroCard from "./HeroCard";
import "./hero.css";

const Hero = () => {
  const herosList = useSelector((state) => state.herosList);
  const { loading, error, heros } = herosList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listHeros());
  }, [dispatch]);

  return (
    <>
      <section className='hero'>
        <div className='container'>
          {loading ? (
            <Chargement />
          ) : error ? (
            <MessageBox variant='error'>{error}</MessageBox>
          ) : (
            heros
              .slice(0, 4)
              .map((item) => <HeroCard key={item._id} hero={item} />)
          )}
        </div>
      </section>
    </>
  );
};

export default Hero;

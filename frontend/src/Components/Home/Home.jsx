import React from "react";

import Banner from "./Banner/Banner";
import Bloging from "./Bloging/Bloging";
import Opportunite from "./Opportunite/Opportunite";
import Produits from "./Produits/Produits";
import Promotion from "./Promotion/Promotion";
import Trophe from "./Trophe/Trophe";
import Univers from "./Univers/Univers";

const Home = () => {
  return (
    <>
      <Banner />
      <Promotion />
      <Opportunite />
      {/* <Works /> */}
      <Produits />
      <Univers />
      <Trophe />
      <Promotion />
      <Bloging />
    </>
  );
};

export default Home;

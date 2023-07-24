import React from "react";
import { Helmet } from "react-helmet-async";
import Discovery from "../Discovery/Discovery";
import Hero from "../Hero/Hero";
import Principal from "../Principal/Principal";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <Hero />
      <Principal />
      <Discovery />
    </>
  );
};

export default HomePage;

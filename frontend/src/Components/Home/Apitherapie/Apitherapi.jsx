import { Button, Typography } from "@mui/material";
import React from "react";
import {
  BanContainer,
  BanContent,
  BanDescription,
  BanImage,
  BanTitle,
} from "./ApiCont";

const Apitherapi = () => {
  return (
    <BanContainer>
      <BanContent>
        <Typography variant='h5'>La Magie Au Naturel</Typography>
        <BanTitle variant='h2'>Umiel Apitherapie</BanTitle>

        <BanDescription variant='subtitle'>
          Chez Umiel, l'apithérapie est utilisée pour tirer parti des propriétés
          curatives des produits de la ruche, notamment le miel, la propolis, le
          pollen et la gelée royale. Ces produits naturels et biologiques sont
          utilisés pour traiter une variété de problèmes de santé, notamment les
          allergies, les infections, l'inflammation et la fatigue.
        </BanDescription>

        <Button
          fullWidth
          // color='p'
          variant='contained'
          sx={{
            boxShadow: "none",
            borderRadius: 0,
            padding: "15px 40px",
          }}
        >
          ACHETER MAINTENANT
        </Button>
      </BanContent>
      <BanImage src='../../Images/ban2.png' />
    </BanContainer>
  );
};

export default Apitherapi;

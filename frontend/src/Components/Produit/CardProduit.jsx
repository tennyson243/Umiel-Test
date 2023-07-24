import { Button, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import FitScreenIcon from "@mui/icons-material/FitScreen";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ProductDetails from "./ProductDetails";
import ProductMeta from "./ProductMeta";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
} from "./ProduitStyle";

const SingleProductDesketop = ({ product, matches }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Box backgroundColor={theme.palette.background.alt}>
          <ProductImage src={product.image} />
        </Box>

        <ProductFavButton isfav={0}>
          <FavoriteIcon />
        </ProductFavButton>
        {(showOptions || matches) && (
          <ProductAddToCart show={showOptions} variant='contained'>
            Ajouter au Panier
          </ProductAddToCart>
        )}
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? "row" : "column"}>
            <ProductActionButton>
              <Tooltip placement='left' title='Partager ce Produit'>
                <ShareIcon color='primary' />
              </Tooltip>
            </ProductActionButton>
            <ProductActionButton
              onClick={() => navigate(`/produits/${product._id}`)}
            >
              <Tooltip placement='left' title='Vue Rapide'>
                <FitScreenIcon color='primary' />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductMeta product={product} />
      {/* <ProductDetailDialog product={product} /> */}
    </>
  );
};

const SingleProduct = ({ product, matches }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    navigate(`/panier/${product._id}?qty=${qty}`);
  };
  const theme = useTheme();

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Box backgroundColor={theme.palette.background.alt} width='100%'>
          <ProductImage src={product.image} />
        </Box>
        <ProductMeta product={product} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction={matches ? "row" : "column"}>
            <ProductFavButton isfav={0}>
              <FavoriteIcon />
            </ProductFavButton>
            <ProductActionButton>
              <Tooltip placement='left' title='Partager ce Produit'>
                <ShareIcon color='primary' />
              </Tooltip>
            </ProductActionButton>
            <ProductActionButton
              onClick={() => navigate(`/produits/${product._id}`)}
            >
              <Tooltip placement='left' title='Vue Rapide'>
                <FitScreenIcon color='primary' />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      {(showOptions || matches) && (
        <ProductAddToCart show={showOptions} variant='contained'>
          Ajouter au Panier
        </ProductAddToCart>
      )}
      {/* <ProductDetailDialog product={product} /> */}
    </>
  );
};
const CardProduit = (props) => {
  const { product } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {matches ? (
        <SingleProduct product={product} matches={matches} />
      ) : (
        <SingleProductDesketop product={product} matches={matches} />
      )}
    </>
  );
};

export default CardProduit;

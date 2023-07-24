import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Colors } from "../AppBar/BanTheme.js";
import { Product, ProductImage } from "../Produit/ProduitStyle.js";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/productConstants.js";
import { createReview, detailsProduct } from "../../actions/productActions.js";

function SlideTransition(props) {
  return <Slide direction='down' {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

const ProductDetails = ({ open, onClose, produit }) => {
  const { id: productId } = produit._id;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(detailsProduct(produit._id));
  }, [dispatch, produit._id, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/panier/${produit._id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(produit._id, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <Dialog
      TransitionComponent={SlideTransition}
      variant='permanant'
      open={open}
      fullScreen
    >
      <DialogTitle
        sx={{
          background: theme.palette.primary.main,
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent={"space-between"}
        >
          <Typography variant='h5'>{produit.nom}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Helmet>
          <title>{produit.nom}</title>
        </Helmet>
        <ProductDetailWrapper
          display={"flex"}
          flexDirection={matches ? "column" : "row"}
          Color={theme.palette.background.main}
        >
          <Product sx={{ mr: 4 }}>
            <ProductImage src={produit.image} />
          </Product>
          <ProductDetailInfoWrapper>
            <Typography variant='subtitle'>
              <Rating />
            </Typography>
            <Typography variant='subtitle'>
              Quantite en Stock:{produit.countInStock}
            </Typography>
            <Typography
              sx={{ lineHeight: 2 }}
              variant='h4'
              color={theme.palette.secondary.main}
            >
              {produit.nom}
            </Typography>
            <Typography variant='body'>
              {produit.description}
              {produit.description}
              {produit.description}
            </Typography>
            <Box
              sx={{
                mt: 4,
                display: {
                  xs: "flex",
                },
                flexDirection: {
                  xs: "Column",
                },
              }}
              display='flex'
              justifyContent='space-between'
            >
              {produit.countInStock > 0 && (
                <>
                  <Box
                    display='flex'
                    sx={{
                      mb: {
                        xs: "20px",
                      },
                    }}
                  >
                    <IconButton
                      sx={{
                        borderRadius: 0,
                        background: `${theme.palette.primary.main}`,
                      }}
                      onClick={() => setQty(qty - 1)}
                      disabled={qty === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      variant='h6'
                      sx={{
                        border: `1px solid ${theme.palette.secondary.main}`,
                        p: 2,
                      }}
                    >
                      {qty}
                    </Typography>
                    <IconButton
                      sx={{
                        borderRadius: 0,
                        background: `${theme.palette.primary.main}`,
                      }}
                      onClick={() => setQty(qty + 1)}
                      disabled={qty === produit.countInStock}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Button variant='contained' onClick={addToCartHandler}>
                      Ajouter au Panier
                    </Button>
                  </Box>
                </>
              )}
            </Box>

            <Box
              display='flex'
              alignItems='center'
              sx={{ mt: 4, color: Colors.light }}
            >
              <IconButton sx={{ mr: 2 }}>
                <FavoriteIcon />
              </IconButton>
              Ajouter aux souhaits
            </Box>
            <Box
              sx={{
                mt: 4,
              }}
            >
              <IconButton sx={{ mr: 2 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ mr: 2 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ mr: 2 }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;

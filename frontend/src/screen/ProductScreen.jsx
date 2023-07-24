import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Rating,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import Chargement from "../Components/Chargement";
import { Product, ProductImage } from "../Components/Produit/ProduitStyle";
import MessageBox from "../Components/MessageBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import EnTete from "../Components/EnTete";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import FlexBetween from "../Components/FlexBetween";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductScreen = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/panier/${productId}?qty=${qty}`);
  };

  const addToWishlistHandler = () => {
    navigate(`/wishlist/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, {
          rating,
          comment,
          name: userInfo.nom,
          avatar: userInfo.photoURL,
        })
      );
    } else {
      toast.warn("Veiller Choisir une Note s'il vous Plait");
    }
  };
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

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: "20px",
  });

  return (
    <>
      <EnTete title='Produit Details' />
      <Helmet>
        <title>Produit Details</title>
      </Helmet>
      {loading ? (
        <Chargement />
      ) : error ? (
        <MessageBox severity='error'>{error}</MessageBox>
      ) : (
        <>
          <Box width='95%' m='auto' mt='3%'>
            <Box
              display='grid'
              gap='8px'
              gridTemplateColumns='repeat(6, minmax(0,1fr))'
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
              }}
            >
              <Box sx={{ gridColumn: "span 1" }}>
                <Box>
                  <Box sx={{ p: 2, flexGrow: 1 }}>
                    <ImageList rowHeight={200}>
                      <ImageListItem
                        onClick={() => handleImageClick(product.image)}
                      >
                        <img src={product.image} alt={"produit"} />
                      </ImageListItem>
                      {product.photoUrl.map((item) => (
                        <ImageListItem
                          key={item.id}
                          onClick={() => handleImageClick(item)}
                        >
                          <img src={item} alt={item.title} />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  gridColumn: "span 2",
                  bgcolor: theme.palette.background.alt,
                }}
              >
                <Box>
                  {selectedImage ? (
                    <StyledBox>
                      <img src={selectedImage} alt={selectedImage.title} />
                    </StyledBox>
                  ) : (
                    <StyledBox>
                      <img src={product.image} alt={"Produit"} />
                    </StyledBox>
                  )}
                </Box>
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <ProductDetailInfoWrapper>
                  <Typography
                    sx={{ lineHeight: 2 }}
                    variant='h2'
                    color={theme.palette.secondary.main}
                  >
                    {product.nom}
                  </Typography>
                  <Stack direction='row'>
                    <Rating
                      name='text-feedback'
                      value={product.rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize='inherit'
                        />
                      }
                    />
                    <Typography variant='h4'>
                      (basee sur : {product.numReviews} avis)
                    </Typography>
                  </Stack>
                  <Box mt='20px'>
                    <Typography variant='body'>
                      {product.description}
                    </Typography>
                  </Box>
                  <Box mt='20px'>
                    <Box
                      display='grid'
                      gap='15px'
                      gridTemplateColumns='repeat(3, minmax(0,1fr))'
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 3",
                        },
                      }}
                    >
                      <Box sx={{ gridColumn: "span 1" }}>
                        <Stack direction='row' spacing={1}>
                          <Typography
                            variant='h3'
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
                          >
                            {product.solde} $
                          </Typography>
                          <Typography variant='h1'>{product.prix} $</Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ gridColumn: "span 1" }}>
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
                          {product.countInStock > 0 && (
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
                                  disabled={qty === product.countInStock}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ gridColumn: "span 1" }}>
                        <Box>
                          <Button
                            variant='contained'
                            onClick={addToCartHandler}
                            sx={{
                              height: "60px",
                            }}
                          >
                            Ajouter au Panier
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ gridColumn: "span 3" }}>
                        <FlexBetween>
                          <Box display='flex' alignItems='center'>
                            <IconButton onClick={addToWishlistHandler}>
                              <FavoriteIcon />
                            </IconButton>
                            Ajouter aux souhaits
                          </Box>
                          <Box>
                            <Stack direction='row'>
                              <Typography variant='h6'>
                                Partager sur :{" "}
                              </Typography>
                              <IconButton>
                                <FacebookIcon />
                              </IconButton>
                              <IconButton>
                                <TwitterIcon />
                              </IconButton>
                              <IconButton>
                                <InstagramIcon />
                              </IconButton>
                            </Stack>
                          </Box>
                        </FlexBetween>
                      </Box>
                    </Box>
                  </Box>
                </ProductDetailInfoWrapper>
              </Box>
            </Box>

            <Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  marginTop='50px'
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    centered
                  >
                    <Tab label='Description' {...a11yProps(0)} />
                    <Tab label='Notice' {...a11yProps(1)} />
                    <Tab label='Commentaires' {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Box>
                    <Typography variant='h3'>Details</Typography>
                    <Box mt='10px'>
                      <Typography variant='h5'>
                        {product.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt='80px'>
                    <Typography variant='h3'>Nouveaute</Typography>
                    <Box mt='10px'>
                      {product.features.map((feature) => (
                        <List
                          sx={{
                            width: "100%",
                            bgcolor: theme.palette.background.alt,
                          }}
                          aria-label='contacts'
                        >
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <StarIcon />
                              </ListItemIcon>
                              <ListItemText primary={feature} />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      ))}
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box mt='10px'>
                    <Typography variant='h3'>Notices</Typography>
                    <Box mt='10px'>
                      {product.notices.map((notice) => (
                        <List
                          sx={{
                            width: "100%",
                          }}
                        >
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <StarIcon />
                              </ListItemIcon>
                              <ListItemText primary={notice} />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      ))}
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Box>
                    <Box mt='30px'>
                      {product.reviews.length === 0 && (
                        <MessageBox severity='info'>
                          Il y a Aucun Commentaire Pour c'est Produit pour
                          l'Instant!
                        </MessageBox>
                      )}
                    </Box>
                  </Box>
                  <Box mt='30px'>
                    {product.reviews.map((review) => (
                      <Box
                        sx={{
                          display: "flex",
                          mb: 2,
                          bgcolor: theme.palette.background.alt,
                          p: 2,
                          border: "2px solid",
                          borderColor: theme.palette.secondary.main,
                        }}
                      >
                        <Avatar
                          src={review.avatar}
                          alt='review images'
                          sx={{
                            width: 70,
                            height: 70,
                            cursor: "pointer",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: "20px",
                          }}
                        >
                          <Typography
                            variant='h4'
                            sx={{
                              Color: theme.palette.secondary.main,
                            }}
                          >
                            {review.name}
                          </Typography>
                          <Rating
                            name='text-feedback'
                            value={review.rating}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize='inherit'
                              />
                            }
                          />
                          <Typography
                            variant='body2'
                            sx={{ color: "text.secondary" }}
                          >
                            {review.createdAt.substring(0, 10)}
                          </Typography>
                          <Typography variant='body1'>
                            {review.comment}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box mt='100px'>
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <Box>
                          <Typography variant='h4' textAlign='center'>
                            ECRIVEZ UN COMMENTAIRE
                          </Typography>
                        </Box>
                        <Box
                          display='grid'
                          gap='15px'
                          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                          sx={{
                            "& > div": {
                              gridColumn: isNonMobile ? undefined : "span 4",
                            },
                          }}
                        >
                          <Box sx={{ gridColumn: "span 4" }}>
                            <FormControl
                              variant='filled'
                              sx={{ m: 1, minWidth: 120 }}
                            >
                              <InputLabel id='demo-simple-select-filled-label'>
                                Notation
                              </InputLabel>
                              <Select
                                labelId='demo-simple-select-filled-label'
                                id='demo-simple-select-filled'
                                value={rating}
                                onChange={handleRatingChange}
                                sx={{
                                  width: "200px",
                                }}
                              >
                                <MenuItem value=''>
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value='1'>1- Mauvais</MenuItem>
                                <MenuItem value='2'>2- Un peu bien</MenuItem>
                                <MenuItem value='3'>3- Bien</MenuItem>
                                <MenuItem value='4'>4- Tres bien</MenuItem>
                                <MenuItem value='5'>5- Excellent</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <TextField
                            disabled
                            id='outlined-disabled'
                            label='Votre Nom'
                            defaultValue={userInfo.nom}
                            sx={{ gridColumn: "span 2" }}
                          />

                          <TextField
                            disabled
                            id='outlined-disabled'
                            label='Votre Email'
                            defaultValue={userInfo.email}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <TextField
                            fullWidth
                            type='text'
                            label='Commentaire'
                            value={comment}
                            multiline
                            rows={10}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            sx={{ gridColumn: "span 4" }}
                          />
                        </Box>
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          gap='50px'
                          mt='30px'
                        >
                          <Button
                            fullWidth
                            variant='contained'
                            sx={{
                              boxShadow: "none",
                              color: "white",
                              borderRadius: 0,
                              padding: "15px 40px",
                            }}
                            type='submit'
                          >
                            Continuer
                          </Button>
                        </Box>
                        <Box>
                          <div>
                            {loadingReviewCreate && <Chargement />}
                            {errorReviewCreate && (
                              <>
                                <MessageBox severity='info'>
                                  {errorReviewCreate}
                                </MessageBox>
                                {toast.info(errorReviewCreate)}
                              </>
                            )}
                          </div>
                        </Box>
                      </form>
                    ) : (
                      <MessageBox severity='warning'>
                        S'il vous Plait <Link to='/signin'>Connectez-Vous</Link>{" "}
                        Pour Ecrire un Commentaire
                      </MessageBox>
                    )}
                  </Box>
                </TabPanel>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductScreen;

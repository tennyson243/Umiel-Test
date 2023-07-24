import { useTheme } from "@emotion/react";
import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";

import Chargement from "../../Chargement";
import MessageBox from "../../MessageBox";
import CardProduit from "../../Produit/CardProduit";
import FlexBetween from "../../FlexBetween";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductCategories,
  listProducts,
} from "../../../actions/productActions";
import { listTopSellers } from "../../../actions/userActions";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { listPopulaireHeros } from "../../../actions/Blog/heroActions";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='slick-arrow slick-prev' onClick={onClick}>
      <i className='fa fa-angle-left'></i>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='slick-arrow slick-next' onClick={onClick}>
      <i className='fa fa-angle-right'></i>
    </div>
  );
};

const MainSaleCollection = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ProductImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "200px",
    height: "270px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = productList;
  const herosPopulaireList = useSelector((state) => state.herosPopulaireList);
  const { loading, error, herosPopulaires } = herosPopulaireList;

  console.log(herosPopulaires);
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
    dispatch(listProductCategories());
    dispatch(listPopulaireHeros());
  }, [dispatch]);

  const ProductImage2 = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "100%",
    height: "30rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "20rem",
    },
  }));
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <Box width='90%' m='auto'>
        <Box
          display='grid'
          gap='15px'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
          mt='20px'
        >
          <Box
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 1" }}
          >
            <Box>
              <Box>
                <Box
                  backgroundColor={theme.palette.primary.main}
                  color={theme.palette.secondary.main}
                  font-size='16px'
                  font-weight=' normal'
                  letter-spacing='1px'
                  padding='15px 15px 15px 50px'
                  position='relative'
                  text-transform='uppercase'
                  transition='all 0.3s ease 0s'
                >
                  <Typography variant='h6'>Browser Categories</Typography>
                </Box>
                <Box
                  border='1px solid rgba(129, 129, 129, 0.2)'
                  width='100%'
                  z-index='99'
                  backgroundColor={theme.palette.background.alt}
                >
                  {loadingCategories ? (
                    <Chargement />
                  ) : errorCategories ? (
                    <MessageBox severity='error'>{errorCategories}</MessageBox>
                  ) : (
                    <List>
                      {categories.map((c) => (
                        <ListItem disablePadding key={c}>
                          <ListItemButton
                            onClick={() => navigate(`/search/category/${c}`)}
                          >
                            <ListItemText primary={c} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 3" }}>
            <Slider {...settings2}>
              {loading ? (
                <Chargement />
              ) : error ? (
                <MessageBox variant='error'>{error}</MessageBox>
              ) : (
                herosPopulaires.map((val) => (
                  <div className='items'>
                    <div className='box shadow'>
                      <div className='images'>
                        <div className='img'>
                          <ProductImage2 src={val.cover} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </Box>
          <Box sx={{ gridColumn: "span 4" }}>
            <img src='../Images/new-product/3.jpg' alt='new product' />
          </Box>
          <Box
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 1" }}
          >
            <Box>
              <Box>
                <Box
                  backgroundColor={theme.palette.primary.main}
                  color={theme.palette.secondary.main}
                  font-size='16px'
                  font-weight=' normal'
                  letter-spacing='1px'
                  padding='15px 15px 15px 50px'
                  position='relative'
                  text-transform='uppercase'
                  transition='all 0.3s ease 0s'
                >
                  <Typography variant='h6'>Departement</Typography>
                </Box>
                <Box
                  border='1px solid rgba(129, 129, 129, 0.2)'
                  width='100%'
                  z-index='99'
                  backgroundColor={theme.palette.background.alt}
                >
                  {loadingCategories ? (
                    <Chargement />
                  ) : errorCategories ? (
                    <MessageBox severity='error'>{errorCategories}</MessageBox>
                  ) : (
                    <List>
                      {categories.map((c) => (
                        <ListItem disablePadding key={c}>
                          <ListItemButton
                            onClick={() => navigate(`/search/category/${c}`)}
                          >
                            <ListItemText primary={c} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: {
                  sm: "none",
                  xs: "none",
                },
                flexDirection: {
                  sm: "row",
                  xs: "row",
                },
              }}
            >
              <Box
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                font-size='16px'
                font-weight=' normal'
                letter-spacing='1px'
                padding='15px 15px 15px 50px'
                position='relative'
                text-transform='uppercase'
                transition='all 0.3s ease 0s'
              >
                <Typography variant='h6'>Top Sellers</Typography>
              </Box>
              <Box>
                {loadingSellers ? (
                  <Chargement />
                ) : errorSellers ? (
                  <MessageBox severity='error'>{errorSellers}</MessageBox>
                ) : (
                  <>
                    {sellers.length === 0 && (
                      <MessageBox>Aucun Vender a ete trouver</MessageBox>
                    )}
                    <Carousel showArrows autoPlay showThumbs={false}>
                      {sellers.map((seller) => (
                        <Box
                          key={seller._id}
                          onClick={() => navigate(`/seller/${seller._id}`)}
                        >
                          <ProductImage src={seller.seller.logo} />
                          <Typography variant='h5'>
                            {seller.seller.nom}
                          </Typography>
                        </Box>
                      ))}
                    </Carousel>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 3" }}>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(3, minmax(0, 1fr))'
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 3",
                },
              }}
            >
              <Box
                border='1px solid rgba(129, 129, 129, 0.2)'
                width='100%'
                z-index='99'
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                borderTop=' 4px solid red '
                textTransform='uppercase'
                sx={{ gridColumn: "span 3" }}
              >
                <List>
                  <FlexBetween>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Latest' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Best Sale' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='top rated' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='On Sold' />
                      </ListItemButton>
                    </ListItem>
                  </FlexBetween>
                </List>
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <Box
                  display='grid'
                  gap='15px'
                  gridTemplateColumns='repeat(3, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 3",
                    },
                  }}
                >
                  <Box sx={{ gridColumn: "span 3" }}>
                    {loadingProduct ? (
                      <Chargement />
                    ) : errorProduct ? (
                      <MessageBox severity='error'>{errorProduct}</MessageBox>
                    ) : (
                      <>
                        <Slider {...settings}>
                          {products.map((product) => (
                            <Box key={product._id}>
                              <CardProduit product={product}></CardProduit>
                            </Box>
                          ))}
                        </Slider>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 4" }}>
            <img src='../Images/new-product/6.jpg' alt='new product' />
          </Box>
          <Box
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 1" }}
          >
            <Box>
              <Box>
                <Box
                  backgroundColor={theme.palette.primary.main}
                  color={theme.palette.secondary.main}
                  font-size='16px'
                  font-weight=' normal'
                  letter-spacing='1px'
                  padding='15px 15px 15px 50px'
                  position='relative'
                  text-transform='uppercase'
                  transition='all 0.3s ease 0s'
                >
                  <Typography severity='h6'>Departement</Typography>
                </Box>
                <Box
                  border='1px solid rgba(129, 129, 129, 0.2)'
                  width='100%'
                  z-index='99'
                  backgroundColor={theme.palette.background.alt}
                >
                  {loadingCategories ? (
                    <Chargement />
                  ) : errorCategories ? (
                    <MessageBox severity='error'>{errorCategories}</MessageBox>
                  ) : (
                    <List>
                      {categories.map((c) => (
                        <ListItem disablePadding key={c}>
                          <ListItemButton
                            onClick={() => navigate(`/search/category/${c}`)}
                          >
                            <ListItemText primary={c} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: {
                  sm: "none",
                  xs: "none",
                },
                flexDirection: {
                  sm: "row",
                  xs: "row",
                },
              }}
            >
              <Box
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                font-size='16px'
                font-weight=' normal'
                letter-spacing='1px'
                padding='15px 15px 15px 50px'
                position='relative'
                text-transform='uppercase'
                transition='all 0.3s ease 0s'
              >
                <Typography variant='h6'>Top Sellers</Typography>
              </Box>
              <Box>
                {loadingSellers ? (
                  <Chargement />
                ) : errorSellers ? (
                  <MessageBox severity='error'>{errorSellers}</MessageBox>
                ) : (
                  <>
                    {sellers.length === 0 && (
                      <MessageBox>Aucun Vender a ete trouver</MessageBox>
                    )}
                    <Carousel showArrows autoPlay showThumbs={false}>
                      {sellers.map((seller) => (
                        <Box
                          key={seller._id}
                          onClick={() => navigate(`/seller/${seller._id}`)}
                        >
                          <ProductImage src={seller.seller.logo} />
                          <Typography variant='h5'>
                            {seller.seller.nom}
                          </Typography>
                        </Box>
                      ))}
                    </Carousel>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 3" }}>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(3, minmax(0, 1fr))'
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 3",
                },
              }}
            >
              <Box
                border='1px solid rgba(129, 129, 129, 0.2)'
                width='100%'
                z-index='99'
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                borderTop=' 4px solid red '
                textTransform='uppercase'
                sx={{ gridColumn: "span 3" }}
              >
                <List>
                  <FlexBetween>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Latest' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Best Sale' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='top rated' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='On Sold' />
                      </ListItemButton>
                    </ListItem>
                  </FlexBetween>
                </List>
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <Box
                  display='grid'
                  gap='15px'
                  gridTemplateColumns='repeat(3, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 3",
                    },
                  }}
                >
                  <Box sx={{ gridColumn: "span 3" }}>
                    {loadingProduct ? (
                      <Chargement />
                    ) : errorProduct ? (
                      <MessageBox severity='error'>{errorProduct}</MessageBox>
                    ) : (
                      <>
                        <Slider {...settings}>
                          {products.map((product) => (
                            <Box key={product._id}>
                              <CardProduit product={product}></CardProduit>
                            </Box>
                          ))}
                        </Slider>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 4" }}>
            <img src='../Images/new-product/7.jpg' alt='new product' />
          </Box>
          <Box
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 1" }}
          >
            <Box>
              <Box>
                <Box
                  backgroundColor={theme.palette.primary.main}
                  color={theme.palette.secondary.main}
                  font-size='16px'
                  font-weight=' normal'
                  letter-spacing='1px'
                  padding='15px 15px 15px 50px'
                  position='relative'
                  text-transform='uppercase'
                  transition='all 0.3s ease 0s'
                >
                  <Typography severity='h6'>Departement</Typography>
                </Box>
                <Box
                  border='1px solid rgba(129, 129, 129, 0.2)'
                  width='100%'
                  z-index='99'
                  backgroundColor={theme.palette.background.alt}
                >
                  {loadingCategories ? (
                    <Chargement />
                  ) : errorCategories ? (
                    <MessageBox severity='error'>{errorCategories}</MessageBox>
                  ) : (
                    <List>
                      {categories.map((c) => (
                        <ListItem disablePadding key={c}>
                          <ListItemButton
                            onClick={() => navigate(`/search/catgeory/${c}`)}
                          >
                            <ListItemText primary={c} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: {
                  sm: "none",
                  xs: "none",
                },
                flexDirection: {
                  sm: "row",
                  xs: "row",
                },
              }}
            >
              <Box
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                font-size='16px'
                font-weight=' normal'
                letter-spacing='1px'
                padding='15px 15px 15px 50px'
                position='relative'
                text-transform='uppercase'
                transition='all 0.3s ease 0s'
              >
                <Typography variant='h6'>Top Sellers</Typography>
              </Box>
              <Box>
                {loadingSellers ? (
                  <Chargement />
                ) : errorSellers ? (
                  <MessageBox severity='error'>{errorSellers}</MessageBox>
                ) : (
                  <>
                    {sellers.length === 0 && (
                      <MessageBox>Aucun Vender a ete trouver</MessageBox>
                    )}
                    <Carousel showArrows autoPlay showThumbs={false}>
                      {sellers.map((seller) => (
                        <Box
                          key={seller._id}
                          onClick={() => navigate(`/seller/${seller._id}`)}
                        >
                          <ProductImage src={seller.seller.logo} />
                          <Typography variant='h5'>
                            {seller.seller.nom}
                          </Typography>
                        </Box>
                      ))}
                    </Carousel>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: "span 3" }}>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(3, minmax(0, 1fr))'
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 3",
                },
              }}
            >
              <Box
                border='1px solid rgba(129, 129, 129, 0.2)'
                width='100%'
                z-index='99'
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                borderTop=' 4px solid red '
                textTransform='uppercase'
                sx={{ gridColumn: "span 3" }}
              >
                <List>
                  <FlexBetween>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Latest' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='Best Sale' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='top rated' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary='On Sold' />
                      </ListItemButton>
                    </ListItem>
                  </FlexBetween>
                </List>
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <Box
                  display='grid'
                  gap='15px'
                  gridTemplateColumns='repeat(3, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 3",
                    },
                  }}
                >
                  <Box sx={{ gridColumn: "span 3" }}>
                    {loadingProduct ? (
                      <Chargement />
                    ) : errorProduct ? (
                      <MessageBox severity='error'>{errorProduct}</MessageBox>
                    ) : (
                      <>
                        <Slider {...settings}>
                          {products.map((product) => (
                            <Box key={product._id}>
                              <CardProduit product={product}></CardProduit>
                            </Box>
                          ))}
                        </Slider>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainSaleCollection;

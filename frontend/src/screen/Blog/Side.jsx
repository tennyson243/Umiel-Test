import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGaleries } from "../../actions/Blog/galerieActions";
import Chargement from "../../Components/Chargement";
import Healding from "../../Components/Healding";
import MessageBox from "../../Components/MessageBox";
import SocialMediaScreen from "./SocialMediaScreen";
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Tpost from "../../Components/Blog/Tpost/Tpost";
import { FooterTitle, SubscribeTf } from "../../Components/Footer/FooterStyle";
import { Button, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { listPopulaireCategories } from "../../actions/Blog/populaireAction";
import { useNavigate } from "react-router-dom";

const Side = () => {
  const galeriesList = useSelector((state) => state.galeriesList);
  const { loading, error, galeries } = galeriesList;
  const navigate = useNavigate();
  const populaireCategoryList = useSelector(
    (state) => state.populaireCategoryList
  );
  const {
    loading: populaireLoading,
    errorPopulaire,
    categories,
  } = populaireCategoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGaleries());
    dispatch(listPopulaireCategories());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Healding title='Rester Connecter' />
      <SocialMediaScreen />

      <Healding title='Abonner Vous' />

      <section className='subscribe'>
        <FooterTitle variant='body1'>Abonner vous Newsletter</FooterTitle>
        <Stack>
          <SubscribeTf
            color='primary'
            label='Email address'
            variant='standard'
          />
          <Button
            startIcon={<SendIcon />}
            sx={{ mt: 4, mb: 4 }}
            variant='contained'
          >
            Abonner-Vous
          </Button>
        </Stack>
      </section>

      <section className='banner'>
        <img src='../images/sidebar-banner-new.jpg' alt='' />
      </section>

      <Tpost />

      <section className='catgorys'>
        <Healding title='Categorie' />
        {populaireLoading ? (
          <Chargement />
        ) : errorPopulaire ? (
          <MessageBox severity='error'>{errorPopulaire}</MessageBox>
        ) : (
          categories.map((val) => {
            return (
              <div className='category category1'>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate(`/blogsearch/catgeory/${val}`)}
                >
                  {val}
                </Typography>
              </div>
            );
          })
        )}
      </section>

      <section className='gallery'>
        <Healding title='Gallery' />
        <Carousel showArrows autoPlay showThumbs={false}>
          {loading ? (
            <Chargement />
          ) : error ? (
            <MessageBox severity='error'>{error}</MessageBox>
          ) : (
            galeries.map((val) => (
              <div className='img'>
                <img src={val.cover} alt='' />
              </div>
            ))
          )}
        </Carousel>
      </section>
    </>
  );
};

export default Side;

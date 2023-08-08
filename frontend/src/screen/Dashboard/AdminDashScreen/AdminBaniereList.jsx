import React, { useEffect, useState } from "react";
import {
  createBanner,
  deleteBanner,
  listBanners,
} from "../../../actions/bannerActions";
import {
  BANNER_CREATE_RESET,
  BANNER_DELETE_RESET,
} from "../../../constants/bannerConstant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import FlexBetween from "../../../Components/FlexBetween";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";
import Header from "../../../Components/Header";
import { Helmet } from "react-helmet-async";

const AdminBaniereList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const bannersList = useSelector((state) => state.bannersList);
  const { loading, error, banners } = bannersList;
  const bannerCreate = useSelector((state) => state.bannerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    banner: createdBanner,
  } = bannerCreate;

  const bannerDelete = useSelector((state) => state.bannerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bannerDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: BANNER_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: BANNER_DELETE_RESET });
    }
    dispatch(listBanners());
  }, [
    createdBanner,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (banner) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteBanner(banner._id));
    }
  };
  const createHandler = () => {
    dispatch(createBanner());
  };
  return (
    <>
      <Helmet>
        <title>Le carrouselle principal</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header
          title="CAROUSSELLE"
          subtitle="Liste des donnees pour le carousselle principale"
        />
        {loadingDelete && <Chargement />}
        {errorDelete && <MessageBox severity="error">{errorDelete}</MessageBox>}

        {loadingCreate && <Chargement />}
        {errorCreate && <MessageBox severity="error">{errorCreate}</MessageBox>}

        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <Box>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                mt="15px"
                backgroundColor={theme.palette.background.alt}
                sx={{ gridColumn: "span 4" }}
                p="20px"
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={createHandler}
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.background.alt,
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Ajouter une nouvelle Banniere
                </Button>
              </Box>
            </Box>
            <Box
              mt="20px"
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              justifyContent="space-between"
              rowGap="20px"
              columnGap="1.33%"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {banners.map((banner) => (
                <>
                  <Card
                    sx={{
                      backgroundImage: "none",
                      backgroundColor: theme.palette.background.alt,
                      borderRadius: "0.55rem",
                    }}
                    key={banner._id}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color={theme.palette.secondary[700]}
                        gutterBottom
                      >
                        {banner.catgeory}
                      </Typography>
                      <FlexBetween>
                        <Typography variant="h5" component="div">
                          {banner.title}
                        </Typography>
                        <Avatar
                          src={banner.cover}
                          sx={{
                            width: 70,
                            height: 70,
                          }}
                        />
                      </FlexBetween>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        Voir Plus
                      </Button>
                    </CardActions>
                    <Collapse
                      in={isExpanded}
                      timeout="auto"
                      unmountOnExit
                      sx={{
                        color: theme.palette.neutral[300],
                      }}
                    >
                      <CardContent>
                        <Typography>id: {banner._id}</Typography>

                        <FlexBetween
                          sx={{
                            backgroundColor: theme.palette.primary[700],
                            borderRadius: "0.35rem",
                            p: "0.35rem",
                          }}
                        >
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() =>
                              navigate(`/banieres/${banner._id}/edit`)
                            }
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => deleteHandler(banner)}
                          >
                            Supprimer
                          </Button>
                        </FlexBetween>
                      </CardContent>
                    </Collapse>
                  </Card>
                </>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AdminBaniereList;

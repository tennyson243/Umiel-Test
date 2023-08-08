import React, { useEffect, useState } from "react";
import {
  createdGalerie,
  deleteGalerie,
  listGaleries,
} from "../../../actions/Blog/galerieActions";
import {
  GALERIE_CREATE_RESET,
  GALERIE_DELETE_RESET,
} from "../../../constants/Blog/galerieConstants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import FlexBetween from "../../../Components/FlexBetween";
import MessageBox from "../../../Components/MessageBox";
import Chargement from "../../../Components/Chargement";
import Header from "../../../Components/Header";
import { Helmet } from "react-helmet-async";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdminGalerieList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const galeriesList = useSelector((state) => state.galeriesList);
  const { loading, error, galeries } = galeriesList;
  const galerieCreate = useSelector((state) => state.galerieCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    galerie: galerieCreated,
  } = galerieCreate;

  const galerieDelete = useSelector((state) => state.galerieDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = galerieDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: GALERIE_CREATE_RESET });
      navigate(`/galeries/${galerieCreated._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: GALERIE_DELETE_RESET });
    }
    dispatch(listGaleries());
  }, [
    galerieCreated,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (galerie) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteGalerie(galerie._id));
    }
  };
  const createHandler = () => {
    dispatch(createdGalerie());
  };
  return (
    <>
      <Helmet>
        <title>La Galerie</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="GALERIE" subtitle="Liste des photos dans la Galerie" />
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
                  Ajouter une nouvelle photo dans la Galerie
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
              {galeries.map((galerie) => (
                <>
                  <Card
                    sx={{
                      backgroundImage: "none",
                      backgroundColor: theme.palette.background.alt,
                      borderRadius: "0.55rem",
                    }}
                    key={galerie._id}
                  >
                    <CardHeader
                      title={galerie.title}
                      subheader={new Date(galerie.createdAt).toLocaleDateString(
                        "fr-FR",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    />

                    <CardMedia
                      component="img"
                      height="194"
                      image={galerie.cover}
                      alt="Paella dish"
                    />

                    <CardActions>
                      <IconButton
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
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
                        <Typography>id: {galerie._id}</Typography>

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
                              navigate(`/galeries/${galerie._id}/edit`)
                            }
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => deleteHandler(galerie)}
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

export default AdminGalerieList;

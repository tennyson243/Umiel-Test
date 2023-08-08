import { useTheme } from "@emotion/react";
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
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createHero,
  deleteHero,
  listHeros,
} from "../../../actions/Blog/heroActions";
import Chargement from "../../../Components/Chargement";
import FlexBetween from "../../../Components/FlexBetween";
import MessageBox from "../../../Components/MessageBox";
import {
  HERO_CREATE_RESET,
  HERO_DELETE_RESET,
} from "../../../constants/Blog/heroConstants";
import Header from "../../../Components/Header";

const HeroDashScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const herosList = useSelector((state) => state.herosList);
  const { loading, error, heros } = herosList;
  const heroCreate = useSelector((state) => state.heroCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    hero: createdHero,
  } = heroCreate;

  const heroDelete = useSelector((state) => state.heroDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = heroDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: HERO_CREATE_RESET });
      navigate(`/remedes/${createdHero._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: HERO_DELETE_RESET });
    }
    dispatch(listHeros());
  }, [
    createdHero,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (hero) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteHero(hero._id));
    }
  };
  const createHandler = () => {
    dispatch(createHero());
  };
  return (
    <>
      <Helmet>
        <title>Les remedes naturels</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="LES REMEDES" subtitle="La liste des remedes naturels" />
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
                  Ajouter un remede naturel
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
              {heros.map((hero) => (
                <>
                  <Card
                    sx={{
                      backgroundImage: "none",
                      backgroundColor: theme.palette.background.alt,
                      borderRadius: "0.55rem",
                    }}
                    key={hero._id}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color={theme.palette.secondary[700]}
                        gutterBottom
                      >
                        {hero.sousCategorie}
                      </Typography>
                      <FlexBetween>
                        <Typography variant="h5" component="div">
                          {hero.title}
                        </Typography>
                        <Avatar
                          src={hero.cover}
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
                        <Typography>id: {hero._id}</Typography>

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
                            onClick={() => navigate(`/heros/${hero._id}/edit`)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => deleteHandler(hero)}
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

export default HeroDashScreen;

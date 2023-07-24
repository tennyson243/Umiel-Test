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
  createLifestyle,
  deleteLifestyle,
  listLifestyles,
} from "../../../actions/Blog/lifeStyleActions";
import Chargement from "../../../Components/Chargement";
import EnTete from "../../../Components/EnTete";
import FlexBetween from "../../../Components/FlexBetween";
import MessageBox from "../../../Components/MessageBox";
import {
  LIFESTYLE_CREATE_RESET,
  LIFESTYLE_DELETE_RESET,
} from "../../../constants/Blog/lifeStyleConstants";
import Header from "../../../Components/Header";

const LifestyleDashScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const lifestylesList = useSelector((state) => state.lifestylesList);
  const { loading, error, lifestyles } = lifestylesList;
  const lifestyleCreate = useSelector((state) => state.lifestyleCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    lifestyle: createdLifestyle,
  } = lifestyleCreate;

  const lifestyleDelete = useSelector((state) => state.lifestyleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = lifestyleDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: LIFESTYLE_CREATE_RESET });
      navigate(`/lifestyles/${createdLifestyle._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: LIFESTYLE_DELETE_RESET });
    }
    dispatch(listLifestyles());
  }, [
    createdLifestyle,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (lifestyle) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteLifestyle(lifestyle._id));
    }
  };
  const createHandler = () => {
    dispatch(createLifestyle());
  };
  return (
    <>
      <Helmet>
        <title>Les articles Santé naturelle'</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header
          title="SANTE"
          subtitle="La liste des articles sur la Santé naturelle"
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
                  Ajouter un article sante naturelle
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
              {lifestyles.map((lifestyle) => (
                <>
                  <Card
                    sx={{
                      backgroundImage: "none",
                      backgroundColor: theme.palette.background.alt,
                      borderRadius: "0.55rem",
                    }}
                    key={lifestyle._id}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color={theme.palette.secondary[700]}
                        gutterBottom
                      >
                        {lifestyle.sousCategorie}
                      </Typography>
                      <FlexBetween>
                        <Typography variant="h5" component="div">
                          {lifestyle.title}
                        </Typography>
                        <Avatar
                          src={lifestyle.cover}
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
                        <Typography>id: {lifestyle._id}</Typography>

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
                              navigate(`/lifestyles/${lifestyle._id}/edit`)
                            }
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => deleteHandler(lifestyle)}
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

export default LifestyleDashScreen;

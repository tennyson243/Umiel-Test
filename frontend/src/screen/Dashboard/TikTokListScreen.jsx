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
import Header from "../../Components/Header";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TIKTOK_CREATE_RESET,
  TIKTOK_DELETE_RESET,
} from "../../constants/Blog/tiktokConstants";
import {
  createTiktok,
  deleteTiktok,
  listTiktoks,
} from "../../actions/Blog/tiktokActions";
import FlexBetween from "../../Components/FlexBetween";

const TikTokListScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const tiktoksList = useSelector((state) => state.tiktoksList);
  const { loading, error, tiktoks } = tiktoksList;
  const tiktokCreate = useSelector((state) => state.tiktokCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    tiktok: createdTiktok,
  } = tiktokCreate;

  const tiktokDelete = useSelector((state) => state.tiktokDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tiktokDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TIKTOK_CREATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: TIKTOK_DELETE_RESET });
    }
    dispatch(listTiktoks());
  }, [
    createdTiktok,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (tiktok) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteTiktok(tiktok._id));
    }
  };
  const createHandler = () => {
    dispatch(createTiktok());
  };
  return (
    <>
      <>
        <Helmet>
          <title>Le Tiktok post</title>
        </Helmet>

        <Box m="1.5rem 2.5rem">
          <Header
            title="TIKTOK POST"
            subtitle="Liste des publications TikTok"
          />
          {loadingDelete && <Chargement />}
          {errorDelete && (
            <MessageBox severity="error">{errorDelete}</MessageBox>
          )}

          {loadingCreate && <Chargement />}
          {errorCreate && (
            <MessageBox severity="error">{errorCreate}</MessageBox>
          )}

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
                    Ajouter un tiktok post
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
                {tiktoks.map((tiktok) => (
                  <>
                    <Card
                      sx={{
                        backgroundImage: "none",
                        backgroundColor: theme.palette.background.alt,
                        borderRadius: "0.55rem",
                      }}
                      key={tiktok._id}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color={theme.palette.secondary[700]}
                          gutterBottom
                        >
                          {tiktok.catgeory}
                        </Typography>
                        <FlexBetween>
                          <Typography variant="h5" component="div">
                            {tiktok.title}
                          </Typography>
                          <Avatar
                            src={tiktok.cover}
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
                          <Typography>id: {tiktok._id}</Typography>

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
                                navigate(`/tiktoks/${tiktok._id}/edit`)
                              }
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="primary"
                              size="small"
                              onClick={() => deleteHandler(tiktok)}
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
    </>
  );
};

export default TikTokListScreen;

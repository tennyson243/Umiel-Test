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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  APITHERAPIE_CREATE_RESET,
  APITHERAPIE_DELETE_RESET,
} from "../../../constants/Blog/ApitherapieConstant";
import {
  createApitherapie,
  deleteApitherapie,
  listApitherapie,
} from "../../../actions/Blog/apitherapieActions";
import FlexBetween from "../../../Components/FlexBetween";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";
import Header from "../../../Components/Header";
import { Helmet } from "react-helmet-async";

const AdminApitherapieList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const apitherapiesList = useSelector((state) => state.apitherapiesList);
  const { loading, error, apitherapies } = apitherapiesList;
  const apitherapieCreate = useSelector((state) => state.apitherapieCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    apitherapie: createdApitherapie,
  } = apitherapieCreate;

  const apitherapieDelete = useSelector((state) => state.apitherapieDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = apitherapieDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: APITHERAPIE_CREATE_RESET });
      navigate(`/apitherapie/${createdApitherapie._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: APITHERAPIE_DELETE_RESET });
    }
    dispatch(listApitherapie());
  }, [
    createdApitherapie,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (apitherapie) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteApitherapie(apitherapie._id));
    }
  };
  const createHandler = () => {
    dispatch(createApitherapie());
  };
  return (
    <>
      <>
        <Helmet>
          <title>Les articles Apitherapie</title>
        </Helmet>
        <Box m="1.5rem 2.5rem">
          <Header
            title="APITHERAPIE"
            subtitle="La liste des articles sur l'Apitherapie"
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
                    Ajouter un article Apitherapie
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
                {apitherapies.map((apitherapie) => (
                  <>
                    <Card
                      sx={{
                        backgroundImage: "none",
                        backgroundColor: theme.palette.background.alt,
                        borderRadius: "0.55rem",
                      }}
                      key={apitherapie._id}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color={theme.palette.secondary[700]}
                          gutterBottom
                        >
                          {apitherapie.sousCategorie}
                        </Typography>
                        <FlexBetween>
                          <Typography variant="h5" component="div">
                            {apitherapie.title}
                          </Typography>
                          <Avatar
                            src={apitherapie.cover}
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
                          <Typography>id: {apitherapie._id}</Typography>

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
                                navigate(`/apitherapie/${apitherapie._id}/edit`)
                              }
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="primary"
                              size="small"
                              onClick={() => deleteHandler(apitherapie)}
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

export default AdminApitherapieList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  detailsGalerieModif,
  updateGalerie,
} from "../../../actions/Blog/galerieActions";
import { GALERIE_UPDATE_RESET } from "../../../constants/Blog/galerieConstants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import MessageBox from "../../../Components/MessageBox";
import Chargement from "../../../Components/Chargement";
import Header from "../../../Components/Header";
import { Helmet } from "react-helmet-async";

const AdminModifierGalerie = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: galerieId } = params;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const galerieDetails = useSelector((state) => state.galerieDetails);
  const { loading, error, galerie } = galerieDetails;
  const galerieUpdate = useSelector((state) => state.galerieUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = galerieUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      navigate("/Galeries");
    }
    if (!galerie || galerie._id !== galerieId || successUpdate) {
      dispatch({ type: GALERIE_UPDATE_RESET });
      dispatch(detailsGalerieModif(galerieId));
    } else {
      setCover(galerie.cover);
      setTitle(galerie.title);
      setAuthor(galerie.author);
    }
  }, [galerie, dispatch, galerieId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateGalerie({
        _id: galerieId,
        cover,
        title,
        author,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const uploadFileHandler = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setCover(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    } else {
      // gérer le cas où aucun fichier n'a été sélectionné
    }
  };
  return (
    <>
      <Helmet>
        <title>Modifier un photo</title>
      </Helmet>

      {loadingUpdate && <Chargement />}
      {errorUpdate && <MessageBox severity="error">{errorUpdate}</MessageBox>}
      {loading ? (
        <Chargement />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <Box m="1.5rem 2.5rem">
            <Header
              title="GALERIE MODIFICATION"
              subtitle="Modifier un poste galerie"
            />
            <Typography
              variant="h4"
              textAlign="center"
              paddingTop="20px"
              paddingBottom="20px"
            >
              Modifier la photo: {galerieId}
            </Typography>
            <form onSubmit={submitHandler}>
              <Box>
                <Box>
                  <Box
                    display="grid"
                    gap="15px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <Box sx={{ gridColumn: "span 4" }}>
                      <Box
                        display="grid"
                        gap="15px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          type="text"
                          label="Titre"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Nom de l'auteur"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ gridColumn: "span 4" }}>
                      <Box
                        mt="10px"
                        backgroundColor={theme.palette.background.alt}
                      >
                        <Box
                          textAlign={"center"}
                          backgroundColor={theme.palette.primary.main}
                          p="15px"
                        >
                          <Typography varaint="h3" textTransform={"uppercase"}>
                            Photo du premier Plan
                          </Typography>
                        </Box>
                        <Box p="20px">
                          <img
                            src={cover}
                            style={{ with: "300px", height: "500px" }}
                            alt="illustration"
                          />
                        </Box>
                        <Box>
                          <TextField
                            fullWidth
                            type="file"
                            onChange={uploadFileHandler}
                          />
                          {loadingUpload && <Chargement />}
                          {errorUpload && (
                            <MessageBox severity="error">
                              {errorUpload}
                            </MessageBox>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  mt: "1.4rem",
                }}
                type="submit"
              >
                Modifier
              </Button>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default AdminModifierGalerie;

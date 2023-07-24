import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import axios from "axios";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const ProfilScreen = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [nom, setName] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [influenceurName, setInfluenceurName] = useState("");
  const [influenceurLogo, setInfluenceurLogo] = useState("");
  const [influenceurDescription, setInfluenceurDescription] = useState("");
  const [membreName, setMembreName] = useState("");
  const [membreCover, setMembreCover] = useState("");
  const [membreAdress, setMembreAdress] = useState("");
  const [membrePoste, setMembrePoste] = useState("");
  const [membreIcons, setMembreIcons] = useState([]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, utilisateur } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!utilisateur) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(utilisateur.nom);
      setEmail(utilisateur.email);
      setTelephone(utilisateur.telephone);
      setPhotoURL(utilisateur.photoURL);
      if (utilisateur.seller) {
        setSellerName(utilisateur.seller.nom);
        setSellerLogo(utilisateur.seller.logo);
        setSellerDescription(utilisateur.seller.description);
      }
      if (utilisateur.influenceur) {
        setInfluenceurName(utilisateur.influenceur.nom);
        setInfluenceurLogo(utilisateur.influenceur.photo);
        setInfluenceurDescription(utilisateur.influenceur.description);
      }
      if (utilisateur.membre) {
        setMembreName(utilisateur.membre.name);
        setMembreCover(utilisateur.membre.cover);
        setMembreAdress(utilisateur.membre.address);
        setMembrePoste(utilisateur.membre.poste);
        setMembreIcons(utilisateur.membre.icons);
      }
    }
  }, [dispatch, userInfo._id, utilisateur]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (motdepasse !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: utilisateur._id,
          nom,
          email,
          telephone,
          photoURL,
          motdepasse,
          sellerName,
          sellerLogo,
          sellerDescription,
          influenceurName,
          influenceurLogo,
          influenceurDescription,
          membreName,
          membreCover,
          membrePoste,
          membreAdress,
          membreIcons,
        })
      );
    }
  };

  useEffect(() => {
    if (successUpdate) {
      navigate("/profile");
    }
  }, [successUpdate, navigate]);

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
        setPhotoURL(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    } else {
      // gérer le cas où aucun fichier n'a été sélectionné
    }
  };

  const uploadFileHandlerLogo = async (e) => {
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
        setSellerLogo(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    } else {
      // gérer le cas où aucun fichier n'a été sélectionné
    }
  };

  const uploadFileHandlerInfluenceur = async (e) => {
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
        setInfluenceurLogo(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    } else {
      // gérer le cas où aucun fichier n'a été sélectionné
    }
  };

  const uploadFileHandlerMembre = async (e) => {
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
        setMembreCover(data);
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
      <div>
        <Helmet>
          <title>Modifier votre compte</title>
        </Helmet>

        <Box m="1.5rem 2.5rem">
          <Header
            title="VOTRE PROFIL"
            subtitle="Gerer votre Profile Utilisateur"
          />

          <Grid>
            <form onSubmit={submitHandler}>
              {loading ? (
                <Chargement />
              ) : error ? (
                <>
                  <MessageBox severity="error">{error}</MessageBox>
                  {toast.error(error)}
                </>
              ) : (
                <>
                  {loadingUpdate && <Chargement />}
                  {errorUpdate && (
                    <>
                      <MessageBox severity="error">{errorUpdate}</MessageBox>
                      {toast.error(errorUpdate)}
                    </>
                  )}
                  {successUpdate && (
                    <>
                      <MessageBox severity="success">
                        Profile Mise a jour avec Succes
                      </MessageBox>
                      {toast.done("Profile Mise a jour Avec Success")}
                    </>
                  )}
                  <Grid
                    display="grid"
                    gap="15px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <Box
                      mt="10px"
                      backgroundColor={theme.palette.background.alt}
                      sx={{ gridColumn: "span 2" }}
                    >
                      <Box
                        textAlign={"center"}
                        backgroundColor={theme.palette.primary.main}
                        p="15px"
                      >
                        <Typography varaint="h3" textTransform={"uppercase"}>
                          Modifier votre Profil Utilisateur
                        </Typography>
                      </Box>
                      <Box p="20px">
                        <Grid
                          display="grid"
                          gap="15px"
                          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                          sx={{
                            "& > div": {
                              gridColumn: isNonMobile ? undefined : "span 4",
                            },
                          }}
                        >
                          <Box sx={{ gridColumn: "span 1" }}>
                            <TextField
                              placeholder="Entrer votre Nom"
                              fullWidth
                              label="Nom"
                              required
                              value={nom}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Box>

                          <Box sx={{ gridColumn: "span 1" }}>
                            <label htmlFor="profilePhoto">
                              <input
                                accept="image/*"
                                id="profilePhoto"
                                type="file"
                                style={{ display: "none" }}
                                onChange={uploadFileHandler}
                              />
                              <Avatar
                                src={photoURL}
                                sx={{
                                  width: 50,
                                  height: 50,
                                  cursor: "pointer",
                                }}
                              />
                            </label>
                          </Box>
                          <Box sx={{ gridColumn: "span 2" }}>
                            {loadingUpload && <Chargement />}
                            {errorUpload && (
                              <>
                                <MessageBox severity="error">
                                  {errorUpload}
                                </MessageBox>
                                {toast.error(errorUpload)}
                              </>
                            )}
                          </Box>
                          <Box sx={{ gridColumn: "span 2" }}>
                            <TextField
                              value={telephone}
                              placeholder="Entrer votre numero de Telephone"
                              fullWidth
                              label="Numero de Telephone"
                              required
                              onChange={(e) => setTelephone(e.target.value)}
                            />
                          </Box>

                          <Box sx={{ gridColumn: "span 2" }}>
                            <TextField
                              value={email}
                              placeholder="Entrer votre email"
                              fullWidth
                              label="Email"
                              required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Box>
                          <Box sx={{ gridColumn: "span 2" }}>
                            <TextField
                              type="password"
                              placeholder="Entrer un Mot de Passe"
                              fullWidth
                              label="Mot de Passe"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Box>
                          <Box sx={{ gridColumn: "span 2" }}>
                            <TextField
                              type="password"
                              placeholder="Confirmer votre Mot de Passe"
                              fullWidth
                              label="Confirmation MotdePasse"
                              required
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </Box>
                        </Grid>
                      </Box>
                    </Box>

                    {utilisateur.isSeller && (
                      <>
                        <Box
                          mt="10px"
                          backgroundColor={theme.palette.background.alt}
                          sx={{ gridColumn: "span 2" }}
                        >
                          <Box
                            textAlign={"center"}
                            backgroundColor={theme.palette.primary.main}
                            p="15px"
                          >
                            <Typography
                              varaint="h3"
                              textTransform={"uppercase"}
                            >
                              Modifier votre Profil de Vendeur
                            </Typography>
                          </Box>
                          <Box p="20px">
                            <Stack spacing={2}>
                              <TextField
                                placeholder="Entrer votre Nom de vendeur"
                                fullWidth
                                required
                                label="Nom"
                                value={sellerName}
                                onChange={(e) => setSellerName(e.target.value)}
                              />
                              <Box sx={{ gridColumn: "span 1" }}>
                                <label htmlFor="SellerLogog">
                                  <input
                                    accept="image/*"
                                    id="sellerLogo"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={uploadFileHandlerLogo}
                                  />
                                  <Avatar
                                    src={sellerLogo}
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      cursor: "pointer",
                                    }}
                                  />
                                </label>
                              </Box>
                              <Box sx={{ gridColumn: "span 2" }}>
                                {loadingUpload && <Chargement />}
                                {errorUpload && (
                                  <>
                                    <MessageBox severity="error">
                                      {errorUpload}
                                    </MessageBox>
                                    {toast.error(errorUpload)}
                                  </>
                                )}
                              </Box>

                              <TextField
                                placeholder="Entrer votre Description"
                                fullWidth
                                required
                                label="Description"
                                value={sellerDescription}
                                onChange={(e) =>
                                  setSellerDescription(e.target.value)
                                }
                              />
                            </Stack>
                          </Box>
                        </Box>
                      </>
                    )}
                    {utilisateur.isInfluenceur && (
                      <>
                        <Box
                          mt="10px"
                          backgroundColor={theme.palette.background.alt}
                          sx={{ gridColumn: "span 2" }}
                        >
                          <Box
                            textAlign={"center"}
                            backgroundColor={theme.palette.primary.main}
                            p="15px"
                          >
                            <Typography
                              varaint="h3"
                              textTransform={"uppercase"}
                            >
                              Modifier votre Profil d'Influenceur
                            </Typography>
                          </Box>
                          <Box p="20px">
                            <Stack spacing={2}>
                              <TextField
                                placeholder="Entrer votre Nom Influenceur"
                                fullWidth
                                label="Nom"
                                required
                                value={influenceurName}
                                onChange={(e) =>
                                  setInfluenceurName(e.target.value)
                                }
                              />
                              <Box sx={{ gridColumn: "span 1" }}>
                                <label htmlFor="influenceurLogo">
                                  <input
                                    accept="image/*"
                                    id="influenceurLogo"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={uploadFileHandlerInfluenceur}
                                  />
                                  <Avatar
                                    src={influenceurLogo}
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      cursor: "pointer",
                                    }}
                                  />
                                </label>
                              </Box>
                              <Box sx={{ gridColumn: "span 2" }}>
                                {loadingUpload && <Chargement />}
                                {errorUpload && (
                                  <>
                                    <MessageBox severity="error">
                                      {errorUpload}
                                    </MessageBox>
                                    {toast.error(errorUpload)}
                                  </>
                                )}
                              </Box>

                              <TextField
                                placeholder="Entrer votre Description Influenceur"
                                fullWidth
                                label="Description"
                                required
                                value={influenceurDescription}
                                onChange={(e) =>
                                  setInfluenceurDescription(e.target.value)
                                }
                              />
                            </Stack>
                          </Box>
                        </Box>
                      </>
                    )}
                    {utilisateur.isMembreEquipe && (
                      <>
                        <Box
                          mt="10px"
                          backgroundColor={theme.palette.background.alt}
                          sx={{ gridColumn: "span 2" }}
                        >
                          <Box
                            textAlign={"center"}
                            backgroundColor={theme.palette.primary.main}
                            p="15px"
                          >
                            <Typography
                              varaint="h3"
                              textTransform={"uppercase"}
                            >
                              Modifier votre Profil de Membre d'Equipe
                            </Typography>
                          </Box>
                          <Box p="20px">
                            <Stack spacing={2}>
                              <TextField
                                placeholder="Votre Nom "
                                fullWidth
                                label="Nom"
                                required
                                value={membreName}
                                onChange={(e) => setMembreName(e.target.value)}
                              />
                              <Box sx={{ gridColumn: "span 1" }}>
                                <label htmlFor="Photo">
                                  <input
                                    accept="image/*"
                                    id="influenceurLogo"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={uploadFileHandlerMembre}
                                  />
                                  <Avatar
                                    src={membreCover}
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      cursor: "pointer",
                                    }}
                                  />
                                </label>
                              </Box>
                              <Box sx={{ gridColumn: "span 2" }}>
                                {loadingUpload && <Chargement />}
                                {errorUpload && (
                                  <>
                                    <MessageBox severity="error">
                                      {errorUpload}
                                    </MessageBox>
                                    {toast.error(errorUpload)}
                                  </>
                                )}
                              </Box>

                              <TextField
                                placeholder="Entrer votre Poste"
                                fullWidth
                                label="Poste"
                                required
                                value={membrePoste}
                                onChange={(e) => setMembrePoste(e.target.value)}
                              />
                              <TextField
                                placeholder="Entrer votre Adresse"
                                label="Adresse"
                                fullWidth
                                required
                                value={membreAdress}
                                onChange={(e) =>
                                  setMembreAdress(e.target.value)
                                }
                              />
                              <Box
                                sx={{
                                  backgroundColor: theme.palette.primary[600],
                                  p: "20px 20px 20px 20px",
                                }}
                              >
                                <Box
                                  textAlign={"center"}
                                  backgroundColor={theme.palette.primary.main}
                                  p="8px"
                                >
                                  <Typography
                                    varaint="h3"
                                    textTransform={"uppercase"}
                                  >
                                    Vos liens de reseaux sociaux
                                  </Typography>
                                </Box>
                                <Box>
                                  {membreIcons.map((icon, index) => (
                                    <Box key={index}>
                                      <Stack direction="row" spacing={2}>
                                        {icon.icon === "<FacebookIcon />" && (
                                          <TextField
                                            placeholder="Votre Lien Facebook"
                                            fullWidth
                                            required
                                            value={icon.link}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <FacebookIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                            onChange={(e) => {
                                              const updatedIcons = [
                                                ...membreIcons,
                                              ];
                                              updatedIcons[index].link =
                                                e.target.value;
                                              setMembreIcons(updatedIcons);
                                            }}
                                          />
                                        )}
                                        {icon.icon === "<LinkedInIcon />" && (
                                          <TextField
                                            placeholder="Votre Lien LinkedIn"
                                            fullWidth
                                            required
                                            value={icon.link}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <LinkedInIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                            onChange={(e) => {
                                              const updatedIcons = [
                                                ...membreIcons,
                                              ];
                                              updatedIcons[index].link =
                                                e.target.value;
                                              setMembreIcons(updatedIcons);
                                            }}
                                          />
                                        )}
                                        {icon.icon === "<TwitterIcon />" && (
                                          <TextField
                                            placeholder="Votre Lien Twitter"
                                            fullWidth
                                            required
                                            value={icon.link}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <TwitterIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                            onChange={(e) => {
                                              const updatedIcons = [
                                                ...membreIcons,
                                              ];
                                              updatedIcons[index].link =
                                                e.target.value;
                                              setMembreIcons(updatedIcons);
                                            }}
                                          />
                                        )}
                                        {icon.icon === "<InstagramIcon />" && (
                                          <TextField
                                            placeholder="Votre lien Instagram"
                                            fullWidth
                                            required
                                            value={icon.link}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <InstagramIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                            onChange={(e) => {
                                              const updatedIcons = [
                                                ...membreIcons,
                                              ];
                                              updatedIcons[index].link =
                                                e.target.value;
                                              setMembreIcons(updatedIcons);
                                            }}
                                          />
                                        )}
                                      </Stack>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            </Stack>
                          </Box>
                        </Box>
                      </>
                    )}
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                        mt: "30px",
                        backgroundColor: theme.palette.primary[600],
                        border: "1px solid",
                        borderColor: theme.palette.secondary.main,
                        gridColumn: "span 4",
                      }}
                      type="submit"
                    >
                      Modifier
                    </Button>
                  </Grid>
                </>
              )}
            </form>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ProfilScreen;

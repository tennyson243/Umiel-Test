import { useTheme } from "@emotion/react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsUser, updateUser } from "../../actions/userActions";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from "../../constants/userConstants";
import Header from "../../Components/Header";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;
  const [nom, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInfluenceur, setIsInfluenceur] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isMembreEquipe, setIsMembreEquipe] = useState(false);
  const [isBlogeur, setIsBlogeur] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, utilisateur } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/userlist");
    }
    if (!utilisateur) {
      dispatch(detailsUser(userId));
    } else {
      setName(utilisateur.nom);
      setEmail(utilisateur.email);
      setTelephone(utilisateur.telephone);
      setIsSeller(utilisateur.isSeller);
      setIsAdmin(utilisateur.isAdmin);
      setIsInfluenceur(utilisateur.isInfluenceur);
      setIsSuperAdmin(utilisateur.isSuperAdmin);
      setIsMembreEquipe(utilisateur.isMembreEquipe);
      setIsBlogeur(utilisateur.isBlogeur);
    }
  }, [dispatch, navigate, successUpdate, utilisateur, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      updateUser({
        _id: userId,
        nom,
        email,
        isSeller,
        isAdmin,
        isInfluenceur,
        isSuperAdmin,
        isMembreEquipe,
        isBlogeur,
      })
    );
  };
  return (
    <>
      <Helmet>
        <title>Modifier un Utilisateur</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="MODIFICATION" subtitle="Modifier un Utilisateur" />
        <Typography
          variant="h4"
          textAlign="center"
          paddingTop="20px"
          paddingBottom="20px"
        >
          Modifier l'utilisateur: {nom}
        </Typography>
        {loadingUpdate && <Chargement />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <>
            <form onSubmit={submitHandler}>
              <Box
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Nom"
                  value={nom}
                  onChange={(e) => setName(e.target.value)}
                  required
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <Box sx={{ gridColumn: "span 2" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="isSeller"
                        type="checkbox"
                        checked={isSeller}
                        onChange={(e) => setIsSeller(e.target.checked)}
                      />
                    }
                    label="Vendeur?"
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="isAdmin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      />
                    }
                    label="Admin?"
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="isSuperAdmin"
                        checked={isSuperAdmin}
                        onChange={(e) => setIsSuperAdmin(e.target.checked)}
                      />
                    }
                    label="SuperAdmin??"
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="isInfluenceur"
                        checked={isInfluenceur}
                        onChange={(e) => setIsInfluenceur(e.target.checked)}
                      />
                    }
                    label="Influenceur?"
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="isMembreEquipe"
                        checked={isMembreEquipe}
                        onChange={(e) => setIsMembreEquipe(e.target.checked)}
                      />
                    }
                    label="Membre Equipe?"
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="isBlogeur"
                        checked={isBlogeur}
                        onChange={(e) => setIsMembreEquipe(e.target.checked)}
                      />
                    }
                    label="Blogeur(se)?"
                  />
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                gap="50px"
                mt="30px"
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.background.alt,
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                  type="submit"
                >
                  Modifier
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default UserEditScreen;

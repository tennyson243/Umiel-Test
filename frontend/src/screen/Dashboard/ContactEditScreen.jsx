import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsContact, updateContact } from "../../actions/contactActions";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { CONTACT_PROFILE_RESET } from "../../constants/contactConstants";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import FlexBetween from "../../Components/FlexBetween";
import { Message } from "@mui/icons-material";
import ReactPlayer from "react-player";

const ContactEditScreen = () => {
  const contactDetails = useSelector((state) => state.contactDetails);
  const { loading, error, contact } = contactDetails;
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: contactId } = params;
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [refcommande, setRefcommande] = useState("");
  const [object, setObject] = useState("");
  const [fichier, setFichier] = useState("");
  const [message, setMessage] = useState("");
  const [statut, setStatut] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = contactUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CONTACT_PROFILE_RESET });
      navigate("/contacts");
    }

    if (!contact) {
      dispatch(detailsContact(contactId));
    } else {
      setObject(contact.object);
      setEmail(contact.email);
      setTelephone(contact.telephone);
      setFichier(contact.fichier);
      setRefcommande(contact.refcommande);
      setStatut(contact.statut);
      setMessage(contact.message);
    }
  }, [dispatch, contact, contactId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      updateContact({
        _id: contactId,
        statut,
      })
    );
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const renderMedia = () => {
    if (fichier.endsWith(".pdf")) {
      return (
        <a href={fichier} download>
          Télécharger le fichier PDF
        </a>
      );
    } else if (
      fichier.endsWith(".mp4") ||
      fichier.endsWith(".webm") ||
      fichier.endsWith(".ogg")
    ) {
      return <ReactPlayer url={fichier} controls width="100%" height="400px" />;
    } else {
      return <CardMedia component="img" height="400" image={fichier} alt="" />;
    }
  };
  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="MESSAGE" subtitle="Le message en détails" />
        <Typography
          variant="h4"
          textAlign="center"
          paddingTop="20px"
          paddingBottom="20px"
        >
          Message provenant de : {email}
        </Typography>
        {loadingUpdate && <Chargement />}
        {errorUpdate && <MessageBox severity="error">{errorUpdate}</MessageBox>}
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <>
            <form onSubmit={submitHandler}>
              <Card
                sx={{
                  backgroundImage: "none",
                  backgroundColor: theme.palette.background.alt,
                  borderRadius: "0.55rem",
                }}
              >
                <CardHeader title={object} subheader={email} />
                <CardContent>
                  <Typography variant="h4" color="text.secondary">
                    {message}
                  </Typography>
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
                    {renderMedia()}
                    <FlexBetween
                      mt="1rem"
                      backgroundColor={theme.palette.background.main}
                    >
                      <Stack spacing={2} direction="row">
                        <Typography variant="h5">Répondre par Email</Typography>
                        <CardActions disableSpacing>
                          <IconButton
                            aria-label="add to favorites"
                            onClick={handleEmailClick}
                          >
                            <Message />
                          </IconButton>
                        </CardActions>
                      </Stack>

                      <FormControlLabel
                        control={
                          <Checkbox
                            id="statut"
                            type="checkbox"
                            checked={statut}
                            onChange={(e) => setStatut(e.target.checked)}
                          />
                        }
                        label="Message Répondu?"
                      />
                    </FlexBetween>

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
                  </CardContent>
                </Collapse>
              </Card>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default ContactEditScreen;

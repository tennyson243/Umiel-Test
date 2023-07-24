import { useTheme } from "@emotion/react";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import EnTete from "../Components/EnTete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../actions/contactActions";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contacter = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const contactCreate = useSelector((state) => state.contactCreate);
  const { loading, success, error, contact } = contactCreate;

  const dispatch = useDispatch();

  const [object, setObject] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [refcommande, setRefcommande] = useState("");
  const [fichier, setFichier] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setObject("Choisir");
      setEmail("");
      setTelephone("");
      setFichier("");
      setRefcommande("");
      setMessage("");
      navigate("/");
    }
  }, [success, navigate]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    const updatedCart = {
      object,
      email,
      telephone,
      refcommande,
      fichier,
      message,
    };
    dispatch(createContact({ ...updatedCart }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setObject(event.target.value);
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const uploadFileHandler = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post("/api/uploads/file", bodyFormData);
        setFichier(data);
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
      <EnTete title="SERVICE CLIENT - CONTACTEZ-NOUS" />
      <Box>
        <Box
          sx={{
            textAlign: "center",
            p: "40px",

            width: "90%",
            m: "auto",
          }}
        >
          <Typography variant="h4">Une question technique ?</Typography>
        </Box>

        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            width: "90%",
            m: "auto",
            background: theme.palette.primary[500],
          }}
        >
          <Box sx={{ gridColumn: "span 4", p: " 30px 30px 0px 30px" }}>
            <Typography variant="h5">
              Si vous avez des interrogations sur l'utilisation de produits
              naturels tels que les huiles essentielles, huiles végétales,
              macérats, hydrolats, etc., vous êtes au bon endroit ! Umiel est là
              pour vous offrir son expertise et le soutien de son équipe, que
              vous soyez client ou non. Si vous souhaitez en savoir plus sur nos
              méthodes, consultez la section qui explique comment nous rédigeons
              nos conseils. Avant de parcourir les liens ci-dessous, avez-vous
              essayé notre pratique barre de recherche ? Elle peut répondre à de
              nombreuses questions !
            </Typography>
          </Box>

          <Box sx={{ gridColumn: "span 2", p: "30px" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "60px",
              }}
            >
              Consulter nos page de conseils
            </Button>
          </Box>
          <Box sx={{ gridColumn: "span 2", p: "30px" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "60px",
              }}
            >
              Pour une question tres specifique Utiliser notre forum
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            p: "40px",

            width: "90%",
            m: "auto",
          }}
        >
          <Typography variant="h4">
            Une question concernant votre commande, un produit ?
          </Typography>
        </Box>
        <Box
          sx={{
            width: "90%",
            m: "auto",
            background: theme.palette.primary[500],
            p: "20px",
          }}
        ></Box>

        <Box
          sx={{
            p: "20px",

            width: "90%",
            m: "auto",
          }}
        >
          <Typography variant="h6">
            Si vous avez des questions concernant une commande passée ou à
            venir, si vous avez besoin d'un service après-vente, si vous êtes
            intrigué par un produit ou si vous rencontrez des problèmes
            techniques sur le site, la meilleure façon de nous contacter et
            d'obtenir rapidement une réponse est de nous envoyer un e-mail.
            Notre équipe consulte et traite quotidiennement (à l'exception des
            week-ends) le formulaire ci-dessous. PS : Vous pourriez peut-être
            trouver la réponse à votre question dans la section "Livraison et
            paiement" ou dans les "Conditions générales de vente".
          </Typography>
        </Box>
        <form onSubmit={placeOrderHandler}>
          <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              width: "90%",
              m: "auto",
              background: theme.palette.primary[500],
            }}
          >
            <Box sx={{ gridColumn: "span 4", p: " 30px 0px 0px 30px" }}>
              <Typography variant="h5">Envoyer un message</Typography>
            </Box>
            <Box sx={{ gridColumn: "span 4", p: " 0px 30px 0px 30px" }}>
              {loading && <Chargement />}
              {error && <MessageBox severity="error">{error}</MessageBox>}
              {success && (
                <>
                  <MessageBox>
                    Votre Message a ete Envoyer avec Succes!!!
                  </MessageBox>
                  {toast.info("Messager Envoyer avec Succes!!")}
                </>
              )}
            </Box>
            <Box sx={{ gridColumn: "span 1" }}>
              <Box
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
                }}
              >
                <Box sx={{ gridColumn: "span 1", p: "0px 20px 0px 20px" }}>
                  <FormControl sx={{ minWidth: 120, width: "255px" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Object
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={object}
                      label="Object"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Choisir</em>
                      </MenuItem>
                      <MenuItem value={"Autre"}>Autre</MenuItem>
                      <MenuItem value={"Besoin de nos conseils"}>
                        Besoin de nos conseils
                      </MenuItem>
                      <MenuItem value={"Information Utile"}>
                        Information Utile
                      </MenuItem>
                      <MenuItem value={"Livraison de ma Commande"}>
                        Livraison de ma Commande
                      </MenuItem>
                      <MenuItem value={"Modifier ma Commande"}>
                        Modifier ma Commande
                      </MenuItem>
                      <MenuItem value={"Mot de passe et Compte"}>
                        Mot de passe et Compte
                      </MenuItem>
                      <MenuItem value={"Rejoignez nous"}>
                        Rejoignez nous
                      </MenuItem>
                      <MenuItem value={"Retour d'experience"}>
                        Retour d'experience
                      </MenuItem>
                      <MenuItem value={"Retour Produit"}>
                        Retour Produit
                      </MenuItem>
                      <MenuItem value={"Soucis de paiement"}>
                        Soucis de paiement
                      </MenuItem>
                      <MenuItem value={"Qualite de ma Commande"}>
                        Qualite de ma Commande
                      </MenuItem>
                      <MenuItem value={"Suggestion d'Amelioration"}>
                        Suggestion d'Amelioration
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ gridColumn: "span 1", p: "0px 20px 0px 20px" }}>
                  <TextField
                    placeholder="Adresse Email"
                    fullWidth
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 1", p: "0px 20px 0px 20px" }}>
                  <TextField
                    placeholder="Numero Telephone"
                    fullWidth
                    required
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 1", p: "0px 20px 0px 20px" }}>
                  <TextField
                    placeholder="Reference du commande"
                    fullWidth
                    onChange={(e) => setRefcommande(e.target.value)}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 1", p: "0px 20px 0px 20px" }}>
                  <TextField
                    fullWidth
                    type="file"
                    onChange={uploadFileHandler}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 1", p: "0px 20px 0px 20px" }}>
                  {loadingUpload && <Chargement />}
                  {errorUpload && (
                    <MessageBox severity="error">{errorUpload}</MessageBox>
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ gridColumn: "span 3", p: "20px" }}>
              <Box>
                <TextField
                  placeholder="Message"
                  fullWidth
                  required
                  multiline
                  rows={14}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={{ gridColumn: "span 4", m: "0px 30px 30px 30px" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  boxShadow: "none",
                  color: "white",
                  borderRadius: 0,
                  padding: "15px 40px",
                  backgroundColor: theme.palette.primary[600],
                  border: "1px solid",
                  borderColor: theme.palette.secondary.main,
                  gridColumn: "span 4",
                }}
                type="submit"
              >
                Envoyer
              </Button>
            </Box>
          </Box>
        </form>

        <Box
          sx={{
            textAlign: "center",
            p: "40px",

            width: "90%",
            m: "auto",
          }}
        >
          <Typography variant="h4">
            Et si vous nous appeliez plutôt ?
          </Typography>
        </Box>

        <Box
          sx={{
            width: "90%",
            m: "auto",
            background: theme.palette.primary[500],
            p: "30px",
          }}
        >
          <Box>
            <Typography variant="h6">
              Non, nous n'allons pas vous rediriger vers un call center qui vous
              traitera comme un ticket, désolé. Bien que ce soit passé de mode,
              vous aurez en ligne des personnes dont les vrais prénoms sont
              juie, et Naomie, qui vous répondent depuis Goma, à 20 mètres de
              l'endroit où vos flacons sont fabriqués. Ils sont disponibles du
              lundi au vendredi, le matin de 8h à 12h15 et l'après-midi de 13h30
              à 16h. Pour toute question logistique ou concernant nos produits,
              ils sont redoutables d'efficacité. Le petit plus ? Votre service
              client est très calé en aromathérapie ! Et si votre question est
              trop spécifique, ils se tourneront vers notre équipe d'experts
              pour vous apporter une réponse éclairée et personnalisée
            </Typography>
          </Box>

          <Box
            sx={{
              p: "40px",
              textAlign: "center",
            }}
          >
            <Typography variant="h3">+243 975316498</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Contacter;

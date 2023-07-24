import { useTheme } from "@emotion/react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  modificationPopulaire,
  updatePopulaire,
} from "../../../actions/Blog/populaireAction";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";
import { POPULAIRE_UPDATE_RESET } from "../../../constants/Blog/populaireConstants";
import Header from "../../../Components/Header";
import ReactMarkdown from "react-markdown";

const PopulaireEditScreeen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: populaireId } = params;
  const [title, setTitle] = useState("");
  const [catgeory, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [role, setRole] = useState("");
  const [exemple, setExemples] = useState([]);
  const [conclusion, setConclusions] = useState("");
  const [selectedRecette, setSelectedRecette] = useState("");
  const [newTitre, setNewTitre] = useState("");
  const [newType, setNewType] = useState("");
  const [newExpli, setNewExpli] = useState("");
  const [newBienfait, setNewBienfait] = useState("");
  const [newMode, setNewMode] = useState("");

  const [newTitreName, setNewTitreName] = useState("");
  const [newTypeName, setNewTypeName] = useState("");
  const [newExpliName, setNewExpliName] = useState("");
  const [newBienfaitName, setNewBienfaitName] = useState("");
  const [newModeName, setNewModeName] = useState("");
  const [editingRecette, setEditingRecette] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const populaireModification = useSelector(
    (state) => state.populaireModification
  );
  const { loading, error, populaire } = populaireModification;
  const populaireUpdate = useSelector((state) => state.populaireUpdate);
  const [sousCategorie, setSousCategorie] = useState(1);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = populaireUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate("/nutritions");
    }
    if (!populaire || populaire._id !== populaireId || successUpdate) {
      dispatch({ type: POPULAIRE_UPDATE_RESET });
      dispatch(modificationPopulaire(populaireId));
    } else {
      setCover(populaire.cover);
      setCategory(populaire.catgeory);
      setSousCategorie(populaire.sousCategorie);
      setTitle(populaire.title);
      setDate(populaire.createdAt.substring(0, 10));
      setDesc(populaire.desc);
      setRole(populaire.role);
      setExemples(populaire.exemple);
      setConclusions(populaire.conclusion);
    }
  }, [populaire, dispatch, populaireId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updatePopulaire({
        _id: populaireId,
        cover,
        catgeory,
        sousCategorie,
        title,
        date,
        desc,
        role,
        exemple,
        conclusion,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const [loadingUploade, setLoadingUploade] = useState(false);
  const [errorUploade, setErrorUploade] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date(1685563466157));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  const handleRatingChange = (event) => {
    setSousCategorie(event.target.value);
  };

  const handleExempleClick = (recipe) => {
    setSelectedRecipe(recipe);
    setEditingRecette(true);
  };

  const handleDeleteExemple = (recipe) => {
    setExemples(exemple.filter((item) => item !== recipe));
    if (selectedRecipe && recipe === selectedRecipe) {
      setSelectedRecipe(null);
      setEditingRecette(false);
    }
  };

  const handleEditRecette = () => {
    const updatedExemples = exemple.map((item) => {
      if (item === selectedRecipe) {
        return {
          ...selectedRecipe,
          titre: newTitre || selectedRecipe.titre,
          type: newType || selectedRecipe.type,
          expli: newExpli || selectedRecipe.expli,
          bienfait: newBienfait || selectedRecipe.bienfait,
          mode: newMode || selectedRecipe.mode,
        };
      }
      return item;
    });
    setExemples(updatedExemples);
    setSelectedRecipe(null);
    setNewTitre("");
    setNewType("");
    setNewExpli("");
    setNewBienfait("");
    setNewMode("");
    setEditingRecette(false);
  };

  return (
    <>
      <Helmet>
        <title>Modifier un article nutrition naturelle</title>
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
              title="MODIFICATION"
              subtitle="Modifier un article Nutrition naturelle"
            />
            <Typography
              variant="h4"
              textAlign="center"
              paddingTop="20px"
              paddingBottom="20px"
            >
              Modifier l'article: {populaireId}
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
                          sx={{ gridColumn: "span 3" }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Time"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          sx={{ gridColumn: "span 1" }}
                          disabled
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Category"
                          value={catgeory}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                          disabled
                        />

                        <Box sx={{ gridColumn: "span 2" }}>
                          <FormControl
                            variant="filled"
                            sx={{ m: 1, minWidth: 300 }}
                          >
                            <InputLabel id="demo-simple-select-filled-label">
                              Sous-Categories
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={sousCategorie}
                              onChange={handleRatingChange}
                              sx={{
                                width: "200px",
                              }}
                            >
                              <MenuItem value="Aliments sains et équilibrés">
                                Aliments sains et équilibrés
                              </MenuItem>
                              <MenuItem value="Régimes alimentaires spécifiques">
                                Régimes alimentaires spécifiques
                              </MenuItem>
                              <MenuItem value="Suppléments nutritionnels naturels">
                                Suppléments nutritionnels naturels
                              </MenuItem>
                              <MenuItem value="Problèmes de santé spécifiques">
                                Problèmes de santé spécifiques
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: theme.palette.primary[600],
                            p: "20px 20px 20px 20px",
                            gridColumn: "span 4",
                          }}
                        >
                          <Box
                            textAlign={"center"}
                            backgroundColor={theme.palette.primary.main}
                            p="8px"
                            mb="20px"
                          >
                            <Typography
                              varaint="h3"
                              textTransform={"uppercase"}
                            >
                              Introduction
                            </Typography>
                          </Box>
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
                            <Box sx={{ gridColumn: "span 1" }}>
                              <Card>
                                <CardContent sx={{ overflowY: "auto" }}>
                                  <Typography variant="h6" gutterBottom>
                                    Syntaxe Markdown prise en charge
                                  </Typography>
                                  <Typography variant="body2">
                                    - Titres : # Titre de niveau 1 ## Titre de
                                    niveau 2 ### Titre de niveau 3
                                  </Typography>
                                  <Typography variant="body2">
                                    - Texte en gras : **Texte en gras**
                                  </Typography>
                                  <Typography variant="body2">
                                    - Texte en italique : *Texte en italique*
                                  </Typography>
                                  <Typography variant="body2">
                                    - Lien : [Texte du
                                    lien](https://www.example.com)
                                  </Typography>
                                  <Typography variant="body2">
                                    - Liste non ordonnée : - Élément 1 - Élément
                                    2 - Élément 3 |
                                  </Typography>
                                  <Typography variant="body2">
                                    - Liste ordonnée : 1. Élément 1 2. Élément 2
                                    3. Élément 3
                                  </Typography>
                                  <Typography variant="body2">
                                    - Citation :  Ceci est une citation.
                                  </Typography>
                                  <Typography variant="body2">
                                    - Bloc de code : ```javascript const exemple
                                    = 'Ceci est un exemple de bloc de code';
                                    console.log(exemple); ```
                                  </Typography>

                                  <Typography variant="body2">
                                    - Image : ![Texte alternatif de
                                    l'image](chemin/vers/l'image.png)
                                  </Typography>
                                  <Typography variant="body2">
                                    - Ligne horizontale : ---
                                  </Typography>
                                  <Typography variant="body2">
                                    - Tableau : | Colonne 1 | Colonne 2 | |
                                    --------- | --------- | | Cellule 1 |
                                    Cellule 2 | | Cellule 3 | Cellule 4 |
                                  </Typography>
                                  <Typography variant="body2">
                                    - Note de bas de page : Ceci est un exemple
                                    de note de bas de page[^1]. [^1]: C'est le
                                    contenu de la note de bas de page.
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Box>
                            <TextField
                              fullWidth
                              type="text"
                              label="Description"
                              value={desc}
                              multiline
                              rows={20}
                              onChange={(e) => setDesc(e.target.value)}
                              required
                              sx={{ gridColumn: "span 2" }}
                            />
                            <Box sx={{ gridColumn: "span 1" }}>
                              <Box
                                textAlign={"center"}
                                backgroundColor={theme.palette.primary.main}
                                p="8px"
                                mb="20px"
                              >
                                <Typography varaint="h4">
                                  Previsualisateur de Markdown
                                </Typography>
                              </Box>
                              <ReactMarkdown>{desc}</ReactMarkdown>
                            </Box>
                            <Box sx={{ gridColumn: "span 4" }}>
                              <Box
                                display="grid"
                                gap="15px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                  "& > div": {
                                    gridColumn: isNonMobile
                                      ? undefined
                                      : "span 4",
                                  },
                                }}
                              >
                                <Box sx={{ gridColumn: "span 4" }}>
                                  <Box
                                    mt="10px"
                                    backgroundColor={
                                      theme.palette.background.alt
                                    }
                                  >
                                    <Box
                                      textAlign={"center"}
                                      backgroundColor={
                                        theme.palette.primary.main
                                      }
                                      p="15px"
                                    >
                                      <Typography
                                        varaint="h3"
                                        textTransform={"uppercase"}
                                      >
                                        Photo du premier Plan
                                      </Typography>
                                    </Box>
                                    <Box p="20px">
                                      <img
                                        src={cover}
                                        style={{
                                          with: "300px",
                                          height: "500px",
                                        }}
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

                            <TextField
                              fullWidth
                              type="text"
                              label="Role"
                              value={role}
                              multiline
                              rows={20}
                              onChange={(e) => setRole(e.target.value)}
                              required
                              sx={{ gridColumn: "span 3" }}
                            />

                            <Box sx={{ gridColumn: "span 1" }}>
                              <Box
                                textAlign={"center"}
                                backgroundColor={theme.palette.primary.main}
                                p="8px"
                                mb="20px"
                              >
                                <Typography varaint="h4">
                                  Previsualisateur de Markdown
                                </Typography>
                              </Box>
                              <ReactMarkdown>{role}</ReactMarkdown>
                            </Box>

                            <Box sx={{ gridColumn: "span 4" }}>
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
                                    Les types
                                  </Typography>
                                </Box>
                                <Box p="20px">
                                  <List>
                                    {exemple.map((exemples, index) => (
                                      <ListItem
                                        key={exemples}
                                        button
                                        selected={selectedRecette === exemples}
                                        onClick={() =>
                                          handleExempleClick(exemples)
                                        }
                                      >
                                        <ListItemText
                                          primary={exemples.titre}
                                        />
                                        <ListItemSecondaryAction>
                                          <Stack direction="row" spacing={1}>
                                            <IconButton
                                              edge="end"
                                              aria-label="delete"
                                              onClick={() =>
                                                handleDeleteExemple(exemples)
                                              }
                                            >
                                              <Delete />
                                            </IconButton>
                                          </Stack>
                                        </ListItemSecondaryAction>
                                      </ListItem>
                                    ))}
                                  </List>
                                  {editingRecette && (
                                    <Box p="20px" sx={{ gridColumn: "span 2" }}>
                                      <Stack direction="column" spacing={2}>
                                        <TextField
                                          label="Titre sélectionné"
                                          value={selectedRecipe.titre}
                                          disabled
                                        />
                                        <TextField
                                          label="Exemples sélectionné"
                                          value={selectedRecipe.type}
                                          disabled
                                        />
                                        <TextField
                                          label="Exeplications sélectionné"
                                          value={selectedRecipe.expli}
                                          disabled
                                        />
                                        <TextField
                                          label="Bienfait sélectionné"
                                          value={selectedRecipe.bienfait}
                                          disabled
                                        />
                                        <TextField
                                          label="mode de conso sélectionné"
                                          value={selectedRecipe.mode}
                                          disabled
                                        />
                                      </Stack>
                                      <Box
                                        display="grid"
                                        gap="15px"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                          "& > div": {
                                            gridColumn: isNonMobile
                                              ? undefined
                                              : "span 4",
                                          },
                                        }}
                                      >
                                        <TextField
                                          label="Nouveau Type"
                                          value={newTitre}
                                          onChange={(e) =>
                                            setNewTitre(e.target.value)
                                          }
                                          sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                          label="Nouveau Exemple"
                                          value={newType}
                                          multiline
                                          rows={3}
                                          onChange={(e) =>
                                            setNewType(e.target.value)
                                          }
                                          sx={{ gridColumn: "span 3" }}
                                        />
                                        <Box sx={{ gridColumn: "span 1" }}>
                                          <Box
                                            textAlign={"center"}
                                            backgroundColor={
                                              theme.palette.primary.main
                                            }
                                            p="8px"
                                            mb="20px"
                                          >
                                            <Typography varaint="h4">
                                              Previsualisateur de Markdown
                                            </Typography>
                                          </Box>
                                          <ReactMarkdown>
                                            {newType}
                                          </ReactMarkdown>
                                        </Box>
                                        <TextField
                                          label="Nouvelle Explication"
                                          value={newExpli}
                                          multiline
                                          rows={3}
                                          onChange={(e) =>
                                            setNewExpli(e.target.value)
                                          }
                                          sx={{ gridColumn: "span 3" }}
                                        />
                                        <Box sx={{ gridColumn: "span 1" }}>
                                          <Box
                                            textAlign={"center"}
                                            backgroundColor={
                                              theme.palette.primary.main
                                            }
                                            p="8px"
                                            mb="20px"
                                          >
                                            <Typography varaint="h4">
                                              Previsualisateur de Markdown
                                            </Typography>
                                          </Box>
                                          <ReactMarkdown>
                                            {newExpli}
                                          </ReactMarkdown>
                                        </Box>
                                        <TextField
                                          label="Nouveau Bienfait"
                                          value={newBienfait}
                                          multiline
                                          rows={3}
                                          onChange={(e) =>
                                            setNewBienfait(e.target.value)
                                          }
                                          sx={{ gridColumn: "span 3" }}
                                        />
                                        <Box sx={{ gridColumn: "span 1" }}>
                                          <Box
                                            textAlign={"center"}
                                            backgroundColor={
                                              theme.palette.primary.main
                                            }
                                            p="8px"
                                            mb="20px"
                                          >
                                            <Typography varaint="h4">
                                              Previsualisateur de Markdown
                                            </Typography>
                                          </Box>
                                          <ReactMarkdown>
                                            {newBienfait}
                                          </ReactMarkdown>
                                        </Box>
                                        <TextField
                                          label="Nouveau Mode de Consomation"
                                          value={newMode}
                                          multiline
                                          rows={3}
                                          onChange={(e) =>
                                            setNewMode(e.target.value)
                                          }
                                          sx={{ gridColumn: "span 3" }}
                                        />
                                        <Box sx={{ gridColumn: "span 1" }}>
                                          <Box
                                            textAlign={"center"}
                                            backgroundColor={
                                              theme.palette.primary.main
                                            }
                                            p="8px"
                                            mb="20px"
                                          >
                                            <Typography varaint="h4">
                                              Previsualisateur de Markdown
                                            </Typography>
                                          </Box>
                                          <ReactMarkdown>
                                            {newMode}
                                          </ReactMarkdown>
                                        </Box>
                                        <Button
                                          sx={{ gridColumn: "span 4" }}
                                          fullWidth
                                          variant="contained"
                                          color="primary"
                                          onClick={handleEditRecette}
                                          startIcon={<Edit />}
                                        >
                                          Modifier
                                        </Button>
                                      </Box>
                                    </Box>
                                  )}
                                  {!editingRecette && (
                                    <div>
                                      <Box p="20px">
                                        <Box
                                          display="grid"
                                          gap="15px"
                                          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                          sx={{
                                            "& > div": {
                                              gridColumn: isNonMobile
                                                ? undefined
                                                : "span 4",
                                            },
                                          }}
                                        >
                                          <TextField
                                            label="Nouveau Titre"
                                            value={newTitreName}
                                            onChange={(e) =>
                                              setNewTitreName(e.target.value)
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                          />
                                          <TextField
                                            label="Nouveau Type"
                                            value={newTypeName}
                                            multiline
                                            rows={3}
                                            onChange={(e) =>
                                              setNewTypeName(e.target.value)
                                            }
                                            sx={{ gridColumn: "span 3" }}
                                          />
                                          <Box sx={{ gridColumn: "span 1" }}>
                                            <Box
                                              textAlign={"center"}
                                              backgroundColor={
                                                theme.palette.primary.main
                                              }
                                              p="8px"
                                              mb="20px"
                                            >
                                              <Typography varaint="h4">
                                                Previsualisateur de Markdown
                                              </Typography>
                                            </Box>
                                            <ReactMarkdown>
                                              {newTypeName}
                                            </ReactMarkdown>
                                          </Box>
                                          <TextField
                                            label="Nouvelle Explication"
                                            value={newExpliName}
                                            multiline
                                            rows={3}
                                            onChange={(e) =>
                                              setNewExpliName(e.target.value)
                                            }
                                            sx={{ gridColumn: "span 3" }}
                                          />
                                          <Box sx={{ gridColumn: "span 1" }}>
                                            <Box
                                              textAlign={"center"}
                                              backgroundColor={
                                                theme.palette.primary.main
                                              }
                                              p="8px"
                                              mb="20px"
                                            >
                                              <Typography varaint="h4">
                                                Previsualisateur de Markdown
                                              </Typography>
                                            </Box>
                                            <ReactMarkdown>
                                              {newExpliName}
                                            </ReactMarkdown>
                                          </Box>
                                          <TextField
                                            label="Nouveau Bienfait"
                                            value={newBienfaitName}
                                            multiline
                                            rows={3}
                                            onChange={(e) =>
                                              setNewBienfaitName(e.target.value)
                                            }
                                            sx={{ gridColumn: "span 3" }}
                                          />
                                          <Box sx={{ gridColumn: "span 1" }}>
                                            <Box
                                              textAlign={"center"}
                                              backgroundColor={
                                                theme.palette.primary.main
                                              }
                                              p="8px"
                                              mb="20px"
                                            >
                                              <Typography varaint="h4">
                                                Previsualisateur de Markdown
                                              </Typography>
                                            </Box>
                                            <ReactMarkdown>
                                              {newBienfaitName}
                                            </ReactMarkdown>
                                          </Box>
                                          <TextField
                                            label="Nouveau Mode de Consomation"
                                            value={newModeName}
                                            multiline
                                            rows={3}
                                            onChange={(e) =>
                                              setNewModeName(e.target.value)
                                            }
                                            sx={{ gridColumn: "span 3" }}
                                          />
                                          <Box sx={{ gridColumn: "span 1" }}>
                                            <Box
                                              textAlign={"center"}
                                              backgroundColor={
                                                theme.palette.primary.main
                                              }
                                              p="8px"
                                              mb="20px"
                                            >
                                              <Typography varaint="h4">
                                                Previsualisateur de Markdown
                                              </Typography>
                                            </Box>
                                            <ReactMarkdown>
                                              {newModeName}
                                            </ReactMarkdown>
                                          </Box>
                                        </Box>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          sx={{
                                            gridColumn: "span 4",
                                            mt: "1rem",
                                          }}
                                          fullWidth
                                          onClick={() => {
                                            setExemples([
                                              ...exemple,
                                              {
                                                titre: newTitreName,
                                                type: newTypeName,
                                                expli: newExpliName,
                                                bienfait: newBienfaitName,
                                                mode: newModeName,
                                              },
                                            ]);
                                            setEditingRecette(false);
                                            setNewTitreName("");
                                            setNewTypeName("");
                                            setNewExpliName("");
                                            setNewBienfaitName("");
                                            setNewModeName("");
                                          }}
                                          startIcon={<Add />}
                                        >
                                          Ajouter
                                        </Button>
                                      </Box>
                                    </div>
                                  )}
                                </Box>
                              </Box>
                            </Box>

                            <TextField
                              fullWidth
                              type="text"
                              label="Conclusion"
                              value={conclusion}
                              multiline
                              rows={20}
                              onChange={(e) => setConclusions(e.target.value)}
                              required
                              sx={{ gridColumn: "span 3" }}
                            />
                            <Box sx={{ gridColumn: "span 1" }}>
                              <Box
                                textAlign={"center"}
                                backgroundColor={theme.palette.primary.main}
                                p="8px"
                                mb="20px"
                              >
                                <Typography varaint="h4">
                                  Previsualisateur de Markdown
                                </Typography>
                              </Box>
                              <ReactMarkdown>{conclusion}</ReactMarkdown>
                            </Box>
                          </Box>
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

export default PopulaireEditScreeen;

import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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
  modificationHero,
  updateHero,
} from "../../../actions/Blog/heroActions";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";
import { HERO_UPDATE_RESET } from "../../../constants/Blog/heroConstants";
import { Add, Delete, Edit } from "@mui/icons-material";
import Header from "../../../Components/Header";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const HeroEditScreen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: heroId } = params;
  const [title, setTitle] = useState("");
  const [catgeory, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [cover, setCover] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const [time, setTime] = useState("");

  const [desc, setDesc] = useState("");
  const [ingredient, setIngredients] = useState([]);
  const [ustencile, setUstenciles] = useState([]);
  const [recette, setRecettes] = useState([]);
  const [application, setApplications] = useState([]);
  const [precaution, setPrecautions] = useState([]);
  const [bibliographie, setBibliographie] = useState("");

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [editing, setEditing] = useState(false);

  const [selectedPrecaution, setSelectedPrecautions] = useState("");
  const [newPrecaution, setNewPrecaution] = useState("");
  const [editingPrecaution, setEditingPrecautions] = useState(false);

  const [selectedUstenciles, setSelectedUstenciles] = useState("");
  const [newUstencile, setNewUstencile] = useState("");
  const [editingUstencile, setEditingUstencile] = useState(false);

  const [selectedRecette, setSelectedRecette] = useState("");
  const [newRecette, setNewRecette] = useState("");
  const [editingRecette, setEditingRecette] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newRecetteName, setNewRecetteName] = useState("");
  const [newRecetteImage, setNewRecetteImage] = useState("");
  const [newRecetteImageFile, setNewRecetteImageFile] = useState(null);
  const [sousCategorie, setSousCategorie] = useState(1);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const heroModification = useSelector((state) => state.heroModification);
  const { loading, error, hero } = heroModification;
  const heroUpdate = useSelector((state) => state.heroUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = heroUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate("/remedes");
    }
    if (!hero || hero._id !== heroId || successUpdate) {
      dispatch({ type: HERO_UPDATE_RESET });
      dispatch(modificationHero(heroId));
    } else {
      setCover(hero.cover);
      setCategory(hero.catgeory);
      setTitle(hero.title);
      setSousCategorie(hero.sousCategorie);
      setAuthorName(hero.authorName);
      setAuthorImg(hero.authorImg);
      setTime(hero.createdAt.substring(0, 10));
      setDesc(hero.desc);
      setIngredients(hero.ingredient);
      setUstenciles(hero.ustencile);
      setRecettes(hero.recette);
      setApplications(hero.application);
      setPrecautions(hero.precaution);
      setBibliographie(hero.bibliographie);
    }
  }, [hero, dispatch, heroId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateHero({
        _id: heroId,
        cover,
        catgeory,
        sousCategorie,
        title,
        authorName,
        authorImg,
        time,
        desc,
        ingredient,
        ustencile,
        recette,
        application,
        precaution,
        bibliographie,
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

  const handleIngredientClick = (ingredients) => {
    setSelectedIngredient(ingredients);
    setEditing(true);
  };

  const handleNewIngredientChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredient, newIngredient]);
    setNewIngredient("");
  };

  const handleDeleteIngredient = (ingredients) => {
    setIngredients(ingredient.filter((item) => item !== ingredients));
    setSelectedIngredient("");
  };

  const handleEditIngredient = () => {
    setIngredients(
      ingredient.map((item) => {
        if (item === selectedIngredient) {
          return newIngredient;
        }
        return item;
      })
    );
    setSelectedIngredient("");
    setNewIngredient("");
    setEditing(false);
  };

  const handlePrecautionClick = (precautions) => {
    setSelectedPrecautions(precautions);
    setEditingPrecautions(true);
  };

  const handleNewPrecautionChange = (event) => {
    setNewPrecaution(event.target.value);
  };

  const handleAddPrecaution = () => {
    setPrecautions([...precaution, newPrecaution]);
    setNewPrecaution("");
  };

  const handleDeletePrecaution = (precautions) => {
    setPrecautions(precaution.filter((item) => item !== precautions));
    setSelectedPrecautions("");
  };

  const handleEditPrecautions = () => {
    setPrecautions(
      precaution.map((item) => {
        if (item === selectedPrecaution) {
          return newPrecaution;
        }
        return item;
      })
    );
    setSelectedPrecautions("");
    setNewPrecaution("");
    setEditingPrecautions(false);
  };

  const handleRecetteClick = (recipe) => {
    setSelectedRecipe(recipe);
    setEditingRecette(true);
  };

  const handleNewRecetteChange = (event) => {
    setNewRecette(event.target.value);
  };

  const handleAddRecette = () => {
    setRecettes([...recette, newRecette]);
    setNewRecette("");
  };

  const handleDeleteRecette = (recipe) => {
    setRecettes(recette.filter((item) => item !== recipe));
    if (selectedRecipe && recipe === selectedRecipe) {
      setSelectedRecipe(null);
      setEditingRecette(false);
    }
  };

  const handleEditRecette = () => {
    const updatedRecettes = recette.map((item) => {
      if (item === selectedRecipe) {
        return {
          ...selectedRecipe,
          desc: newRecette || selectedRecipe.desc,
          image: newRecetteImage || selectedRecipe.image,
        };
      }
      return item;
    });
    setRecettes(updatedRecettes);
    setSelectedRecipe(null);
    setNewRecette("");
    setNewRecetteImage("");
    setEditingRecette(false);
  };

  const handleUstencileClick = (ustenciles) => {
    setSelectedUstenciles(ustenciles);
    setEditingUstencile(true);
  };

  const handleNewUstencileChange = (event) => {
    setNewUstencile(event.target.value);
  };

  const handleAddUstencile = () => {
    setUstenciles([...ustencile, newUstencile]);
    setNewUstencile("");
  };

  const handleDeleteUstencile = (ustenciles) => {
    setUstenciles(ustencile.filter((item) => item !== ustenciles));
    setSelectedUstenciles("");
  };

  const handleEditUstencile = () => {
    setUstenciles(
      ustencile.map((item) => {
        if (item === selectedUstenciles) {
          return newUstencile;
        }
        return item;
      })
    );
    setSelectedUstenciles("");
    setNewUstencile("");
    setEditingUstencile(false);
  };

  const uploadFileHandlerRecette = async (e) => {
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
      setNewRecetteImage(data);
      setNewRecetteImageFile(file);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const handleNewRecetteImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoadingUpload(true);
    setErrorUpload("");
    axios
      .post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        setLoadingUpload(false);
        setNewRecetteImage(response.data);
      })
      .catch((error) => {
        setLoadingUpload(false);
        setErrorUpload(error.message);
      });
  };

  const handleApplicationChange = (index, property, value) => {
    const newApplications = [...application];
    newApplications[index][property] = value;
    setApplications(newApplications);
  };

  const handleRatingChange = (event) => {
    setSousCategorie(event.target.value);
  };
  return (
    <>
      <Helmet>
        <title>Modifier un article Remede naturel</title>
      </Helmet>

      {loadingUpdate && <Chargement></Chargement>}
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
              subtitle="Modifier un Article remede naturel"
            />

            <Typography
              variant="h4"
              textAlign="center"
              paddingTop="20px"
              paddingBottom="20px"
            >
              Modifier l'article: {heroId}
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
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Nom Auteur"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Category"
                          value={catgeory}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          disabled
                          sx={{ gridColumn: "span 2" }}
                        />
                        <Box sx={{ gridColumn: "span 2" }}>
                          <FormControl
                            variant="filled"
                            sx={{ m: 1, minWidth: 120 }}
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
                              <MenuItem value="A base de plantes">
                                A base de plantes
                              </MenuItem>
                              <MenuItem value="Huiles essentielles">
                                Huiles essentielles
                              </MenuItem>
                              <MenuItem value="Infusions et tisanes">
                                Infusions et tisanes
                              </MenuItem>
                              <MenuItem value="Homéopathiques">
                                Homéopathiques
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
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
                                - Liste non ordonnée : - Élément 1 - Élément 2 -
                                Élément 3 |
                              </Typography>
                              <Typography variant="body2">
                                - Liste ordonnée : 1. Élément 1 2. Élément 2 3.
                                Élément 3
                              </Typography>
                              <Typography variant="body2">
                                - Citation :  Ceci est une citation.
                              </Typography>
                              <Typography variant="body2">
                                - Bloc de code : ```javascript const exemple =
                                'Ceci est un exemple de bloc de code';
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
                                --------- | --------- | | Cellule 1 | Cellule 2
                                | | Cellule 3 | Cellule 4 |
                              </Typography>
                              <Typography variant="body2">
                                - Note de bas de page : Ceci est un exemple de
                                note de bas de page[^1]. [^1]: C'est le contenu
                                de la note de bas de page.
                              </Typography>

                              <Typography variant="body2">
                                {/* Contenu Markdown pour afficher la syntaxe prise en charge */}
                              </Typography>

                              <Divider sx={{ my: 2 }} />
                              <Typography variant="h6" gutterBottom>
                                Exemple d'utilisation
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                        <TextField
                          fullWidth
                          type="text"
                          label="Descriptions"
                          value={desc}
                          multiline
                          rows={20}
                          onChange={(e) => setDesc(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />

                        <Box sx={{ gridColumn: "span 1" }}>
                          <ReactMarkdown>{desc}</ReactMarkdown>
                        </Box>

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

                        <Box sx={{ gridColumn: "span 2" }}>
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
                                Liste des Ingredients
                              </Typography>
                            </Box>
                            <Box p="20px">
                              <List>
                                {ingredient.map((ingredients) => (
                                  <ListItem
                                    key={ingredients}
                                    button
                                    selected={
                                      selectedIngredient === ingredients
                                    }
                                    onClick={() =>
                                      handleIngredientClick(ingredients)
                                    }
                                  >
                                    <ListItemText primary={ingredients} />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                          handleDeleteIngredient(ingredients)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                ))}
                              </List>
                              {editing && (
                                <>
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
                                        sx={{ gridColumn: "span 4" }}
                                        label="Ingrédient sélectionné"
                                        value={selectedIngredient}
                                        disabled
                                      />
                                      <TextField
                                        sx={{ gridColumn: "span 3" }}
                                        label="Nouvel ingrédient"
                                        value={newIngredient}
                                        onChange={handleNewIngredientChange}
                                        multiline
                                        rows={3}
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
                                          {newIngredient}
                                        </ReactMarkdown>
                                      </Box>
                                      <Button
                                        fullWidth
                                        sx={{ gridColumn: "span 4" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEditIngredient}
                                        startIcon={<Edit />}
                                      >
                                        Modifier
                                      </Button>
                                    </Box>
                                  </Box>
                                </>
                              )}
                              {!editing && (
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
                                        label="Nouvel Ingredients"
                                        value={newIngredient}
                                        onChange={handleNewIngredientChange}
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
                                          {newIngredient}
                                        </ReactMarkdown>
                                      </Box>
                                      <Button
                                        fullWidth
                                        sx={{ gridColumn: "span 4" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddIngredient}
                                        startIcon={<Add />}
                                      >
                                        Ajouter
                                      </Button>
                                    </Box>
                                  </Box>
                                </div>
                              )}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ gridColumn: "span 2" }}>
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
                                Liste des Ustenciles
                              </Typography>
                            </Box>
                            <Box p="20px">
                              <List>
                                {ustencile.map((ustenciles) => (
                                  <ListItem
                                    key={ustenciles}
                                    button
                                    selected={selectedUstenciles === ustenciles}
                                    onClick={() =>
                                      handleUstencileClick(ustenciles)
                                    }
                                  >
                                    <ListItemText primary={ustenciles} />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                          handleDeleteUstencile(ustenciles)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                ))}
                              </List>
                              {editingUstencile && (
                                <>
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
                                        label="Ustencile sélectionné"
                                        value={selectedUstenciles}
                                        disabled
                                        sx={{ gridColumn: "span 4" }}
                                      />
                                      <TextField
                                        label="Nouvel Ustencile"
                                        value={newUstencile}
                                        onChange={handleNewUstencileChange}
                                        sx={{ gridColumn: "span 3" }}
                                        multiline
                                        rows={3}
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
                                          {newUstencile}
                                        </ReactMarkdown>
                                      </Box>
                                      <Button
                                        sx={{ gridColumn: "span 4" }}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEditUstencile}
                                        startIcon={<Edit />}
                                      >
                                        Modifier
                                      </Button>
                                    </Box>
                                  </Box>
                                </>
                              )}
                              {!editingUstencile && (
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
                                        label="Nouvel Ustenciles"
                                        value={newUstencile}
                                        multiline
                                        rows={3}
                                        onChange={handleNewUstencileChange}
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
                                          {newUstencile}
                                        </ReactMarkdown>
                                      </Box>
                                      <Button
                                        fullWidth
                                        sx={{ gridColumn: "span 4" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddUstencile}
                                        startIcon={<Add />}
                                      >
                                        Ajouter
                                      </Button>
                                    </Box>
                                  </Box>
                                </div>
                              )}
                            </Box>
                          </Box>
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
                                La Recette
                              </Typography>
                            </Box>
                            <Box p="20px">
                              <List>
                                {recette.map((recettes, index) => (
                                  <ListItem
                                    key={index}
                                    button
                                    selected={selectedRecette === recettes}
                                    onClick={() => handleRecetteClick(recettes)}
                                  >
                                    <ListItemText primary={recettes.desc} />
                                    <Box>
                                      <label htmlFor={`recetteImage-${index}`}>
                                        <Avatar
                                          src={
                                            selectedRecette === recettes
                                              ? newRecetteImage ||
                                                selectedRecette.image
                                              : recettes.image
                                          }
                                          sx={{
                                            width: 50,
                                            height: 50,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </label>
                                    </Box>
                                    <ListItemSecondaryAction>
                                      <Stack direction="row" spacing={1}>
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={() =>
                                            handleDeleteRecette(recettes)
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
                                      label="Recette sélectionné"
                                      value={selectedRecipe.desc}
                                      disabled
                                      sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                      label="Nouvel Recette"
                                      value={newRecette}
                                      multiline
                                      rows={5}
                                      onChange={(e) =>
                                        setNewRecette(e.target.value)
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
                                        {newRecette}
                                      </ReactMarkdown>
                                    </Box>
                                  </Box>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ gridColumn: "span 4" }}
                                  >
                                    <Box>
                                      <label htmlFor="profilePhoto">
                                        <Avatar
                                          src={newRecetteImage}
                                          sx={{
                                            width: 50,
                                            height: 50,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </label>
                                    </Box>
                                    <Box>
                                      <TextField
                                        fullWidth
                                        type="file"
                                        onChange={uploadFileHandlerRecette}
                                      />
                                      {loadingUpload && <Chargement />}
                                      {errorUpload && (
                                        <MessageBox severity="error">
                                          {errorUpload}
                                        </MessageBox>
                                      )}
                                    </Box>
                                  </Stack>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleEditRecette}
                                    startIcon={<Edit />}
                                  >
                                    Modifier
                                  </Button>
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
                                        label="Nouvelle Recette"
                                        value={newRecetteName}
                                        sx={{ gridColumn: "span 3" }}
                                        multiline
                                        rows={5}
                                        onChange={(event) =>
                                          setNewRecetteName(event.target.value)
                                        }
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
                                          {newRecetteName}
                                        </ReactMarkdown>
                                      </Box>
                                      <Box sx={{ gridColumn: "span 1" }}>
                                        <label htmlFor="newRecetteImage">
                                          <input
                                            accept="image/*"
                                            id="newRecetteImage"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={
                                              handleNewRecetteImageChange
                                            }
                                          />
                                          <Avatar
                                            src={newRecetteImage}
                                            sx={{
                                              width: 50,
                                              height: 50,
                                              cursor: "pointer",
                                            }}
                                          />
                                        </label>
                                        {loadingUpload && <Chargement />}
                                        {errorUpload && (
                                          <MessageBox severity="error">
                                            {errorUpload}
                                          </MessageBox>
                                        )}
                                      </Box>
                                      <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                          setRecettes([
                                            ...recette,
                                            {
                                              desc: newRecetteName,
                                              image: newRecetteImage,
                                            },
                                          ]);
                                          setEditingRecette(false);
                                        }}
                                        startIcon={<Add />}
                                      >
                                        Ajouter
                                      </Button>
                                    </Box>
                                  </Box>
                                </div>
                              )}
                            </Box>
                          </Box>
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
                                Mode d'emploi
                              </Typography>
                            </Box>
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
                                {application.map((application, index) => (
                                  <>
                                    <TextField
                                      fullWidth
                                      type="text"
                                      label="Mode d'emploie"
                                      value={application.mode}
                                      multiline
                                      rows={10}
                                      required
                                      sx={{ gridColumn: "span 3" }}
                                      onChange={(e) =>
                                        handleApplicationChange(
                                          index,
                                          "mode",
                                          e.target.value
                                        )
                                      }
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
                                        {application.mode}
                                      </ReactMarkdown>
                                    </Box>
                                    <TextField
                                      fullWidth
                                      type="text"
                                      label="Temps D'applications"
                                      value={application.temps}
                                      multiline
                                      rows={10}
                                      required
                                      sx={{ gridColumn: "span 3" }}
                                      onChange={(e) =>
                                        handleApplicationChange(
                                          index,
                                          "temps",
                                          e.target.value
                                        )
                                      }
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
                                        {application.temps}
                                      </ReactMarkdown>
                                    </Box>
                                  </>
                                ))}
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ gridColumn: "span 2" }}>
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
                                Liste des Precautions
                              </Typography>
                            </Box>
                            <Box p="20px">
                              <List>
                                {precaution.map((precautions) => (
                                  <ListItem
                                    key={precautions}
                                    button
                                    selected={
                                      selectedPrecaution === precautions
                                    }
                                    onClick={() =>
                                      handlePrecautionClick(precautions)
                                    }
                                  >
                                    <ListItemText primary={precautions} />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                          handleDeletePrecaution(precautions)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                ))}
                              </List>
                              {editingPrecaution && (
                                <>
                                  <Box p="20px">
                                    <Stack direction="column" spacing={2}>
                                      <TextField
                                        label="Precaution sélectionné"
                                        value={selectedPrecaution}
                                        disabled
                                      />
                                      <TextField
                                        label="Nouvelle Precaution"
                                        value={newPrecaution}
                                        onChange={handleNewPrecautionChange}
                                      />
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEditPrecautions}
                                        startIcon={<Edit />}
                                      >
                                        Modifier
                                      </Button>
                                    </Stack>
                                  </Box>
                                </>
                              )}
                              {!editingPrecaution && (
                                <div>
                                  <Box p="20px">
                                    <Stack direction="column" spacing={2}>
                                      <TextField
                                        label="Nouvelle Precaution"
                                        value={newPrecaution}
                                        onChange={handleNewPrecautionChange}
                                      />
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddPrecaution}
                                        startIcon={<Add />}
                                      >
                                        Ajouter
                                      </Button>
                                    </Stack>
                                  </Box>
                                </div>
                              )}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ gridColumn: "span 2" }}>
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
                                Bibliographie
                              </Typography>
                            </Box>
                            <Box p="20px">
                              <TextField
                                fullWidth
                                type="text"
                                label="Bibliographie"
                                value={bibliographie}
                                onChange={(e) =>
                                  setBibliographie(e.target.value)
                                }
                                multiline
                                rows={4}
                                required
                              />
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

export default HeroEditScreen;

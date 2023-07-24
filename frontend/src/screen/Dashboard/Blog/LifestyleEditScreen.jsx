import { useTheme } from "@emotion/react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
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
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  modificationLifestyle,
  updateLifestyle,
} from "../../../actions/Blog/lifeStyleActions";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";
import { LIFESTYLE_UPDATE_RESET } from "../../../constants/Blog/lifeStyleConstants";
import Header from "../../../Components/Header";
import ReactMarkdown from "react-markdown";

const LifestyleEditScreen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: lifestyleId } = params;
  const [title, setTitle] = useState("");
  const [catgeory, setCategory] = useState("");
  const [sousCategorie, setSousCategorie] = useState(1);
  const [cover, setCover] = useState("");
  const [date, setDate] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [sections, setSections] = useState([]);
  const [conclusion, setConclusion] = useState("");

  const [selectedRecette, setSelectedRecette] = useState("");
  const [newTitre, setNewTitre] = useState("");
  const [newContenu, setNewContenu] = useState("");

  const [newTitreName, setNewTitreName] = useState("");
  const [newContenuName, setNewContenuName] = useState("");
  const [editingRecette, setEditingRecette] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const lifestyleModification = useSelector(
    (state) => state.lifestyleModification
  );
  const { loading, error, lifestyle } = lifestyleModification;
  const lifestyleUpdate = useSelector((state) => state.lifestyleUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = lifestyleUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate("/santé");
    }
    if (!lifestyle || lifestyle._id !== lifestyleId || successUpdate) {
      dispatch({ type: LIFESTYLE_UPDATE_RESET });
      dispatch(modificationLifestyle(lifestyleId));
    } else {
      setCover(lifestyle.cover);
      setCategory(lifestyle.catgeory);
      setTitle(lifestyle.title);
      setSousCategorie(lifestyle.sousCategorie);
      setDate(lifestyle.createdAt.substring(0, 10));
      setSections(lifestyle.sections);
      setIntroduction(lifestyle.introduction);
      setConclusion(lifestyle.conclusion);
    }
  }, [lifestyle, dispatch, lifestyleId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateLifestyle({
        _id: lifestyleId,
        cover,
        catgeory,
        title,
        date,
        introduction,
        sections,
        conclusion,
        sousCategorie,
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

  const handleRatingChange = (event) => {
    setSousCategorie(event.target.value);
  };

  const handleSectionClick = (recipe) => {
    setSelectedRecipe(recipe);
    setEditingRecette(true);
  };

  const handleDeleteSection = (recipe) => {
    setSections(sections.filter((item) => item !== recipe));
    if (selectedRecipe && recipe === selectedRecipe) {
      setSelectedRecipe(null);
      setEditingRecette(false);
    }
  };

  const handleEditSections = () => {
    const updatedSections = sections.map((item) => {
      if (item === selectedRecipe) {
        return {
          ...selectedRecipe,
          titre: newTitre || selectedRecipe.titre,
          contenu: newContenu || selectedRecipe.contenu,
        };
      }
      return item;
    });
    setSections(updatedSections);
    setNewTitre("");
    setNewContenu("");
  };
  return (
    <>
      <Helmet>
        <title>Modifier un article Sante Naturelle</title>
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
              subtitle="Modifier un Article Sante Naturelle"
            />
            <Typography
              variant="h4"
              textAlign="center"
              paddingTop="20px"
              paddingBottom="20px"
            >
              Modifier l'article: {lifestyleId}
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
                          label="Date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          sx={{ gridColumn: "span 1" }}
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

                        <Box sx={{ gridColumn: "span 1" }}>
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
                              <MenuItem value="Les enfants">
                                Les enfants
                              </MenuItem>
                              <MenuItem value="Les femmes">Les femmes</MenuItem>
                              <MenuItem value="Les sportifs">
                                Les sportifs
                              </MenuItem>
                              <MenuItem value="la grossesse et l'allaitement">
                                la grossesse et l'allaitement
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
                              label="Introduction"
                              value={introduction}
                              multiline
                              rows={20}
                              onChange={(e) => setIntroduction(e.target.value)}
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
                              <ReactMarkdown>{introduction}</ReactMarkdown>
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
                                    Contenues
                                  </Typography>
                                </Box>
                                <Box p="20px">
                                  <List>
                                    {sections.map((section, index) => (
                                      <ListItem
                                        key={section}
                                        button
                                        selected={selectedRecette === section}
                                        onClick={() =>
                                          handleSectionClick(section)
                                        }
                                      >
                                        <ListItemText primary={section.titre} />
                                        <ListItemSecondaryAction>
                                          <Stack direction="row" spacing={1}>
                                            <IconButton
                                              edge="end"
                                              aria-label="delete"
                                              onClick={() =>
                                                handleDeleteSection(section)
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
                                          label="Contenu sélectionné"
                                          value={selectedRecipe.contenu}
                                          disabled
                                        />
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
                                            value={newTitre}
                                            onChange={(e) =>
                                              setNewTitre(e.target.value)
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                          />
                                          <TextField
                                            label="Nouveau Contenu"
                                            value={newContenu}
                                            multiline
                                            rows={16}
                                            onChange={(e) =>
                                              setNewContenu(e.target.value)
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
                                              {newContenu}
                                            </ReactMarkdown>
                                          </Box>
                                        </Box>

                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={handleEditSections}
                                          startIcon={<Edit />}
                                        >
                                          Modifier
                                        </Button>
                                      </Stack>
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
                                            label="Nouveau Contenu"
                                            value={newContenuName}
                                            multiline
                                            rows={16}
                                            onChange={(e) =>
                                              setNewContenuName(e.target.value)
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
                                              {newContenuName}
                                            </ReactMarkdown>
                                          </Box>
                                        </Box>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          sx={{ gridColumn: "span 4" }}
                                          onClick={() => {
                                            setSections([
                                              ...sections,
                                              {
                                                titre: newTitreName,
                                                contenu: newContenuName,
                                              },
                                            ]);
                                            setEditingRecette(false);
                                            setNewTitreName("");
                                            setNewContenuName("");
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
                              onChange={(e) => setConclusion(e.target.value)}
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

export default LifestyleEditScreen;

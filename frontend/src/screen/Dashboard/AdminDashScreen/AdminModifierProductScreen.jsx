import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from "../../../constants/productConstants";
import { detailsProduct, updateProduct } from "../../../actions/productActions";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Add, Delete, Edit } from "@mui/icons-material";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";
import { Helmet } from "react-helmet-async";
import Header from "../../../Components/Header";

const AdminModifierProductScreen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [solde, setSolde] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setphotoURL] = useState([]);
  const [features, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [editing, setEditing] = useState(false);

  const [notices, setNotices] = useState([]);
  const [selectedNotices, setSelectedNotices] = useState("");
  const [newNotices, setNewNotices] = useState("");
  const [editingNotices, setEditingNotices] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate("/product");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setNom(product.nom);
      setPrix(product.prix);
      setSolde(product.solde);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
      setphotoURL(product.photoUrl);
      setIngredients(product.features);
      setNotices(product.notices);
    }
  }, [product, dispatch, productId, successUpdate, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        nom,
        prix,
        solde,
        image,
        category,
        brand,
        countInStock,
        description,
        photoUrl,
        features,
        notices,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const [loadingUploade, setLoadingUploade] = useState(false);
  const [errorUploade, setErrorUploade] = useState("");

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
        setImage(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    } else {
      // gérer le cas où aucun fichier n'a été sélectionné
    }
  };

  // const onDrop = useCallback((acceptedFiles) => {
  //   setphotoURL(acceptedFiles);
  // }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setphotoURL(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditing(true);
  };

  const handleNewIngredientChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([...features, newIngredient]);
    setNewIngredient("");
  };

  const handleDeleteIngredient = (ingredient) => {
    setIngredients(features.filter((item) => item !== ingredient));
    setSelectedIngredient("");
  };

  const handleEditIngredient = () => {
    setIngredients(
      features.map((item) => {
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
  const handleNoticeClick = (notice) => {
    setSelectedIngredient(notice);
    setEditingNotices(true);
  };

  const handleNewNoticeChange = (event) => {
    setNewNotices(event.target.value);
  };

  const handleAddNotices = () => {
    setNotices([...notices, newNotices]);
    setNewNotices("");
  };

  const handleDeleteNotices = (notice) => {
    setNotices(notices.filter((item) => item !== notice));
    setSelectedNotices("");
  };

  const handleEditNotices = () => {
    setNotices(
      notices.map((item) => {
        if (item === selectedNotices) {
          return newNotices;
        }
        return item;
      })
    );
    setSelectedNotices("");
    setNewNotices("");
    setEditingNotices(false);
  };
  return (
    <>
      <Helmet>
        <title>Modifier un Produit</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="MODIFICATION" subtitle="Modifier le Produit" />
        <Typography
          variant="h4"
          textAlign="center"
          paddingTop="20px"
          paddingBottom="20px"
        >
          Modifier le Produit: {productId}
        </Typography>
        {loadingUpdate && <Chargement></Chargement>}
        {errorUpdate && <MessageBox severity="error">{errorUpdate}</MessageBox>}
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
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
                      label="Nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Solde"
                      value={solde}
                      onChange={(e) => setSolde(e.target.value)}
                      required
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Prix"
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                      required
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Quantite en Stock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      type="text"
                      label="Categorie"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      sx={{ gridColumn: "span 4" }}
                    />
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
                          <Typography varaint="h3" textTransform={"uppercase"}>
                            Photo du premier Plan
                          </Typography>
                        </Box>
                        <Box p="20px">
                          <img
                            src={image}
                            style={{ with: "300px", height: "500px" }}
                            alt="illustration"
                          />
                        </Box>
                        <Box p="20px">
                          <Typography variant="h5">
                            Choisissez une Image
                          </Typography>
                        </Box>
                        <Box>
                          <input
                            type="file"
                            id="imageFile"
                            label="Choose Image"
                            onChange={uploadFileHandler}
                          ></input>
                          {loadingUpload && <Chargement />}
                          {errorUpload && (
                            <MessageBox variant="danger">
                              {errorUpload}
                            </MessageBox>
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
                          <Typography varaint="h3" textTransform={"uppercase"}>
                            Galeries des Photos
                          </Typography>
                        </Box>

                        <Box>
                          <Paper
                            sx={{
                              cursor: "pointer",
                              background: "#fafafa",
                              color: "#bdbdbd",
                              height: "10vh",
                              border: "1px dashed #ccc",
                              "&:hover": { border: "1px solid #ccc" },
                            }}
                          >
                            <div
                              style={{ padding: "16px" }}
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              {isDragActive ? (
                                <p style={{ color: "green" }}>
                                  Drop the files here...
                                </p>
                              ) : (
                                <p>
                                  Drag 'n' Drop some files here, or click to
                                  select files
                                </p>
                              )}
                              <em>
                                (images with *.jpeg, *.png, *.jpg extension will
                                be accepted)
                              </em>
                            </div>
                          </Paper>
                          <Box>
                            <ImageList
                              rowHeight={250}
                              sx={{
                                "&.MuiImageList-root": {
                                  gridTemplateColumns:
                                    "repeat(auto-fill, minmax(250px, 1fr))!important",
                                },
                              }}
                            >
                              {photoUrl.map((image, index) => (
                                <ImageListItem key={index} cols={1} rows={1}>
                                  <img
                                    src={image}
                                    alt="rooms"
                                    loading="lazy"
                                    style={{ height: "100%" }}
                                  />
                                  <ImageListItemBar
                                    position="top"
                                    sx={{
                                      background:
                                        "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                                    }}
                                    actionIcon={
                                      <IconButton
                                        sx={{ color: "white" }}
                                        onClick={() => {
                                          const newFiles = [...photoUrl];
                                          newFiles.splice(index, 1);
                                          setphotoURL(newFiles);
                                        }}
                                      >
                                        <Delete />
                                      </IconButton>
                                    }
                                  ></ImageListItemBar>
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </Box>
                          <Box>
                            <Button
                              variant="contained"
                              fullWidth
                              sx={{
                                boxShadow: "none",
                                color: "white",
                                borderRadius: 0,
                                padding: "15px 40px",
                                backgroundColor: theme.palette.primary[600],
                                border: "1px solid",
                                borderColor: theme.palette.secondary.main,
                                mt: "10px",
                              }}
                              onClick={async () => {
                                setLoadingUploade(true);
                                setErrorUploade("");
                                const formData = new FormData();
                                for (let i = 0; i < photoUrl.length; i++) {
                                  formData.append("images", photoUrl[i]);
                                }

                                try {
                                  const { data } = await axios.post(
                                    "/api/uploads/multi",
                                    formData,
                                    {
                                      headers: {
                                        "Content-Type": "multipart/form-data",
                                        Authorization: `Bearer ${userInfo.token}`,
                                      },
                                    }
                                  );
                                  setphotoURL(data);
                                  setLoadingUploade(false);
                                } catch (error) {
                                  setErrorUploade(error.message);
                                }
                                setLoadingUploade(false);
                              }}
                              disabled={loadingUpload || photoUrl.length === 0}
                            >
                              Upload
                            </Button>
                            {loadingUpload && <CircularProgress />}
                            {errorUpload && <div>{errorUpload}</div>}
                            {/* {uploadSuccess && <div>Upload successful!</div>} */}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  sx={{ gridColumn: "span 4" }}
                />
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
                      <Typography varaint="h3" textTransform={"uppercase"}>
                        Liste des Ameliorations Features
                      </Typography>
                    </Box>
                    <Box p="20px">
                      <List>
                        {features.map((ingredient) => (
                          <ListItem
                            key={ingredient}
                            button
                            selected={selectedIngredient === ingredient}
                            onClick={() => handleIngredientClick(ingredient)}
                          >
                            <ListItemText primary={ingredient} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() =>
                                  handleDeleteIngredient(ingredient)
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
                            <Stack direction="column" spacing={2}>
                              <TextField
                                label="Ingrédient sélectionné"
                                value={selectedIngredient}
                                disabled
                              />
                              <TextField
                                label="Nouvel ingrédient"
                                value={newIngredient}
                                onChange={handleNewIngredientChange}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEditIngredient}
                                startIcon={<Edit />}
                              >
                                Modifier
                              </Button>
                            </Stack>
                          </Box>
                        </>
                      )}
                      {!editing && (
                        <div>
                          <Box p="20px">
                            <Stack direction="column" spacing={2}>
                              <TextField
                                label="Nouvel Feature"
                                value={newIngredient}
                                onChange={handleNewIngredientChange}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddIngredient}
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
                      <Typography varaint="h3" textTransform={"uppercase"}>
                        La Notice
                      </Typography>
                    </Box>
                    <Box p="20px">
                      <List>
                        {notices.map((notice) => (
                          <ListItem
                            key={notice}
                            button
                            selected={selectedNotices === notice}
                            onClick={() => handleNoticeClick(notice)}
                          >
                            <ListItemText primary={notice} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDeleteNotices(notice)}
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                      {editingNotices && (
                        <>
                          <Box p="20px">
                            <Stack direction="column" spacing={2}>
                              <TextField
                                label="Notice sélectionné"
                                value={selectedNotices}
                                disabled
                              />
                              <TextField
                                label="Nouvel Notices"
                                value={newNotices}
                                onChange={handleNewNoticeChange}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleEditNotices}
                                startIcon={<Edit />}
                              >
                                Modifier
                              </Button>
                            </Stack>
                          </Box>
                        </>
                      )}
                      {!editingNotices && (
                        <div>
                          <Box p="20px">
                            <Stack direction="column" spacing={2}>
                              <TextField
                                label="Nouvelle Notice"
                                value={newNotices}
                                onChange={handleNewNoticeChange}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddNotices}
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
                <Box
                  display="flex"
                  justifyContent="space-between"
                  gap="50px"
                  mt="30px"
                  sx={{ gridColumn: "span 4" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    type="submit"
                  >
                    Modifier
                  </Button>
                </Box>
              </Box>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default AdminModifierProductScreen;

import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../../../constants/productConstants";
import {
  createProduct,
  deleteProduct,
  listProduits,
} from "../../../actions/productActions";
import { listTopSellers } from "../../../actions/userActions";
import { toast } from "react-toastify";
import FlexBetween from "../../../Components/FlexBetween";
import { Helmet } from "react-helmet-async";
import Header from "../../../Components/Header";
import Chargement from "../../../Components/Chargement";
import MessageBox from "../../../Components/MessageBox";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AdminProductScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const produitList = useSelector((state) => state.produitList);
  const { loading, error, products } = produitList;
  const productCreate = useSelector((state) => state.productCreate);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      toast.info("Produit creer avec Succès");
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      toast.info("Produit Supprimer avec Succès");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProduits());
    dispatch(listTopSellers());
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
    setOpen(false);
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  const handleClickOpen = (productId) => {
    // Set the orderId in the state before opening the dialog
    setSelectedOrderId(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title>Les produits</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="PRODUITS" subtitle="Liste complete des produits" />

        {loadingDelete && <Chargement />}
        {errorDelete && <MessageBox severity="error">{errorDelete}</MessageBox>}

        {loadingCreate && <Chargement />}
        {errorCreate && <MessageBox severity="error">{errorCreate}</MessageBox>}

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
                  Ajouter un produit
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
              {products.map((product) => (
                <>
                  <Card
                    sx={{
                      backgroundImage: "none",
                      backgroundColor: theme.palette.background.alt,
                      borderRadius: "0.55rem",
                    }}
                    key={product._id}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color={theme.palette.secondary[700]}
                        gutterBottom
                      >
                        {product.category}
                      </Typography>
                      <FlexBetween>
                        <Typography variant="h5" component="div">
                          {product.nom}
                        </Typography>
                        <Avatar
                          src={product.image}
                          sx={{
                            width: 70,
                            height: 70,
                          }}
                        />
                      </FlexBetween>
                      <Typography
                        sx={{ mb: "1.5rem" }}
                        color={theme.palette.secondary[400]}
                      >
                        ${Number(product.prix).toFixed(2)}
                      </Typography>
                      <Rating value={product.rating} readOnly />

                      <Typography variant="body2">
                        {product.description}
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
                        <Typography>id: {product._id}</Typography>
                        <Typography>Seller : {product.seller.name}</Typography>
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
                              navigate(`/product/${product._id}/edit`)
                            }
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => handleClickOpen(product)}
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

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography variant="h4">Confirmation de Suppression</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Vous êtes sûr de vouloir supprimer cette commande ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleClose}>
            Non
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteHandler(selectedOrderId)}
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminProductScreen;

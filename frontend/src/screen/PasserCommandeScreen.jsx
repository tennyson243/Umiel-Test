import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { affiliateTransaction, createOrder } from "../actions/orderActions";
import { Helmet } from "react-helmet-async";
import { Box, Stack, useTheme } from "@mui/system";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../Components/FlexBetween";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import { createTransaction } from "../actions/transactionAction";
import { TRANSACTION_CREATE_RESET } from "../constants/transactionConstant";
import { affiliateSales } from "../actions/generalAction";
import { AFFILIATESTAT_CREATE_RESET } from "../constants/generalConstant";

const PasserCommandeScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const transactionCreate = useSelector((state) => state.transactionCreate);
  const affiliateSalesRequest = useSelector(
    (state) => state.affiliateSalesRequest
  );
  const {
    loading: loadingAffiliateState,
    error: errorAffiliateState,
    success: successAffilisateState,
  } = affiliateSalesRequest;
  const [produit, setProduit] = useState(
    cart.cartItems.map((item) => item.product)
  );

  const {
    loading: loadingTransaction,
    success: successTransaction,
    error: errorTransaction,
    transaction,
  } = transactionCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  const itemsPrice =
    cart.cartItems.length > 0
      ? toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.prix, 0))
      : 0;
  const shippingPrice =
    cart.livraison > 0 ? toPrice(cart.livraison) : toPrice(0);
  const taxPrice = toPrice(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const updatedCart = {
    ...cart,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const updatedTransaction = {
    ...cart,
    totalPrice,
  };

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...updatedCart, orderItems: cart.cartItems }));
    dispatch(
      createTransaction({
        ...updatedTransaction,
        products: produit,
      })
    );
  };

  useEffect(() => {
    if (success && successTransaction) {
      navigate(`/orders/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: TRANSACTION_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success, successTransaction]);

  useEffect(() => {
    if (successTransaction) {
      const transactionId = transaction._id;
      dispatch(affiliateSales({ transactionId }));
      dispatch({ type: AFFILIATESTAT_CREATE_RESET });
    }
  }, [dispatch, successTransaction, transaction]);

  useEffect(() => {
    if (success && successTransaction) {
      const transactionId = transaction._id;
      const orderId = order._id;
      dispatch(affiliateTransaction({ transactionId, orderId }));
      console.log(transactionId, orderId);
    }
  }, [dispatch, order, navigate, success, successTransaction, transaction]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const steps = [
    "Connexion",
    "Adresse de Livraison",
    "Methode de Paiement",
    "Paiement",
  ];

  return (
    <>
      <Helmet>
        <title>Confirmation Payement</title>
      </Helmet>
      <Box width="80%" m="100px auto">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={3} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                Facturation
              </Typography>
            </Box>
            <Box p="20px">
              <Stack direction="row" spacing={1}>
                <Typography variant="h6"> Nom:</Typography>
                <Typography variant="h6">{cart.shippingAddress.nom}</Typography>
                <Typography variant="h6">
                  {cart.shippingAddress.postnom}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="h6"> Telephone:</Typography>
                <Typography variant="h6">
                  {cart.shippingAddress.telephone}
                </Typography>
              </Stack>
              <Box
                textAlign={"center"}
                p="8px"
                backgroundColor={theme.palette.primary.main}
              >
                <Typography varaint="h6">Adresse</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Typography variant="h6">
                  {cart.shippingAddress.pays}, {cart.shippingAddress.province},
                  {cart.shippingAddress.ville}, {cart.shippingAddress.street1}
                </Typography>
              </Stack>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                padding: "15px 40px",
                backgroundColor: theme.palette.primary[600],
                border: "1px solid",
                borderColor: theme.palette.secondary.main,
              }}
              onClick={() => {
                navigate("/AdresseLivraison");
              }}
            >
              Modifier
            </Button>
          </Box>

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
                Methode de Paiement
              </Typography>
            </Box>
            <Box p="20px">
              <Stack direction="row" spacing={1}>
                <Typography variant="h6"> Methode:</Typography>
                <Typography variant="h6">{cart.paymentMethod}</Typography>
              </Stack>
            </Box>
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
              }}
              onClick={() => {
                navigate("/payment");
              }}
            >
              Modifier
            </Button>
          </Box>
        </Box>
        <Box mt="40px" mb="20px">
          <Box
            textAlign={"center"}
            backgroundColor={theme.palette.primary.main}
            p="15px"
          >
            <Typography varaint="h3" textTransform={"uppercase"}>
              Vos Produits
            </Typography>
          </Box>
          <Box>
            <TableContainer overflowX="auto" minHeight="0.01%">
              <Table
                background="#fff none repeat scroll 0 0"
                borderColor="#c1c1c1"
                borderRadius="0"
                borderStyle="solid"
                borderWidth="1px 0 0 1px"
                margin=" 0 0 50px"
                textAlign="center"
                width="100%"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderTop: "medium none",
                        fontWeight: "bold",
                        padding: "20px 10px",
                        textAlign: " center",
                        textTransform: "uppercase",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #c1c1c1",
                        borderRight: " 1px solid #c1c1c1",
                        background: `${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <TableCell className="product-thumbnail">Image</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Quantite</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        width="130px"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                        }}
                      >
                        <Link to={`/produits/${item.slug}`}>
                          <img src={item.image} alt={item.nom} />
                        </Link>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                          textTransform: "uppercase",
                        }}
                      >
                        <Typography
                          variant="h5"
                          onClick={() => navigate(`api/produits/${item.slug}}`)}
                        >
                          {item.nom}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize="15px"
                        fontWeight=" 700px"
                        color=" #777"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                          textTransform: "uppercase",
                        }}
                      >
                        <Typography variant="h5">{item.prix} $</Typography>
                      </TableCell>
                      <TableCell
                        width="180px"
                        font-size="20px"
                        letter-spacing="6px"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                          textTransform: "uppercase",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              border: `1px solid ${theme.palette.secondary.main}`,
                              p: 2,
                            }}
                          >
                            {item.qty} x {item.prix} $ = {item.qty * item.prix}{" "}
                            $
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
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
            }}
          >
            <Link to="/panier"></Link> Modifier
          </Button>
        </Box>
        <Box mt="10px" backgroundColor={theme.palette.background.alt}>
          <Box
            textAlign={"center"}
            backgroundColor={theme.palette.primary.main}
            p="15px"
          >
            <Typography varaint="h3" textTransform={"uppercase"}>
              Resumer de la commande
            </Typography>
          </Box>
          <Box p="20px">
            <Box>
              <FlexBetween borderBottom={"2px solid red"} pb="20px">
                <Typography>Produits :</Typography>
                <Typography>{updatedCart.itemsPrice.toFixed(2)} $</Typography>
              </FlexBetween>
              <FlexBetween borderBottom={"2px solid red"} pb="20px" pt={"10px"}>
                <Typography>Livraison :</Typography>
                <Typography>
                  {updatedCart.shippingPrice.toFixed(2)} $
                </Typography>
              </FlexBetween>
              <FlexBetween borderBottom={"2px solid red"} pb="20px" pt={"10px"}>
                <Typography>Taxe: </Typography>
                <Typography>{updatedCart.taxPrice.toFixed(2)} $</Typography>
              </FlexBetween>
              <Box>
                <FlexBetween pt={"10px"}>
                  <Typography variant="h4">Total Commande :</Typography>
                  <Typography variant="h4">
                    {updatedCart.totalPrice.toFixed(2)} $
                  </Typography>
                </FlexBetween>
              </Box>
            </Box>
          </Box>
        </Box>
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
          }}
          type="button"
          onClick={placeOrderHandler}
          disabled={cart.cartItems === 0}
        >
          Confirmer la Commande
        </Button>
        <Box>
          {loading && <Chargement />}
          {error && <MessageBox severity="error">{error}</MessageBox>}
        </Box>
      </Box>
    </>
  );
};

export default PasserCommandeScreen;

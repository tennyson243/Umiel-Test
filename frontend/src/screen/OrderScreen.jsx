import { useTheme } from "@emotion/react";
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
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
// import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import Chargement from "../Components/Chargement";
import EnTete from "../Components/EnTete";
import MessageBox from "../Components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import FlexBetween from "../Components/FlexBetween";

const OrderScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const { id: orderId } = params;

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  const steps = [
    "Connexion",
    "Adresse de Livraison",
    "Methode de Paiement",
    "Paiement",
  ];
  return loading ? (
    <Chargement />
  ) : error ? (
    <MessageBox severity='error'>{error}</MessageBox>
  ) : (
    <>
      <EnTete title='Detail de votre Commande' />
      <Box width='90%' m='100px auto'>
        <Helmet>
          <title>Commande {order._id}</title>
        </Helmet>

        <Box>
          <Stepper activeStep={4} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Typography
          variant='h6'
          textAlign='center'
          paddingTop='20px'
          paddingBottom='20px'
        >
          Commande {order._id}
        </Typography>
        <Box
          display='grid'
          gap='15px'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box
            mt='10px'
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 2" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p='15px'
            >
              <Typography varaint='h3' textTransform={"uppercase"}>
                Facturation
              </Typography>
            </Box>
            <Box p='20px'>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6'> Nom:</Typography>
                <Typography variant='h6'>
                  {order.shippingAddress.nom}
                </Typography>
                <Typography variant='h6'>
                  {order.shippingAddress.postnom}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6'> Telephone:</Typography>
                <Typography variant='h6'>
                  {order.shippingAddress.telephone}
                </Typography>
              </Stack>
              <Box
                textAlign={"center"}
                p='8px'
                backgroundColor={theme.palette.primary.main}
              >
                <Typography varaint='h6'>Adresse</Typography>
              </Box>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6'>
                  {order.shippingAddress.pays}, {order.shippingAddress.province}
                  ,{order.shippingAddress.ville},{" "}
                  {order.shippingAddress.street1}
                </Typography>
              </Stack>
              <Box>
                {order.isDelivered ? (
                  <Stack spacing={2}>
                    <MessageBox severity='success'>
                      Livraison effectué le {order.deliveredAt}
                    </MessageBox>
                  </Stack>
                ) : (
                  <Stack spacing={2}>
                    <MessageBox severity='warning'>
                      Livriason non effectué
                    </MessageBox>
                  </Stack>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            mt='10px'
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 2" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p='15px'
            >
              <Typography varaint='h3' textTransform={"uppercase"}>
                Methode de Paiement
              </Typography>
            </Box>
            <Box p='20px'>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6'> Methode:</Typography>
                <Typography variant='h6'>{order.paymentMethod}</Typography>
              </Stack>
              <Box>
                {order.isPaid ? (
                  <Stack spacing={2}>
                    <MessageBox severity='success'>
                      Payement effectué le {order.paidAt}
                    </MessageBox>
                  </Stack>
                ) : (
                  <Stack spacing={2}>
                    <MessageBox severity='warning'>
                      Payement non Effecté
                    </MessageBox>
                  </Stack>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt='40px' mb='20px'>
          <Box
            textAlign={"center"}
            backgroundColor={theme.palette.primary.main}
            p='15px'
          >
            <Typography varaint='h3' textTransform={"uppercase"}>
              Vos Produits
            </Typography>
          </Box>
          <Box>
            <TableContainer overflowX='auto' minHeight='0.01%'>
              <Table
                background='#fff none repeat scroll 0 0'
                borderColor='#c1c1c1'
                borderRadius='0'
                borderStyle='solid'
                borderWidth='1px 0 0 1px'
                margin=' 0 0 50px'
                textAlign='center'
                width='100%'
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
                    <TableCell className='product-thumbnail'>Image</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Quantite</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item.product}>
                      <TableCell
                        width='130px'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                        }}
                      >
                        <Link to={`/produits/${item.product}`}>
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
                          variant='h5'
                          onClick={() => navigate(`api/produits/${item.slug}}`)}
                        >
                          {item.nom}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                          textTransform: "uppercase",
                        }}
                      >
                        <Typography variant='h5'>{item.prix} $</Typography>
                      </TableCell>
                      <TableCell
                        width='180px'
                        font-size='20px'
                        letter-spacing='6px'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                          textTransform: "uppercase",
                        }}
                      >
                        <Box>
                          <Typography
                            variant='h6'
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
        </Box>
        <Box mt='10px' backgroundColor={theme.palette.background.alt}>
          <Box
            textAlign={"center"}
            backgroundColor={theme.palette.primary.main}
            p='15px'
          >
            <Typography varaint='h3' textTransform={"uppercase"}>
              Resumer de la commande
            </Typography>
          </Box>
          <Box p='20px'>
            <Box>
              <FlexBetween borderBottom={"2px solid red"} pb='20px'>
                <Typography>Produits :</Typography>
                <Typography>{order.itemsPrice.toFixed(2)} $</Typography>
              </FlexBetween>
              <FlexBetween borderBottom={"2px solid red"} pb='20px' pt={"10px"}>
                <Typography>Livraison :</Typography>
                <Typography>{order.shippingPrice.toFixed(2)} $</Typography>
              </FlexBetween>
              <FlexBetween borderBottom={"2px solid red"} pb='20px' pt={"10px"}>
                <Typography>Taxe: </Typography>
                <Typography>{order.taxPrice.toFixed(2)} $</Typography>
              </FlexBetween>
              <Box>
                <FlexBetween pt={"10px"}>
                  <Typography variant='h4'>Total Commande :</Typography>
                  <Typography variant='h4'>
                    {order.totalPrice.toFixed(2)} $
                  </Typography>
                </FlexBetween>
              </Box>
            </Box>
          </Box>
          {!order.isPaid && (
            <Box
              mt='10px'
              backgroundColor={theme.palette.background.alt}
              sx={{ gridColumn: "span 2" }}
            >
              {!sdkReady ? (
                <Chargement />
              ) : (
                <>
                  {errorPay && (
                    <MessageBox severity='error'>{errorPay}</MessageBox>
                  )}
                  {loadingPay && <Chargement />}
                  <Box
                    textAlign={"center"}
                    backgroundColor={theme.palette.primary.main}
                    p='15px'
                  >
                    {/* <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton> */}
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <Box m='30px'>
            {loadingDeliver && <Chargement />}
            {errorDeliver && (
              <MessageBox severity='error'>{errorDeliver}</MessageBox>
            )}
            <Button
              fullWidth
              variant='contained'
              color='success'
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                padding: "15px 40px",
                border: "1px solid",
                borderColor: theme.palette.secondary.main,
                gridColumn: "span 4",
              }}
              onClick={deliverHandler}
            >
              EFFECTUER LA LIVRAISON
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default OrderScreen;

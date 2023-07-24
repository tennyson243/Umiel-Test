import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import FlexBetween from "../Components/FlexBetween";
import EnTete from "../Components/EnTete";

const PayementMethode = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  const steps = [
    "Connexion",
    "Adresse de Livraison",
    "Methode de Paiement",
    "Paiement",
  ];
  return (
    <>
      <EnTete title='Methode de Paiement' />
      <Box width='80%' m='100px auto'>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Helmet>
          <title>Methode de Paiement</title>
        </Helmet>
        <form onSubmit={submitHandler}>
          <FlexBetween
            mb='30px'
            mt='30px'
            sx={{
              backgroundColor: theme.palette.background.alt,
              p: "20px",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: {
                xs: "normal",
                sm: "center",
              },
            }}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value='PayPal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                }
                label='PayPal'
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value='Stripe'
                    name='paymentMethod'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                }
                label='Stripe'
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value='Airtel Money'
                    name='paymentMethod'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                }
                label='Airtel Money'
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value='Orange Money'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    name='paymentMethod'
                  />
                }
                label='Orange Money'
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value='M-Pesa'
                    checked={paymentMethod === "M-pesa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                }
                label='M-Pesa'
              />
            </Box>
          </FlexBetween>
          <Box display='flex' justifyContent='space-between' gap='50px'>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              sx={{
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
              onClick={() => navigate("/shipping")}
            >
              Back
            </Button>

            <Button
              fullWidth
              type='submit'
              color='primary'
              variant='contained'
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                padding: "15px 40px",
              }}
            >
              Continuer
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default PayementMethode;

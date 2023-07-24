import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import EnTete from "../Components/EnTete";

const ShippingAdressScreen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    navigate("/signin");
  }
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  const [nom, setNom] = useState(shippingAddress.nom || " ");
  const [postnom, setPostnom] = useState(shippingAddress.postnom || " ");
  const [email, setEmail] = useState(shippingAddress.email || " ");
  const [telephone, setTelephone] = useState(shippingAddress.telephone || " ");
  const [ville, setVille] = useState(shippingAddress.ville || " ");
  const [pays, setPays] = useState(shippingAddress.pays || " ");
  const [street1, setStreet1] = useState(shippingAddress.street1 || " ");
  const [street2, setStreet2] = useState(shippingAddress.street2 || " ");
  const [province, setProvince] = useState(shippingAddress.province || " ");
  const [codePostal, setCodePostal] = useState(
    shippingAddress.codePostal || " "
  );
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          nom,
          postnom,
          street1,
          street2,
          ville,
          pays,
          telephone,
          codePostal,
          province,
          email,
          lat: newLat,
          lng: newLng,
        })
      );
      navigate("/payment");
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        nom,
        postnom,
        street1,
        street2,
        ville,
        pays,
        telephone,
        codePostal,
        province,
        email,
        lat,
        lng,
      })
    );
    navigate("/map");
  };
  const steps = [
    "Connexion",
    "Adresse de Livraison",
    "Methode de Paiement",
    "Paiement",
  ];
  return (
    <>
      <>
        <>
          <Helmet>
            <title>Facturation</title>
          </Helmet>
          <EnTete title='Facturation' />
          <Box width='80%' m='100px auto'>
            <Box>
              <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <form onSubmit={submitHandler}>
              <Box
                display='grid'
                gap='15px'
                gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  type='text'
                  label='Nom'
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Post-Nom'
                  value={postnom}
                  onChange={(e) => setPostnom(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Telephone'
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Pays'
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  required
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Adresse'
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Adresse pour Motard (optional)'
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                  required
                  sx={{ gridColumn: "span 1" }}
                />
                <Box sx={{ gridColumn: "span 1" }}>
                  <Button onClick={chooseOnMap}>Choisissez sur la carte</Button>
                </Box>
                <TextField
                  fullWidth
                  type='text'
                  label='Ville'
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  required
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Province'
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                  sx={{ gridColumn: "1fr" }}
                />
                <TextField
                  fullWidth
                  type='text'
                  label='Code Postal'
                  value={codePostal}
                  onChange={(e) => setCodePostal(e.target.value)}
                  required
                  sx={{ gridColumn: "1fr" }}
                />
              </Box>
              <Box
                display='flex'
                justifyContent='space-between'
                gap='50px'
                mt='30px'
              >
                <Button
                  fullWidth
                  variant='contained'
                  sx={{
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                  type='submit'
                >
                  Continuer
                </Button>
              </Box>
            </form>
          </Box>
        </>
      </>
    </>
  );
};

export default ShippingAdressScreen;

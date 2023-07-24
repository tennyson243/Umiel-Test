import React from "react";
import EnTete from "../Components/EnTete";
import { Helmet } from "react-helmet-async";
import MessageBox from "../Components/MessageBox";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FlexBetween from "../Components/FlexBetween";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addToCart,
  removeFromCart,
  saveLivraison,
} from "../actions/cartActions";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";

import { useTheme } from "@emotion/react";

import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Panier = () => {
  const [isLivraison, setLivraison] = useState(false);
  const [selectLocalisation, setSelectLocalisation] = useState("");
  const [isPrixLivraison, setPrixLivraison] = useState(0);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  const handleLocalisationChange = (event) => {
    setSelectLocalisation(event.target.value);
  };

  const handleCalculer = () => {
    if (selectLocalisation !== "") {
      setPrixLivraison(selectLocalisation.value);
    }
  };
  const handleLivraisonChange = (event) => {
    setLivraison(event.target.checked);
  };
  const handlePrixLivraisonChange = (event) => {
    setPrixLivraison(event.target.value);
  };

  const localisations = [
    { label: "Goma", value: 1 },
    { label: "Bukavu", value: 3 },
    { label: "Kishansa", value: 4 },
    { label: "lubumbashi", value: 5 },
  ];

  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    dispatch(saveLivraison(isPrixLivraison));
    navigate("/signin?redirect=/shipping");
  };
  return (
    <>
      <Helmet>
        <title>Votre Panier</title>
      </Helmet>
      <EnTete title='Panier' />
      {cartItems.length === 0 ? (
        <MessageBox severity='warning'>
          Votre Panier est vide. <Link to='/shop'>Allez a la boutique</Link>
        </MessageBox>
      ) : (
        <Box m='1rem 1rem'>
          <Box mt='40px' mb='20px'>
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
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
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
                            onClick={() =>
                              navigate(`api/produits/${item.product}}`)
                            }
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
                          <Box display='flex'>
                            <IconButton
                              sx={{
                                borderRadius: 0,
                                background: `${theme.palette.primary.main}`,
                              }}
                              onClick={() =>
                                dispatch(
                                  addToCart(item.product, Number(item.qty - 1))
                                )
                              }
                              disabled={item.qty === 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography
                              variant='h6'
                              sx={{
                                border: `1px solid ${theme.palette.secondary.main}`,
                                p: 2,
                              }}
                            >
                              {item.qty}
                            </Typography>
                            <IconButton
                              sx={{
                                borderRadius: 0,
                                background: `${theme.palette.primary.main}`,
                              }}
                              disabled={item.qty === item.countInStock}
                              onClick={() =>
                                dispatch(
                                  addToCart(item.product, Number(item.qty + 1))
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell
                          color='#919191'
                          display='inline-block'
                          fontSize='20px'
                          height=' 40px'
                          lineHeight='40px'
                          textAlign='center'
                          width='200px'
                          sx={{
                            textAlign: " center",
                            textTransform: "uppercase",
                          }}
                        >
                          <IconButton
                            sx={{
                              borderRadius: 0,
                              background: `${theme.palette.primary.main}`,
                            }}
                          >
                            <Delete
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <FlexBetween>
            <Box mt='10px' backgroundColor={theme.palette.background.alt}>
              <Button variant='contained'>Continuer le shopping</Button>
            </Box>
          </FlexBetween>
          <Box
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(3, minmax(0, 1fr))'
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Box mt='10px' backgroundColor={theme.palette.background.alt}>
              <Box
                textAlign={"center"}
                backgroundColor={theme.palette.primary.main}
                p='15px'
              >
                <Typography varaint='h3' textTransform={"uppercase"}>
                  Coupon
                </Typography>
              </Box>
              <Box textAlign={"center"} p='15px'>
                <Typography varaint='h3' textTransform={"uppercase"}>
                  Entrer votre code de coupon si vous avez.
                </Typography>
              </Box>
              <Box p={"20px"}>
                <form>
                  <Box
                    display='grid'
                    gap='15px'
                    gridTemplateColumns='repeat(2, minmax(0, 1fr))'
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      type='text'
                      label='Coupon'
                      required
                      sx={{ gridColumn: "span 2" }}
                    />
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      sx={{
                        boxShadow: "none",
                        borderRadius: 0,
                        gridColumn: {
                          xs: "span 4",
                          md: "span 2",
                        },
                      }}
                      type='submit'
                    >
                      Appliquer le code Coupon
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
            <Box mt='10px' backgroundColor={theme.palette.background.alt}>
              <Box
                textAlign={"center"}
                backgroundColor={theme.palette.primary.main}
                p='15px'
              >
                <Typography varaint='h3' textTransform={"uppercase"}>
                  Livraison
                </Typography>
              </Box>
              <Box textAlign={"center"} p='15px'>
                <Typography varaint='h3' textTransform={"uppercase"}>
                  Vous-le Vous une Livraison?.
                </Typography>
              </Box>
              <Box p='20px'>
                <FormControlLabel
                  control={<Checkbox Checked={isLivraison} />}
                  onChange={handleLivraisonChange}
                  label='Oui je veux une Livraison'
                />
              </Box>
            </Box>
            {isLivraison && (
              <Box mt='10px' backgroundColor={theme.palette.background.alt}>
                <Box
                  textAlign={"center"}
                  backgroundColor={theme.palette.primary.main}
                  p='15px'
                >
                  <Typography varaint='h3' textTransform={"uppercase"}>
                    Calculer la Livraison
                  </Typography>
                </Box>
                <Box p='20px'>
                  <Box
                    display='grid'
                    gap='15px'
                    gridTemplateColumns='repeat(1, minmax(0, 1fr))'
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <Box>
                      <FormControl>
                        <InputLabel id='localisation-label'>
                          Localisation
                        </InputLabel>
                        <Select
                          labelId='localisation-label'
                          id='localisation'
                          value={selectLocalisation}
                          onChange={handleLocalisationChange}
                        >
                          <MenuItem value='' backgroundColor='red'>
                            <em>None</em>
                          </MenuItem>
                          {localisations.map((localisation) => (
                            <MenuItem
                              key={localisation.label}
                              value={localisation}
                            >
                              {localisation.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Button
                        variant='contained'
                        onClick={handleCalculer}
                        fullWidth
                      >
                        Calculer la Livraison
                      </Button>
                    </Box>

                    <Typography variant='h6'>
                      Le frais de livraison sont: {isPrixLivraison} $
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Box mt='10px' backgroundColor={theme.palette.background.alt}>
              <Box
                textAlign={"center"}
                backgroundColor={theme.palette.primary.main}
                p='15px'
              >
                <Typography varaint='h3' textTransform={"uppercase"}>
                  Total Panier
                </Typography>
              </Box>
              <Box p='20px'>
                <Box>
                  <FlexBetween borderBottom={"2px solid red"} pb='20px'>
                    <Typography>Sous-Total :</Typography>
                    <Typography>
                      ({cartItems.reduce((a, c) => a + c.qty, 0)} Produits) :
                      {cartItems.reduce((a, c) => a + c.prix * c.qty, 0)}$
                    </Typography>
                  </FlexBetween>
                  <FlexBetween
                    borderBottom={"2px solid red"}
                    pb='20px'
                    pt={"10px"}
                  >
                    <Typography>Livraison :</Typography>
                    <Typography>{isPrixLivraison} $</Typography>
                  </FlexBetween>
                  <Box>
                    <FlexBetween pt={"10px"}>
                      <Typography variant='h4'>Total :</Typography>
                      <Typography variant='h4'>
                        {cartItems.reduce(
                          (a, c) => a + c.prix * c.qty + isPrixLivraison,
                          0
                        )}
                        $
                      </Typography>
                    </FlexBetween>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            sx={{
              boxShadow: "none",
              borderRadius: 0,
              padding: "15px 40px",
              mt: "50px",
            }}
            onClick={() => checkoutHandler()}
          >
            Continuer
          </Button>
        </Box>
      )}
    </>
  );
};

export default Panier;

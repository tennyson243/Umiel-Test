import { useTheme } from "@emotion/react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { addToWishlist, removeFromWishlist } from "../actions/wishlistActions";
import EnTete from "../Components/EnTete";
import MessageBox from "../Components/MessageBox";
import RemoveIcon from "@mui/icons-material/Remove";
import { Delete } from "@mui/icons-material";

const WishListScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems, error } = wishlist;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToWishlist(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromWishHandler = (id) => {
    // delete action
    dispatch(removeFromWishlist(id));
  };

  const addToCartHandler = (id) => {
    navigate(`/panier/${productId}?qty=${qty}`);
    dispatch(removeFromWishlist(id));
  };
  console.log(wishlistItems.lenght);
  return (
    <>
      <EnTete title='List des Souhaits' />
      <Box width='90%' m='auto'>
        {wishlistItems.lenght === 0 ? (
          <MessageBox severity='Warning'>
            Votre List des Souhaits est vide.
            <Link to='/shop'>Allez a la boutique</Link>
          </MessageBox>
        ) : (
          <Box>
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
                        <TableCell>Supprimer</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell>Ajouter au Panier</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wishlistItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell
                            color='#919191'
                            display='inline-block'
                            fontSize='20px'
                            height=' 40px'
                            lineHeight='40px'
                            textAlign='center'
                            width='10px'
                            sx={{
                              textAlign: " center",
                              textTransform: "uppercase",
                              borderRight: "1px solid #c1c1c1",
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
                                  removeFromWishHandler(item.product)
                                }
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            width='200px'
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
                            <Typography variant='h5'>
                              {item.countInStock > 0
                                ? "En stock"
                                : "Indisponible"}
                            </Typography>
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
                            <Button
                              variant='contained'
                              onClick={() => addToCartHandler(item.product)}
                              sx={{
                                height: "60px",
                              }}
                              disabled={item.countInStock === 0}
                            >
                              Ajouter au Panier
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default WishListScreen;

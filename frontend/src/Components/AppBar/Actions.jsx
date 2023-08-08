import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import {
  ActionIconsContainerMobile,
  ActionIconsContainerDesktop,
  MyList,
} from "./AppBarStyle";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userActions";
import FlexBetween from "../FlexBetween";
import { ChevronLeft } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import MessageBox from "../MessageBox";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
  },
}));

const Actions = ({ matches }) => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const { cartItems } = cart;
  const { wishlistItems } = wishlist;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElee, setAnchorElee] = useState(null);
  const openee = Boolean(anchorElee);
  const handleClickee = (event) => {
    setAnchorElee(event.currentTarget);
  };

  const handleCloseee = () => {
    setAnchorElee(null);
  };
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const isAdmin = userInfo && userInfo.isAdmin;
  const isSeller = userInfo && userInfo.isSeller;
  const isSuperAdmin = userInfo && userInfo.isSuperAdmin;
  const isBlogeur = userInfo && userInfo.isBlogeur;

  return (
    <>
      <Component>
        <MyList type="row">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <Badge badgeContent={cartItems.length} color="warning"></Badge>
              )}
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FavoriteIcon />
              {wishlistItems.length > 0 && (
                <Badge
                  badgeContent={wishlistItems.length}
                  color="error"
                ></Badge>
              )}
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {userInfo ? (
                <div>
                  {isAdmin && isSeller && isBlogeur && isSuperAdmin ? ( // Check if user is both admin and seller
                    <Button
                      variant="contained"
                      onClick={() => navigate("/dashboard")}
                      endIcon={<ArrowDropDownIcon />}
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.alt,
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      Super-Admin
                    </Button>
                  ) : (
                    <>
                      {isAdmin && ( // Check if user is only admin
                        <Button
                          variant="contained"
                          onClick={() => navigate("/dashboards")}
                          endIcon={<ArrowDropDownIcon />}
                          sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Admin
                        </Button>
                      )}
                      {isSeller &&
                        !isAdmin && ( // Check if user is only seller and not admin
                          <>
                            <Button
                              id="demo-customized-button"
                              aria-controls={
                                openee ? "demo-customized-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={openee ? "true" : undefined}
                              variant="contained"
                              disableElevation
                              onClick={handleClickee}
                              endIcon={<ArrowDropDownIcon />}
                            >
                              Vendeur
                            </Button>
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                              }}
                              anchorEl={anchorElee}
                              open={openee}
                              onClose={handleCloseee}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleCloseee();
                                  navigate("/productlist/seller");
                                }}
                                disableRipple
                              >
                                Produits
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleCloseee();
                                  navigate("/orderlist/seller");
                                }}
                                disableRipple
                              >
                                Commandes
                              </MenuItem>
                              <Divider sx={{ my: 0.5 }} />
                              <MenuItem
                                onClick={() => signoutHandler()}
                                disableRipple
                              >
                                Deconnexion
                              </MenuItem>
                            </StyledMenu>
                          </>
                        )}
                      {!isSeller &&
                        !isAdmin &&
                        !isBlogeur &&
                        !isSuperAdmin && ( // Check if user is neither admin nor seller
                          <Button
                            variant="contained"
                            onClick={() => navigate("/profile")}
                            endIcon={<ArrowDropDownIcon />}
                            sx={{
                              backgroundColor: theme.palette.secondary.light,
                              color: theme.palette.background.alt,
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            {userInfo.nom}
                          </Button>
                        )}
                      {isBlogeur &&
                        !isSeller &&
                        !isAdmin &&
                        !isSuperAdmin && ( // Check if user is neither admin nor seller
                          <Button
                            variant="contained"
                            onClick={() => navigate("/profile")}
                            endIcon={<ArrowDropDownIcon />}
                            sx={{
                              backgroundColor: theme.palette.secondary.light,
                              color: theme.palette.background.alt,
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Redateur(trice)
                          </Button>
                        )}
                    </>
                  )}
                </div>
              ) : (
                <PersonIcon
                  onClick={() => {
                    navigate("/signin");
                  }}
                />
              )}
              {/* {userInfo ? (
                <div>
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    {userInfo.nom}
                  </Button>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {handleClose(); navigate("/profile")}}
                      disableRipple
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {handleClose(); navigate("/historiqueAchat")}
                      }
                      disableRipple
                    >
                      Historique D'Achat
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => signoutHandler()} disableRipple>
                      Deconnexion
                    </MenuItem>
                  </StyledMenu>
                </div>
              ) : (
                <PersonIcon
                  onClick={() => {
                    navigate("/signin");
                  }}
                />
              )}

              {userInfo && userInfo.isAdmin && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    variant="contained"
                    onClick={() => navigate("/dashboard")}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.background.alt,
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Admin
                  </Button>
                </>
              )}
              {userInfo && userInfo.isSeller && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    id="demo-customized-button"
                    aria-controls={openee ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openee ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickee}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    Vendeur
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorElee}
                    open={openee}
                    onClose={handleCloseee}
                  >
                    <MenuItem
                      onClick={() => { handleCloseee(); navigate("/productlist/seller")}
                       
                      }
                      disableRipple
                    >
                      Produits
                    </MenuItem>
                    <MenuItem
                      onClick={() => { handleCloseee(); navigate("/orderlist/seller")}
      
                      }
                      disableRipple
                    >
                      Commandes
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => signoutHandler()} disableRipple>
                      Deconnexion
                    </MenuItem>
                  </StyledMenu>
                </>
              )} */}
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
        </MyList>
      </Component>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            width: {
              sm: 350,
              xs: 300,
            },
          },
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem ">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  SHOPPING PANIER ({cart.cartItems.length} Produits)
                </Typography>
              </Box>

              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <ChevronLeft />
              </IconButton>
            </FlexBetween>
          </Box>
          <Box>
            {cartItems.length === 0 ? (
              <Box
                sx={{
                  m: "2rem",
                }}
              >
                <MessageBox severity="warning">
                  <Typography variant="h5">Votre Panier est vide. </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/shop");
                      setIsDrawerOpen(false);
                    }}
                  >
                    Allez a la boutique
                  </Typography>
                </MessageBox>
              </Box>
            ) : (
              <>
                {cartItems.map((val) => (
                  <Box m="2rem">
                    <Stack direction="row" spacing={3}>
                      <img
                        src={val.image}
                        alt={val.nom}
                        style={{
                          width: "70px",
                          height: "70px",
                        }}
                      />
                      <Box m="0px">
                        <Stack>
                          <FlexBox>
                            <Typography fontWeight="bold">{val.nom}</Typography>
                            <IconButton
                              onClick={() => removeFromCartHandler(val.product)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </FlexBox>
                          <Stack direction="row" spacing={2}>
                            <Box
                              display="flex"
                              alignItems="center"
                              border={`1.5px solid ${theme.palette.neutral[500]}`}
                            >
                              <IconButton
                                disabled={val.qty === 1}
                                onClick={() =>
                                  dispatch(
                                    addToCart(val.product, Number(val.qty - 1))
                                  )
                                }
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography>{val.qty}</Typography>
                              <IconButton
                                disabled={val.qty === val.countInStock}
                                onClick={() =>
                                  dispatch(
                                    addToCart(val.product, Number(val.qty + 1))
                                  )
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>

                            <Typography
                              variant="h4"
                              sx={{
                                pt: "7px",
                              }}
                            >
                              {val.prix} $
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>

                    <Divider
                      sx={{
                        mt: "1rem",
                      }}
                    />
                  </Box>
                ))}
              </>
            )}
          </Box>

          <Box m="10px 0" pl="2rem" pr="2rem">
            <Stack direction="row" spacing={3}>
              <Typography variant="h4" fontWeight="bold">
                SOUS-TOTAL :
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {cartItems.reduce((a, c) => a + c.prix * c.qty, 0)}$
              </Typography>
            </Stack>
          </Box>

          <Box m="10px 0" pl="2rem" pr="2rem">
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
                gridColumn: "span 4",
              }}
              onClick={() => {
                navigate("/panier");
                setIsDrawerOpen(false);
              }}
              disabled={cartItems.length === 0}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Actions;

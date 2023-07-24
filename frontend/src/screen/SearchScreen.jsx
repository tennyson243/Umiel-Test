import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "../Components/FlexBetween";
import { useTheme } from "@emotion/react";
import { prices, ratings } from "../../src/utils";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EnTete from "../Components/EnTete";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import CardProduit from "../Components/Produit/CardProduit";
import { useDispatch, useSelector } from "react-redux";
import { listProductCategories, listProducts } from "../actions/productActions";
import StarIcon from "@mui/icons-material/Star";
import styled from "@emotion/styled";
import { ChevronLeft } from "@mui/icons-material";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
}));

const SearchScreen = () => {
  const {
    nom = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        nom: nom !== "all" ? nom : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
        name: nom !== "all" ? nom : " ",
      })
    );
    dispatch(listProductCategories());
  }, [category, dispatch, max, min, nom, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.nom || nom;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/nom/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  const [name, setName] = useState("");

  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/nom/${name}`);
  };
  return (
    <>
      <EnTete title='Notre Boutique' />
      <Helmet>
        <title>Nos Produits</title>
      </Helmet>

      <Box width='90%' m='auto' mt='20px'>
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          <>
            <div>{products.length} Resultats</div>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                backgroundColor={theme.palette.background.alt}
                sx={{ gridColumn: "span 1" }}
              >
                <Box>
                  <Box>
                    <Box
                      backgroundColor={theme.palette.primary.main}
                      color={theme.palette.secondary.main}
                      font-size='16px'
                      font-weight=' normal'
                      letter-spacing='1px'
                      padding='15px 15px 15px 50px'
                      position='relative'
                      text-transform='uppercase'
                      transition='all 0.3s ease 0s'
                    >
                      <Box>
                        <FlexBetween color={theme.palette.secondary.main}>
                          <Box display='flex' alignItems='center' gap='0.5rem'>
                            <Typography variant='h4' fontWeight='bold'>
                              PLUS D'OPTIONS
                            </Typography>
                          </Box>
                          <Box>
                            <React.Fragment key='top'>
                              <IconButton
                                onClick={toggleDrawer("top", true)}
                                variant='contained'
                                fullWidth
                              >
                                <ChevronLeft />
                              </IconButton>
                              <Drawer
                                anchor='top'
                                open={state["top"]}
                                onClose={toggleDrawer("top", false)}
                                sx={{
                                  height: `calc(50% - ${drawerBleeding}px)`,
                                  "& .MuiDrawer-paper": {
                                    color: theme.palette.secondary[200],
                                    backgroundColor:
                                      theme.palette.background.alt,
                                    boxSixing: "border-box",
                                    borderWidth: isNonMobile ? 0 : "2px",
                                    height: `calc(50% - ${drawerBleeding}px)`,
                                  },
                                }}
                              >
                                <Box
                                  sx={{ width: "auto" }}
                                  role='presentation'
                                  onClick={toggleDrawer("top", false)}
                                  onKeyDown={toggleDrawer("top", false)}
                                >
                                  <StyledBox
                                    sx={{
                                      px: 2,
                                      pb: 2,
                                      height: "100%",
                                      overflow: "auto",
                                    }}
                                  >
                                    <Box
                                      display='grid'
                                      gap='15px'
                                      gridTemplateColumns='repeat(3, minmax(0, 1fr))'
                                      sx={{
                                        "& > div": {
                                          gridColumn: isNonMobile
                                            ? undefined
                                            : "span 3",
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          mt: "30px",
                                          mb: "30px",
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          p: "10px",
                                          gridColumn: "span 1",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            variant='h5'
                                            sx={{
                                              textAlign: "center",
                                              fontWeight: "bold",
                                              p: "20px",
                                            }}
                                          >
                                            TRIER PAR LES CATEGORIES
                                          </Typography>
                                        </Box>

                                        <Box>
                                          <Box>
                                            <Box
                                              border='1px solid rgba(129, 129, 129, 0.2)'
                                              width='100%'
                                              z-index='99'
                                              backgroundColor={
                                                theme.palette.background.alt
                                              }
                                            >
                                              {loadingCategories ? (
                                                <Chargement />
                                              ) : errorCategories ? (
                                                <MessageBox severity='error'>
                                                  {error}
                                                </MessageBox>
                                              ) : (
                                                <List>
                                                  <ListItem>
                                                    <ListItemButton
                                                      className={
                                                        "all" === category
                                                          ? "active"
                                                          : ""
                                                      }
                                                      onClick={() =>
                                                        navigate(
                                                          getFilterUrl({
                                                            category: "all",
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <ListItemText primary='Tous' />
                                                    </ListItemButton>
                                                  </ListItem>

                                                  {categories.map((c) => (
                                                    <ListItem
                                                      disablePadding
                                                      key={c}
                                                    >
                                                      <ListItemButton
                                                        className={
                                                          c === category
                                                            ? "active"
                                                            : ""
                                                        }
                                                        onClick={() =>
                                                          navigate(
                                                            getFilterUrl({
                                                              category: c,
                                                            })
                                                          )
                                                        }
                                                      >
                                                        <ListItemText
                                                          primary={c}
                                                        />
                                                      </ListItemButton>
                                                    </ListItem>
                                                  ))}
                                                </List>
                                              )}
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Box>

                                      <Box
                                        sx={{
                                          mt: "30px",
                                          mb: "30px",
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          p: "10px",
                                          gridColumn: "span 1",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            variant='h5'
                                            sx={{
                                              textAlign: "center",
                                              fontWeight: "bold",
                                              p: "20px",
                                            }}
                                          >
                                            TRIER PAR PRIX
                                          </Typography>
                                        </Box>

                                        <Box>
                                          <Box>
                                            <Box>
                                              <Box
                                                border='1px solid rgba(129, 129, 129, 0.2)'
                                                width='100%'
                                                z-index='99'
                                                backgroundColor={
                                                  theme.palette.background.alt
                                                }
                                              >
                                                <List>
                                                  {prices.map((p) => (
                                                    <ListItem
                                                      disablePadding
                                                      key={p.name}
                                                    >
                                                      <ListItemButton
                                                        onClick={() =>
                                                          navigate(
                                                            getFilterUrl({
                                                              min: p.min,
                                                              max: p.max,
                                                            })
                                                          )
                                                        }
                                                      >
                                                        <ListItemText
                                                          primary={p.name}
                                                        />
                                                      </ListItemButton>
                                                    </ListItem>
                                                  ))}
                                                </List>
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Box>

                                      <Box
                                        sx={{
                                          mt: "30px",
                                          mb: "30px",
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          p: "10px",
                                          gridColumn: "span 1",
                                        }}
                                      >
                                        <Box>
                                          <Typography
                                            variant='h5'
                                            sx={{
                                              textAlign: "center",
                                              fontWeight: "bold",
                                              p: "20px",
                                            }}
                                          >
                                            TRIER PAR LES AVIS
                                          </Typography>
                                        </Box>

                                        <Box>
                                          <Box>
                                            <Box
                                              border='1px solid rgba(129, 129, 129, 0.2)'
                                              width='100%'
                                              z-index='99'
                                              backgroundColor={
                                                theme.palette.background.alt
                                              }
                                            >
                                              <List>
                                                {ratings.map((r) => (
                                                  <ListItem
                                                    disablePadding
                                                    key={r.name}
                                                  >
                                                    <ListItemButton
                                                      onClick={() =>
                                                        navigate(
                                                          getFilterUrl({
                                                            rating: r.rating,
                                                          })
                                                        )
                                                      }
                                                    >
                                                      <ListItemText>
                                                        <Rating
                                                          name='text-feedback'
                                                          value={r.rating}
                                                          readOnly
                                                          precision={0.5}
                                                          emptyIcon={
                                                            <StarIcon
                                                              style={{
                                                                opacity: 0.55,
                                                              }}
                                                              fontSize='inherit'
                                                            />
                                                          }
                                                        />
                                                      </ListItemText>
                                                    </ListItemButton>
                                                  </ListItem>
                                                ))}
                                                <ListItem>
                                                  <ListItemButton
                                                    onClick={() =>
                                                      navigate(
                                                        getFilterUrl({
                                                          rating: "all",
                                                        })
                                                      )
                                                    }
                                                  >
                                                    <ListItemText>
                                                      <Rating
                                                        caption={"& up"}
                                                        rating={0}
                                                      ></Rating>
                                                    </ListItemText>
                                                  </ListItemButton>
                                                </ListItem>
                                              </List>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </StyledBox>
                                </Box>
                              </Drawer>
                            </React.Fragment>
                          </Box>
                        </FlexBetween>
                      </Box>
                    </Box>
                    <Box
                      border='1px solid rgba(129, 129, 129, 0.2)'
                      width='100%'
                      z-index='99'
                      backgroundColor={theme.palette.background.alt}
                    >
                      <Box>
                        <Box></Box>
                        <Box
                          sx={{
                            p: "20px",
                          }}
                        >
                          <Typography variant='h6'>
                            Vous rechecher un(des) Produit(s) avec comme :
                          </Typography>
                          <MessageBox>
                            <Stack direction='row' spacing={2}>
                              <Typography variant='h6'>Nom</Typography>
                              <Typography
                                variant='h5'
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                {nom !== "all" && " : " + nom}
                                {nom === "all" && " : " + "Tous"}
                              </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                              <Typography variant='h6'>Categorie</Typography>
                              <Typography
                                variant='h5'
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                {category !== "all" && " : " + category}
                                {category === "all" && " : " + "Toutes"}
                              </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                              <Typography variant='h6'>Prix Min</Typography>
                              <Typography
                                variant='h5'
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                {min !== "all" && " : " + min} $
                              </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                              <Typography variant='h6'>Prix Max</Typography>
                              <Typography
                                variant='h5'
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                {max !== "all" && " : " + max} $
                              </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                              <Typography variant='h6'>Notation</Typography>
                              <Typography
                                variant='h5'
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                {rating !== "all" && " : " + rating} Etoiles
                              </Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                              <Typography variant='h6'>Departement</Typography>
                              <Typography
                                variant='h5'
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                {order !== "all" && " : " + order}
                              </Typography>
                            </Stack>
                          </MessageBox>

                          {nom !== "all" ||
                          category !== "all" ||
                          rating !== "all" ||
                          order !== "all" ||
                          max !== "all" ||
                          min !== "all" ? (
                            <Button
                              variant='contained'
                              onClick={() =>
                                navigate(
                                  "/search/category/all/nom/all/min/0/max/:10/rating/0/order/newest"
                                )
                              }
                              fullWidth
                              sx={{
                                mt: "10px",
                              }}
                              color='success'
                            >
                              Rafrechir la Recherche
                            </Button>
                          ) : null}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ gridColumn: "span 3" }}>
                <Box
                  backgroundColor={theme.palette.primary.main}
                  color={theme.palette.secondary.main}
                  p='0px 20px 0px 20px'
                  mb='20px'
                >
                  <Box>
                    <Box sx={{ p: "10px" }}>
                      <Box
                        display='flex'
                        sx={{
                          justifyContent: "space-between",
                          flexDirection: {
                            sm: "row",
                            xs: "column",
                          },
                        }}
                      >
                        <form onSubmit={submitHandler}>
                          <Box
                            sx={{
                              p: "2px 4px",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: theme.palette.background.alt,
                            }}
                          >
                            <InputBase
                              sx={{ ml: 1, flex: 1 }}
                              placeholder='Rechercher un Produit par son Nom....'
                              onChange={(e) => setName(e.target.value)}
                            />
                            <IconButton
                              sx={{ p: "10px" }}
                              aria-label='search'
                              type='submit'
                            >
                              <SearchIcon />
                            </IconButton>
                          </Box>
                        </form>

                        <Box>
                          <FormControl>
                            <FlexBetween>
                              <Box mr='10px'>
                                <Typography variant='h6'>Trier Par:</Typography>
                              </Box>
                              <Box>
                                <Select
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={order}
                                  onChange={(e) => {
                                    navigate(
                                      getFilterUrl({ order: e.target.value })
                                    );
                                  }}
                                  sx={{
                                    width: "150px",
                                    height: "30px",
                                    borderColor: "red",
                                    border: "1px solid",
                                  }}
                                >
                                  <MenuItem value={"newest"}>
                                    Nouveaute
                                  </MenuItem>
                                  <MenuItem value={"lowest"}>
                                    Meilleurs Ventes
                                  </MenuItem>
                                  <MenuItem value={"toprated"}>
                                    Mieux noter
                                  </MenuItem>
                                  <MenuItem value={"highest"}>
                                    En Solde
                                  </MenuItem>
                                </Select>
                              </Box>
                            </FlexBetween>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {products.length === 0 && (
                  <MessageBox severity='warning'>
                    Aucun Produit n'as ete trouver
                  </MessageBox>
                )}
                <Box
                  display='grid'
                  gap='15px'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                  }}
                >
                  {products.map((product) => (
                    <Box key={product._id}>
                      <CardProduit
                        product={product}
                        sx={{
                          gridColumn: "span 1",
                        }}
                      ></CardProduit>
                    </Box>
                  ))}
                </Box>
              </Box>
              <FlexBetween
                backgroundColor={theme.palette.primary.main}
                color={theme.palette.secondary.main}
                sx={{ gridColumn: "span 4" }}
                p='0px 20px 0px 20px'
              >
                <Box>
                  <Typography variant='h5'>Page :</Typography>
                </Box>

                <Pagination
                  count={pages}
                  onChange={(event, page) => navigate(getFilterUrl({ page }))}
                  color='success'
                />
              </FlexBetween>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SearchScreen;

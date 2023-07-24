import { Global, useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  FormControl,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Skeleton,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { populaireSearch } from "../actions/Blog/populaireAction";
import PopulaireCard from "../Components/Blog/Populaire/PopulaireCard";
import Chargement from "../Components/Chargement";
import EnTete from "../Components/EnTete";
import FlexBetween from "../Components/FlexBetween";
import MessageBox from "../Components/MessageBox";
import SearchIcon from "@mui/icons-material/Search";
import { heroSearch, listHeroCategories } from "../actions/Blog/heroActions";
import HeroCard from "../Components/Blog/Hero/HeroCard";
import CardBloging from "../Components/Home/Bloging/CardBloging";
import styled from "@emotion/styled";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
}));

const BlogSearchScreen = (props) => {
  const { title = "all", catgeory = "all", pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const populaireListSearch = useSelector((state) => state.populaireListSearch);
  const { loading, error, populaires, page, pages } = populaireListSearch;

  const [state, setState] = useState({
    bottom: false,
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

  const heroListSearch = useSelector((state) => state.heroListSearch);
  const {
    loading: loadingHeros,
    error: errorHeros,
    heros,
    page: pageHeros,
    pages: pagesHeros,
  } = heroListSearch;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const [nom, setName] = useState("");

  const populaireCategoryList = useSelector(
    (state) => state.populaireCategoryList
  );
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = populaireCategoryList;

  const heroCategoryList = useSelector((state) => state.heroCategoryList);
  const {
    loading: loadingCategoriesHeros,
    error: errorCategoriesHeros,
    categories: CategoriesHeros,
  } = heroCategoryList;

  useEffect(() => {
    dispatch(
      populaireSearch({
        pageNumber,
        title: title !== "all" ? title : "",
        catgeory: catgeory !== "all" ? catgeory : "",
        nom: title !== "all" ? title : " ",
      })
    );
    dispatch(
      heroSearch({
        pageNumber,
        title: title !== "all" ? title : "",
        catgeory: catgeory !== "all" ? catgeory : "",
        nom: title !== "all" ? title : " ",
      })
    );
    dispatch(listHeroCategories());
  }, [catgeory, dispatch, title, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.catgeory || catgeory;
    const filterTitle = filter.title || title;

    return `/blogsearch/catgeory/${filterCategory}/title/${filterTitle}/pageNumber/${filterPage}`;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/blogsearch/title/${nom}`);
  };

  return (
    <>
      <EnTete title='Notre Blog' />
      <Helmet>
        <title>Nos Article de Blog</title>
      </Helmet>

      <Box width='90%' m='auto' mt='20px'>
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          <>
            {loadingHeros ? (
              <Chargement />
            ) : errorHeros ? (
              <MessageBox />
            ) : (
              <>
                <div>{populaires.length + heros.length} Resultats</div>
                <Box
                  display='grid'
                  gap='15px'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
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
                          <Typography
                            variant='h5'
                            sx={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Trier par Categorie
                          </Typography>
                        </Box>
                        <Box
                          border='1px solid rgba(129, 129, 129, 0.2)'
                          width='100%'
                          z-index='99'
                          backgroundColor={theme.palette.background.alt}
                        >
                          {loadingCategories ? (
                            <Chargement />
                          ) : errorCategories ? (
                            <MessageBox severity='error'>{error}</MessageBox>
                          ) : (
                            <>
                              <React.Fragment key='bottom'>
                                <Button
                                  onClick={toggleDrawer("bottom", true)}
                                  variant='contained'
                                  fullWidth
                                >
                                  Voir les Categories
                                </Button>
                                <Drawer
                                  anchor='bottom'
                                  open={state["bottom"]}
                                  onClose={toggleDrawer("bottom", false)}
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
                                    onClick={toggleDrawer("bottom", false)}
                                    onKeyDown={toggleDrawer("bottom", false)}
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
                                        sx={{
                                          width: "90%",
                                          m: "auto",
                                          backgroundColor:
                                            theme.palette.primary[600],
                                          p: "10px",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            mt: "30px",
                                            mb: "30px",
                                            backgroundColor:
                                              theme.palette.primary.main,
                                            p: "10px",
                                          }}
                                        >
                                          <Typography
                                            variant='h4'
                                            sx={{
                                              textAlign: "center",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            TRIER PAR LES CATEGORIES
                                          </Typography>
                                        </Box>

                                        <Box
                                          display='grid'
                                          gap='20px'
                                          gridTemplateColumns='repeat(7, minmax(0, 1fr))'
                                          sx={{
                                            "& > div": {
                                              gridColumn: isNonMobile
                                                ? undefined
                                                : "span 7",
                                            },
                                          }}
                                          textAlign='center'
                                        >
                                          <Box
                                            sx={{
                                              backgroundColor:
                                                theme.palette.secondary[700],
                                              p: "10px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <Typography
                                              variant='h4'
                                              sx={{
                                                fontWeight: "bold",
                                                gridColumn: "span 1",
                                                textAlign: "center",
                                                textTransform: "capitalize",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                navigate(
                                                  getFilterUrl({
                                                    catgeory: "all",
                                                  })
                                                )
                                              }
                                            >
                                              Toutes
                                            </Typography>
                                          </Box>
                                          {categories.map((c) => (
                                            <>
                                              <Box
                                                key={c}
                                                sx={{
                                                  backgroundColor:
                                                    theme.palette.background
                                                      .alt,
                                                  p: "10px",
                                                  cursor: "pointer",
                                                }}
                                              >
                                                <Typography
                                                  variant='h4'
                                                  sx={{
                                                    fontWeight: "bold",
                                                    gridColumn: "span 1",
                                                    textAlign: "center",
                                                    textTransform: "capitalize",
                                                    color:
                                                      theme.palette.secondary
                                                        .alt,
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    navigate(
                                                      getFilterUrl({
                                                        catgeory: c,
                                                      })
                                                    )
                                                  }
                                                >
                                                  {c}
                                                </Typography>
                                              </Box>
                                            </>
                                          ))}
                                        </Box>
                                        <Box
                                          sx={{
                                            mt: "10px",
                                            mb: "20px",
                                            backgroundColor:
                                              theme.palette.background.alt,
                                          }}
                                        >
                                          <Typography
                                            variant='h4'
                                            sx={{
                                              textAlign: "center",
                                              backgroundColor:
                                                theme.palette.primary.main,
                                              p: "10px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            LES PLUS POPULAIRE
                                          </Typography>
                                        </Box>
                                        <Box
                                          display='grid'
                                          gap='15px'
                                          gridTemplateColumns='repeat(7, minmax(0, 1fr))'
                                          sx={{
                                            "& > div": {
                                              gridColumn: isNonMobile
                                                ? undefined
                                                : "span 7",
                                            },
                                          }}
                                        >
                                          {loadingCategoriesHeros ? (
                                            <Chargement />
                                          ) : errorCategoriesHeros ? (
                                            <MessageBox severity='error'>
                                              {errorCategoriesHeros}
                                            </MessageBox>
                                          ) : (
                                            CategoriesHeros.map((c) => (
                                              <>
                                                <Box
                                                  key={c}
                                                  sx={{
                                                    backgroundColor:
                                                      theme.palette.background
                                                        .alt,
                                                    p: "10px",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    toggleDrawer(false)
                                                  }
                                                >
                                                  <Typography
                                                    variant='h4'
                                                    sx={{
                                                      fontWeight: "bold",
                                                      gridColumn: "span 1",
                                                      textAlign: "center",
                                                      textTransform:
                                                        "capitalize",
                                                      color:
                                                        theme.palette.secondary
                                                          .alt,
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      navigate(
                                                        getFilterUrl({
                                                          catgeory: c,
                                                        })
                                                      )
                                                    }
                                                  >
                                                    {c}
                                                  </Typography>
                                                </Box>
                                              </>
                                            ))
                                          )}
                                        </Box>
                                      </Box>
                                    </StyledBox>
                                  </Box>
                                </Drawer>
                              </React.Fragment>
                            </>
                          )}
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
                            placeholder='Rechercher un Articles par son Nom....'
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
                    </Box>
                    {populaires.length === 0 && heros.length === 0 && (
                      <MessageBox severity='warning'>
                        Aucun Article n'as ete trouver
                      </MessageBox>
                    )}
                    <Box
                      display='grid'
                      gap='15px'
                      gridTemplateColumns='repeat(3, minmax(0, 1fr))'
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 3",
                        },
                      }}
                    >
                      {populaires.map((populaire) => (
                        <Box
                          sx={{
                            gridColumn: "span 1",
                          }}
                        >
                          <PopulaireCard
                            key={populaire._id}
                            populaire={populaire}
                          />
                        </Box>
                      ))}

                      {heros.map((hero) => (
                        <Box
                          sx={{
                            gridColumn: "span 1",
                          }}
                        >
                          <CardBloging key={hero._id} hero={hero} />
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
                    <Box>
                      {[...Array(pages).keys()].map((x) => (
                        <IconButton
                          key={x + 1}
                          onClick={() =>
                            navigate(getFilterUrl({ page: x + 1 }))
                          }
                        >
                          {x + 1}
                        </IconButton>
                      ))}
                    </Box>
                  </FlexBetween>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default BlogSearchScreen;

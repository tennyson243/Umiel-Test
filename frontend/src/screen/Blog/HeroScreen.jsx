import { useTheme } from "@emotion/react";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsHero } from "../../actions/Blog/heroActions";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import SinglePageSlider from "../../Components/Blog/Slider/SinglePageSlider";
import Side from "./Side";
import "./style.css";
import ReactMarkdown from "react-markdown";

import {
  ArrowRightOutlined,
  Facebook,
  LinkedIn,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import FlexBetweenMedia from "../../Components/FlexBetweenMedia";

const HeroScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const params = useParams();
  const { title: heroTitle } = params;
  const heroDetails = useSelector((state) => state.heroDetails);
  const { loading, error, hero } = heroDetails;
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    dispatch(detailsHero(heroTitle));
  }, [dispatch, heroTitle]);

  return (
    <>
      <Box>
        <SinglePageSlider />
        <Box width="90%" m="auto">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  sm: "75%",
                  xs: "100%",
                },
              }}
            >
              {loading ? (
                <Chargement />
              ) : error ? (
                <MessageBox severity="error">{error}</MessageBox>
              ) : (
                <section className="mainContent details">
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: {
                        sm: "40px",
                        xs: "25px",
                      },
                      textAlign: {
                        sm: "start",
                        xs: "center",
                      },
                    }}
                  >
                    {hero.title}
                  </Typography>

                  <div className="author">
                    <span>Par</span>
                    <img src={hero.authorImg} alt="" />
                    <p> {hero.authorName} Le</p>
                    <label>{hero.time}</label>
                  </div>

                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{
                      m: "20px 0px",
                      pr: {
                        xs: "10px",
                      },
                    }}
                    backgroundColor={theme.palette.background.alt}
                    p="2px"
                  >
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{
                        m: "10px 0px",
                        pr: {
                          xs: "10px",
                        },
                      }}
                      backgroundColor={theme.palette.background.alt}
                      pl="10px"
                    >
                      <IconButton
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(`https://wa.me/?text=${url}`);
                        }}
                      >
                        <WhatsApp />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${url}`
                          );
                        }}
                      >
                        <Facebook />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(
                            `https://www.linkedin.com/shareArticle?url=${url}`
                          );
                        }}
                      >
                        <LinkedIn />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          window.open(
                            `https://twitter.com/intent/tweet?url=${url}`
                          );
                        }}
                      >
                        <Twitter />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <FlexBetweenMedia flexDirection="column">
                    <Box>
                      <img
                        src={hero.cover}
                        alt=""
                        style={{
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box>
                      <ReactMarkdown>{hero.desc}</ReactMarkdown>
                    </Box>
                  </FlexBetweenMedia>

                  <Box
                    sx={{
                      m: "2rem 0rem 2rem 0rem",
                      p: "1rem",
                      backgroundColor: theme.palette.background.alt,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: "center",
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                      }}
                    >
                      Ingredients et Ustenciles
                    </Typography>
                  </Box>

                  <FlexBetweenMedia>
                    <Box
                      sx={{
                        mb: {
                          sm: 0,
                          xs: "2rem",
                        },
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            textAlign: "center",
                            mb: "10px",
                          }}
                        >
                          LES INGRÉDIENTS
                        </Typography>
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          mt: "1rem",
                        }}
                      >
                        {hero.ingredient.map((val) => (
                          <Stack direction="row" spacing={1}>
                            <ArrowRightOutlined fontSize="10px" />
                            <ReactMarkdown>{val}</ReactMarkdown>
                          </Stack>
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            textAlign: "center",
                            mb: "10px",
                          }}
                        >
                          LES USTENSILES
                        </Typography>
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          mt: "1rem",
                        }}
                      >
                        {hero.ustencile.map((val) => (
                          <Stack direction="row" spacing={1}>
                            <ArrowRightOutlined fontSize="10px" />
                            <ReactMarkdown>{val}</ReactMarkdown>
                          </Stack>
                        ))}
                      </Box>
                    </Box>
                  </FlexBetweenMedia>

                  <Box
                    sx={{
                      m: "2rem 0rem 2rem 0rem",
                      p: "1rem",
                      backgroundColor: theme.palette.background.alt,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: "center",
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                      }}
                    >
                      La recette
                    </Typography>
                  </Box>

                  <Box>
                    <Box
                      display="grid"
                      gap="15px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                      }}
                    >
                      {hero.recette.map((val) => (
                        <Box sx={{ gridColumn: "span 1" }}>
                          <Stack>
                            <Box>
                              <img src={val.image} alt="" />
                            </Box>
                            <Box>
                              <ReactMarkdown>{val.desc}</ReactMarkdown>
                            </Box>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      m: "2rem 0rem 2rem 0rem",
                      p: "1rem",
                      backgroundColor: theme.palette.background.alt,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: "center",
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                      }}
                    >
                      Mode d'application
                    </Typography>
                  </Box>

                  <Box>
                    {hero.application.map((val) => (
                      <Box>
                        <Stack spacing={1} direction="column">
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            Mode d'application:
                          </Typography>
                          <ReactMarkdown>{val.mode}</ReactMarkdown>
                        </Stack>
                        <Stack spacing={1} direction="column" mt="15px">
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            Temps:
                          </Typography>
                          <ReactMarkdown>{val.temps}</ReactMarkdown>
                        </Stack>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      m: "2rem 0rem 2rem 0rem",
                      p: "1rem",
                      backgroundColor: theme.palette.background.alt,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: "center",
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                      }}
                    >
                      Précautions et bonnes pratiques
                    </Typography>
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        mt: "1rem",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          mb: "10px",
                        }}
                      >
                        Précautions d'utilisation:
                      </Typography>
                      {hero.precaution.map((val) => (
                        <Stack direction="row" spacing={1}>
                          <ArrowRightOutlined fontSize="10px" />
                          <ReactMarkdown>{val}</ReactMarkdown>
                        </Stack>
                      ))}
                    </Box>
                  </Box>
                </section>
              )}
            </Box>
            <Box
              sx={{
                display: {
                  sm: "none",
                  xs: "contents",
                },
              }}
            >
              <Divider
                sx={{
                  mt: "20px",
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                textAlign="center"
                mt="20px"
              >
                <Typography variant="h4">
                  CET ARTICLE VOUS A-T-IL ÉTÉ UTILE ?
                </Typography>
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt="10px"
                  >
                    <Button
                      variant="contained"
                      sx={{
                        height: "3rem",
                        width: "9rem",
                        borderColor: "success",
                      }}
                    >
                      Oui, Merci
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        height: "3rem",
                        width: "9rem",
                        color: "error",
                      }}
                    >
                      Pas Vraiment
                    </Button>
                  </Stack>
                </Box>
              </Box>

              <Box mt="20px">
                <MessageBox severity="warning">
                  <Typography variant="h4" textAlign="center">
                    À PROPOS DE CES CONSEILS
                  </Typography>
                  <Typography variant="h6">
                    Umiel et ses équipes n'encouragent pas l'automédication. Les
                    informations et conseils délivrés sont issus d'une base
                    bibliographique de référence (ouvrages, publications
                    scientifiques, etc.). Ils sont donnés à titre informatif, ou
                    pour proposer des pistes de réflexion : ils ne doivent en
                    aucun cas se substituer à un diagnostic, une consultation ou
                    un suivi médical, et ne peuvent engager la responsabilité de
                    Umiel.
                  </Typography>
                </MessageBox>
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  sm: "23%",
                  xs: "100%",
                },
              }}
            >
              <Side />
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                sm: "contents",
                xs: "none",
              },
            }}
          >
            <Divider
              sx={{
                mt: "20px",
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              textAlign="center"
              mt="70px"
            >
              <Typography variant="h4">
                CET ARTICLE VOUS A-T-IL ÉTÉ UTILE ?
              </Typography>
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt="10px"
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: "3rem",
                      width: "9rem",
                      borderColor: "success",
                    }}
                  >
                    Oui, Merci
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      height: "3rem",
                      width: "9rem",
                      color: "error",
                    }}
                  >
                    Pas Vraiment
                  </Button>
                </Stack>
              </Box>
            </Box>

            <Box mt="70px">
              <MessageBox severity="warning">
                <Typography variant="h4" textAlign="center">
                  À PROPOS DE CES CONSEILS
                </Typography>
                <Typography variant="h6">
                  Umiel et ses équipes n'encouragent pas l'automédication. Les
                  informations et conseils délivrés sont issus d'une base
                  bibliographique de référence (ouvrages, publications
                  scientifiques, etc.). Ils sont donnés à titre informatif, ou
                  pour proposer des pistes de réflexion : ils ne doivent en
                  aucun cas se substituer à un diagnostic, une consultation ou
                  un suivi médical, et ne peuvent engager la responsabilité de
                  Umiel.
                </Typography>
              </MessageBox>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroScreen;

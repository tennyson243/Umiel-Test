import { useTheme } from "@emotion/react";
import { Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { detailsPopulaire } from "../../actions/Blog/populaireAction";
import SinglePageSlider from "../../Components/Blog/Slider/SinglePageSlider";
import MessageBox from "../../Components/MessageBox";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import Side from "./Side";
import ReactMarkdown from "react-markdown";

const PopulaireScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  const { title: populaireTitle } = params;

  const populaireDetails = useSelector((state) => state.populaireDetails);
  const { loading, error, populaire } = populaireDetails;
  const [articleUrl, setArticleUrl] = useState(window.location.href);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    dispatch(detailsPopulaire(populaireTitle));
  }, [dispatch, populaireTitle]);

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
                <MessageBox />
              ) : error ? (
                <MessageBox severity="error">{error}</MessageBox>
              ) : (
                <Box>
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
                    {populaire.title}
                  </Typography>

                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{
                      m: "20px 0px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {populaire.date}
                    </Typography>
                  </Stack>

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
                    p="10px"
                  >
                    <FacebookShareButton url={articleUrl}>
                      <FacebookIcon style={{ width: "40px" }} />
                    </FacebookShareButton>
                    <LinkedinShareButton url={articleUrl}>
                      <LinkedinIcon style={{ width: "40px" }} />
                    </LinkedinShareButton>
                    <TwitterShareButton url={articleUrl}>
                      <TwitterIcon style={{ width: "40px" }} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={articleUrl}>
                      <WhatsappIcon style={{ width: "40px" }} />
                    </WhatsappShareButton>
                  </Stack>

                  <Box>
                    <img
                      src={populaire.cover}
                      alt=""
                      style={{
                        width: "100%",
                      }}
                    />
                  </Box>
                  <Box mt="1.5rem">
                    <ReactMarkdown>{populaire.desc}</ReactMarkdown>
                  </Box>

                  <Box mt="1.5rem">
                    <ReactMarkdown>{populaire.role}</ReactMarkdown>
                  </Box>

                  <Typography
                    mt="1.5rem"
                    variant="h3"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Quelques types
                  </Typography>

                  <Box mt="1.5rem">
                    <Box
                      display="grid"
                      gap="15px"
                      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                      }}
                    >
                      {populaire.exemple.map((val) => (
                        <Box sx={{ gridColumn: "span 1" }} mb="30px">
                          <Stack>
                            <Box>
                              <Stack direction="row" spacing={2}>
                                <ArrowRightAltOutlined fontSize="10px" />
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.secondary.main,
                                  }}
                                >
                                  {val.titre}
                                </Typography>
                              </Stack>
                            </Box>
                            <Divider />

                            <Box
                              mt="10px"
                              backgroundColor={theme.palette.background.alt}
                            >
                              <Box
                                textAlign={"center"}
                                backgroundColor={theme.palette.primary.main}
                                p="8px"
                              >
                                <Typography
                                  varaint="h3"
                                  textTransform={"uppercase"}
                                >
                                  Exemples
                                </Typography>
                              </Box>
                              <Box p="15px">
                                <ReactMarkdown>{val.type}</ReactMarkdown>
                              </Box>

                              <Box
                                backgroundColor={theme.palette.background.alt}
                              >
                                <Box
                                  textAlign={"center"}
                                  backgroundColor={theme.palette.primary.main}
                                  p="8px"
                                >
                                  <Typography
                                    varaint="h3"
                                    textTransform={"uppercase"}
                                  >
                                    Contenue
                                  </Typography>
                                </Box>
                                <Box p="15px">
                                  <ReactMarkdown>{val.expli}</ReactMarkdown>
                                </Box>
                              </Box>

                              <Box
                                backgroundColor={theme.palette.background.alt}
                              >
                                <Box
                                  textAlign={"center"}
                                  backgroundColor={theme.palette.primary.main}
                                  p="8px"
                                >
                                  <Typography
                                    varaint="h3"
                                    textTransform={"uppercase"}
                                  >
                                    Bienfait
                                  </Typography>
                                </Box>
                                <Box p="15px">
                                  <ReactMarkdown>{val.bienfait}</ReactMarkdown>
                                </Box>
                              </Box>

                              <Box
                                backgroundColor={theme.palette.background.alt}
                              >
                                <Box
                                  textAlign={"center"}
                                  backgroundColor={theme.palette.primary.main}
                                  p="8px"
                                >
                                  <Typography
                                    varaint="h3"
                                    textTransform={"uppercase"}
                                  >
                                    Mode de Consomation:
                                  </Typography>
                                </Box>
                                <Box p="15px">
                                  <ReactMarkdown>{val.mode}</ReactMarkdown>
                                </Box>
                              </Box>
                            </Box>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <ReactMarkdown>{populaire.conclusion}</ReactMarkdown>
                  </Box>
                </Box>
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

export default PopulaireScreen;

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsApitherapie } from "../../actions/Blog/apitherapieActions";
import SinglePageSlider from "../../Components/Blog/Slider/SinglePageSlider";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import FlexBetweenMedia from "../../Components/FlexBetweenMedia";
import Side from "./Side";
import ReactMarkdown from "react-markdown";

const ApitherapieScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { title: apitherapieTitle } = params;
  const apitherapieDetails = useSelector((state) => state.apitherapieDetails);
  const { loading, error, apitherapie } = apitherapieDetails;

  const [articleUrl, setArticleUrl] = useState(window.location.href);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    dispatch(detailsApitherapie(apitherapieTitle));
  }, [dispatch, apitherapieTitle]);

  return (
    <>
      <Box>
        <SinglePageSlider />
        <Box width="90%" m="auto">
          <Box
            sx={{
              display: " flex",
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
                    {apitherapie.title}
                  </Typography>

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

                  <FlexBetweenMedia flexDirection="column">
                    <Box>
                      <img
                        src={apitherapie.cover}
                        alt=""
                        style={{
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box>
                      <ReactMarkdown> {apitherapie.introduction}</ReactMarkdown>
                    </Box>
                  </FlexBetweenMedia>

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
                      {apitherapie.sections.map((val) => (
                        <Box sx={{ gridColumn: "span 4" }} mt="20px">
                          <Stack>
                            <Box>
                              <Typography
                                variant="h3"
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.secondary.alt,
                                  mb: "1.5rem",
                                }}
                              >
                                {val.titre}
                              </Typography>
                            </Box>
                            <Box>
                              <img
                                src={val.cover}
                                alt=""
                                style={{
                                  width: "100%",
                                }}
                              />
                            </Box>
                            <Box mt="1rem">
                              <ReactMarkdown>{val.contenu}</ReactMarkdown>
                            </Box>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: "3rem" }}>
                    <ReactMarkdown>{apitherapie.conclusion}</ReactMarkdown>
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

export default ApitherapieScreen;

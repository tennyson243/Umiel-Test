import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { modificationBanner, updateBanner } from "../../actions/bannerActions";
import Chargement from "../../Components/Chargement";
import EnTete from "../../Components/EnTete";
import MessageBox from "../../Components/MessageBox";
import { BANNER_UPDATE_RESET } from "../../constants/bannerConstant";

const BannerEditScreen = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: bannerId } = params;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [cover, setCover] = useState("");
  const [desc, setDesc] = useState("");
  const [bouton, setBouton] = useState([]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const bannerModification = useSelector((state) => state.bannerModification);
  const { loading, error, banner } = bannerModification;
  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bannerUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate("/Baniere");
    }
    if (!banner || banner._id !== bannerId || successUpdate) {
      dispatch({ type: BANNER_UPDATE_RESET });
      dispatch(modificationBanner(bannerId));
    } else {
      setCover(banner.cover);
      setSubtitle(banner.subtitle);
      setTitle(banner.title);
      setDesc(banner.desc);
      setBouton(banner.bouton);
    }
  }, [banner, dispatch, bannerId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateBanner({
        _id: bannerId,
        cover,
        subtitle,
        title,
        desc,
        bouton,
      })
    );
  };

  const handleBoutonChange = (value, index, field) => {
    const updatedBouton = [...bouton];
    updatedBouton[index][field] = value;
    setBouton(updatedBouton);
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const uploadFileHandler = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setCover(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
    } else {
      // gérer le cas où aucun fichier n'a été sélectionné
    }
  };

  return (
    <>
      <Helmet>
        <title>Modifier une Banniere</title>
      </Helmet>
      <EnTete title='Modifier une Banniere' />

      {loadingUpdate && <Chargement />}
      {errorUpdate && <MessageBox severity='error'>{errorUpdate}</MessageBox>}
      {loading ? (
        <Chargement />
      ) : error ? (
        <MessageBox severity='error'>{error}</MessageBox>
      ) : (
        <>
          <Box width='90%' m='auto'>
            <Typography
              variant='h4'
              textAlign='center'
              paddingTop='20px'
              paddingBottom='20px'
            >
              Modifier la Baniere: {bannerId}
            </Typography>
            <form onSubmit={submitHandler}>
              <Box>
                <Box>
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
                    <Box sx={{ gridColumn: "span 3" }}>
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
                        <TextField
                          fullWidth
                          type='text'
                          label='Titre'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          type='text'
                          label='Subtitle'
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <Box
                          sx={{
                            backgroundColor: theme.palette.primary[600],
                            p: "20px 20px 20px 20px",
                            gridColumn: "span 4",
                          }}
                        >
                          <Box
                            textAlign={"center"}
                            backgroundColor={theme.palette.primary.main}
                            p='8px'
                            mb='20px'
                          >
                            <Typography
                              varaint='h3'
                              textTransform={"uppercase"}
                            >
                              Description
                            </Typography>
                          </Box>
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
                            <TextField
                              fullWidth
                              type='text'
                              label='Description'
                              value={desc}
                              multiline
                              rows={6}
                              onChange={(e) => setDesc(e.target.value)}
                              required
                              sx={{ gridColumn: "span 4" }}
                            />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            backgroundColor: theme.palette.primary[600],
                            p: "20px 20px 20px 20px",
                            gridColumn: "span 4",
                          }}
                        >
                          <Box
                            textAlign={"center"}
                            backgroundColor={theme.palette.primary.main}
                            p='8px'
                            mb='20px'
                          >
                            <Typography
                              varaint='h3'
                              textTransform={"uppercase"}
                            >
                              Buttons
                            </Typography>
                          </Box>
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
                            {bouton.map((btn, index) => (
                              <React.Fragment key={index}>
                                <TextField
                                  fullWidth
                                  type='text'
                                  label='Titre'
                                  value={btn.title}
                                  onChange={(e) =>
                                    handleBoutonChange(
                                      e.target.value,
                                      index,
                                      "title"
                                    )
                                  }
                                  required
                                  sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                  fullWidth
                                  type='text'
                                  label='Lien'
                                  value={btn.lien}
                                  onChange={(e) =>
                                    handleBoutonChange(
                                      e.target.value,
                                      index,
                                      "lien"
                                    )
                                  }
                                  required
                                  sx={{ gridColumn: "span 4" }}
                                />
                              </React.Fragment>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ gridColumn: "span 1" }}>
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
                        <Box sx={{ gridColumn: "span 4" }}>
                          <Box
                            mt='10px'
                            backgroundColor={theme.palette.background.alt}
                          >
                            <Box
                              textAlign={"center"}
                              backgroundColor={theme.palette.primary.main}
                              p='15px'
                            >
                              <Typography
                                varaint='h3'
                                textTransform={"uppercase"}
                              >
                                Photo du premier Plan
                              </Typography>
                            </Box>
                            <Box p='20px'>
                              <img
                                src={cover}
                                style={{ with: "300px", height: "300px" }}
                                alt='illustration'
                              />
                            </Box>
                            <Box>
                              <TextField
                                fullWidth
                                type='file'
                                onChange={uploadFileHandler}
                              />
                              {loadingUpload && <Chargement />}
                              {errorUpload && (
                                <MessageBox severity='error'>
                                  {errorUpload}
                                </MessageBox>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
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
                Modifier
              </Button>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default BannerEditScreen;

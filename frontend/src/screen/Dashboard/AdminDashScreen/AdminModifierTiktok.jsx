import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  modificationTiktok,
  updatedTikTok,
} from "../../../actions/Blog/tiktokActions";
import { TIKTOK_UPDATE_RESET } from "../../../constants/Blog/tiktokConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import MessageBox from "../../../Components/MessageBox";
import Chargement from "../../../Components/Chargement";
import Header from "../../../Components/Header";
import { Helmet } from "react-helmet-async";

const AdminModifierTiktok = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();
  const { id: tiktokId } = params;
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [cover, setCover] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const tiktokModification = useSelector((state) => state.tiktokModification);
  const { loading, error, tiktok } = tiktokModification;
  const tiktokUpdate = useSelector((state) => state.tiktokUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tiktokUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      navigate("/TikTok");
    }
    if (!tiktok || tiktok._id !== tiktokId || successUpdate) {
      dispatch({ type: TIKTOK_UPDATE_RESET });
      dispatch(modificationTiktok(tiktokId));
    } else {
      setCover(tiktok.cover);
      setTitle(tiktok.title);
      setLink(tiktok.link);
    }
  }, [tiktok, dispatch, tiktokId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updatedTikTok({
        _id: tiktokId,
        cover,
        title,
        link,
      })
    );
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
        <title>Modifier un poste tiktok</title>
      </Helmet>

      {loadingUpdate && <Chargement />}
      {errorUpdate && <MessageBox severity="error">{errorUpdate}</MessageBox>}
      {loading ? (
        <Chargement />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <Box m="1.5rem 2.5rem">
            <Header
              title="TIKTOK MODIFICATION"
              subtitle="Modifier un poste tiktok"
            />
            <Typography
              variant="h4"
              textAlign="center"
              paddingTop="20px"
              paddingBottom="20px"
            >
              Modifier la Baniere: {tiktokId}
            </Typography>
            <form onSubmit={submitHandler}>
              <Box>
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
                    <Box sx={{ gridColumn: "span 4" }}>
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
                        <TextField
                          fullWidth
                          type="text"
                          label="Titre"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Lien tiktok"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          required
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ gridColumn: "span 4" }}>
                      <Box
                        mt="10px"
                        backgroundColor={theme.palette.background.alt}
                      >
                        <Box
                          textAlign={"center"}
                          backgroundColor={theme.palette.primary.main}
                          p="15px"
                        >
                          <Typography varaint="h3" textTransform={"uppercase"}>
                            Photo du premier Plan
                          </Typography>
                        </Box>
                        <Box p="20px">
                          <img
                            src={cover}
                            style={{ with: "300px", height: "500px" }}
                            alt="illustration"
                          />
                        </Box>
                        <Box>
                          <TextField
                            fullWidth
                            type="file"
                            onChange={uploadFileHandler}
                          />
                          {loadingUpload && <Chargement />}
                          {errorUpload && (
                            <MessageBox severity="error">
                              {errorUpload}
                            </MessageBox>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  mt: "1.4rem",
                }}
                type="submit"
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

export default AdminModifierTiktok;

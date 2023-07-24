import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTrophe } from "../../../actions/partenariatActions";
import Chargement from "../../Chargement";
import Header from "../../Header";
import MessageBox from "../../MessageBox";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Trophe = () => {
  const tropheList = useSelector((state) => state.tropheList);
  const { loading, error, trophes } = tropheList;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    dispatch(listTrophe());
  }, [dispatch]);

  return (
    <>
      <Box width='90%' m='auto'>
        <Box textAlign='center' marginTop='30px' marginBottom='30px'>
          <Header
            title='Nos Trophes'
            subtitle='Plus De 1,242,000 Utilisateurs Content Sont Avec Nous Et Ils Aiment Nos Services'
          />
        </Box>
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          <Box>
            <Box
              display='grid'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              justifyContent='space-between'
              rowGap='20px'
              columnGap='1.33%'
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                mb: "50px",
              }}
            >
              {trophes.map((trophe) => {
                return (
                  <Box
                    backgroundColor={theme.palette.background.alt}
                    textAlign='center'
                  >
                    <Box>
                      <Box
                        sx={{
                          width: "100px",
                          height: "100px",
                          lineHeight: " 100px",
                          margin: "auto",
                          marginTop: "20px",
                          background: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "4% 50%",
                          fontSize: "32px",
                          mb: "10px",
                        }}
                      >
                        <span>
                          {trophe.trophe.icon === "<EmojiEventsIcon  />" && (
                            <EmojiEventsIcon fontSize='100%' />
                          )}
                          {trophe.trophe.icon === "<BusinessCenterIcon />" && (
                            <BusinessCenterIcon fontSize='100%' />
                          )}
                          {trophe.trophe.icon === "<LightbulbIcon />" && (
                            <LightbulbIcon fontSize='100%' />
                          )}
                          {trophe.trophe.icon === "<FavoriteIcon />" && (
                            <FavoriteIcon fontSize='100%' />
                          )}
                        </span>
                      </Box>
                    </Box>
                    <Typography
                      variant='h2'
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.secondary[400],
                      }}
                    >
                      {trophe.trophe.num}
                    </Typography>
                    <Typography
                      variant='h5'
                      sx={{
                        mb: "20px",
                      }}
                    >
                      {trophe.trophe.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Trophe;

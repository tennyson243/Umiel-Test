import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BannerImage } from "./BannerContenaire";

const BannerCard = (props) => {
  const { banner } = props;
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="items">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center" // Ajout de cette ligne pour centrer horizontalement
            marginBottom="30px"
            marginLeft="2px"
            width="98%"
            height="98%"
            sx={{
              flexDirection: {
                sm: "row",
                xs: "column",
              },
            }}
          >
            <BannerImage src={banner.cover} />
            <div className="text">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center", // Ajout de cette ligne pour centrer horizontalement
                  maxWidth: 420,
                  padding: "30px",
                }}
              >
                <Typography variant="h5">{banner.subtitle}</Typography>
                <Typography
                  sx={{
                    lineHeight: 1.5,
                    fontSize: {
                      sm: "50px",
                      xs: "30px",
                    },
                    marginBottom: "20px",
                  }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    lineHeight: {
                      sm: 1.25,
                      xs: 1.15,
                    },
                    letterSpacing: { sm: 1.25, xs: 1.15 },
                    marginBottom: { sm: "3rem", xs: "1.5rem" },
                  }}
                >
                  {banner.desc.slice(0, 110)}...
                </Typography>
                {banner.bouton.map((btn, index) => (
                  <Button
                    key={btn}
                    fullWidth
                    // color='p'
                    variant="contained"
                    sx={{
                      boxShadow: "none",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => navigate(`${btn.lien}`)}
                  >
                    {btn.title}
                  </Button>
                ))}
              </Box>
            </div>
          </Box>
          <div className="box shadow flexSB"></div>
        </div>
      </section>
    </>
  );
};

export default BannerCard;

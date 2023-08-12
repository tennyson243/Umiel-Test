import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroCard = (props) => {
  const { hero } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="box">
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        />
        <Box>
          <div className="img">
            <img src={hero.cover} alt="" />
          </div>
        </Box>
        <Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "30px",
              zIndex: 2,
            }}
          >
            <span className="category">{hero.sousCategorie}</span>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                m: {
                  sm: "0.5em",
                  xs: "0.5em",
                },
              }}
              onClick={() => navigate(`/hero/${hero.title}`)}
            >
              {hero.title.toLowerCase().charAt(0).toUpperCase() +
                hero.title.toLowerCase().slice(1)}
            </Typography>
            <div className="author flex">
              <span>Par {hero.authorName}</span>
              <span>
                {new Date(hero.createdAt).toLocaleDateString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default HeroCard;

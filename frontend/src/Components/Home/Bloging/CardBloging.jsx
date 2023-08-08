import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardBloging = (props) => {
  const { hero } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <section className="popular">
      <div className="content">
        <div className="items">
          <Box
            backgroundColor={theme.palette.background.alt}
            display="flex"
            box-shadow="0 0 20px 0 rgb(112 121 138 / 18%)"
          >
            <div className="images row">
              <div className="img">
                <img
                  src={hero.cover}
                  alt=""
                  style={{
                    maxHeight: "175px",
                  }}
                />
              </div>
              <div class="category category1">
                <span>{hero.sousCategorie}</span>
              </div>
            </div>
            <div className="text row">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  padding: "20px 20px 0 20px",
                  margin: "0",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/hero/${hero.title}`)}
              >
                {hero.title.slice(0, 40)}...
              </Typography>
              <div className="date">
                <i class="fas fa-calendar-days"></i>
                <label>{hero.time}</label>
              </div>
            </div>
          </Box>
          <div className="box shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default CardBloging;

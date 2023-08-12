import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Popular.css";

const PopulaireCard = (props) => {
  const { populaire } = props;
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
                <img src={populaire.cover} alt="" />
              </div>
              <div class="category category1">
                <span>{populaire.sousCategorie.slice(0, 18)}...</span>
              </div>
            </div>
            <div className="text row">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  padding: "20px 0 0 20px",
                  margin: "0",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/populaire/${populaire.title}`)}
              >
                {populaire.title.slice(0, 40)}...
              </Typography>
              <div className="date">
                <i class="fas fa-calendar-days"></i>
                <label>
                  {new Date(populaire.createdAt).toLocaleDateString("fr-FR", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </label>
              </div>
              <div className="comment">
                <i class="fas fa-comments"></i>
                <label>{populaire.comments}</label>
              </div>
            </div>
          </Box>
          <div className="box shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default PopulaireCard;
